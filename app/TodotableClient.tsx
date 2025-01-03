"use client";

import React, { useState } from "react";
import { Todo } from "@/app/types";
import TodoForm from "./TodoForm";
import { TodoActionsBar } from "@/components/ui/TodoActionsBar";
import { TodoTable } from "@/components/ui/TodoTable";

interface TodotableClientProps {
  initialTodos: Todo[];
}

export default function TodotableClient({
  initialTodos,
}: TodotableClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(
    initialTodos.sort((a, b) => a.id - b.id)
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) =>
      [...prevTodos, newTodo].sort((a, b) => a.id - b.id)
    );
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        const deletedTodo = todos.find((todo) => todo.id === id);

        await sendSlackMessage(`ToDoが削除されました: ${deletedTodo?.title}`);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTodo = async (id: number, title: string, done: boolean) => {
    try {
      const response = await updateTodoApi(id, title, done);
      if (!response.ok) {
        console.error("Failed to update task");
        return;
      }

      const updatedTodo = await response.json();
      updateTodoState(id, updatedTodo);
      notifySlackAboutUpdate(id, updatedTodo);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTodoApi = async (id: number, title: string, done: boolean) => {
    return await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, done }),
    });
  };

  const updateTodoState = (id: number, updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos
        .map((todo) => {
          if (todo.id !== id) {
            return todo;
          }
          return {
            ...todo,
            title: updatedTodo.title,
            done: updatedTodo.done,
          };
        })
        .sort((a, b) => a.id - b.id)
    );
    setEditingId(null);
  };

  const notifySlackAboutUpdate = (id: number, updatedTodo: Todo) => {
    const originalTodo = todos.find((todo) => todo.id === id);
    if (!originalTodo) return;

    if (originalTodo.title !== updatedTodo.title) {
      sendSlackMessage(
        `ToDoのタイトルが変更されました: '${originalTodo.title}' から '${updatedTodo.title}' に変更されました`
      );
    }

    if (originalTodo.done !== updatedTodo.done && updatedTodo.done) {
      sendSlackMessage(`ToDoが完了しました: '${updatedTodo.title}'`);
    }
  };

  const sendSlackMessage = async (message: string) => {
    const slackResponse = await fetch("/api/slack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!slackResponse.ok) {
      console.error("Failed to send Slack message");
    }
  };

  return (
    <div className="rounded-md overflow-hidden bg-card border w-1/2 mx-auto">
      <div className="mx-auto p-8 space-y-8">
        <TodoActionsBar toggleForm={toggleFormVisibility} showForm={showForm} />
        {showForm && (
          <TodoForm closeForm={() => setShowForm(false)} addTodo={addTodo} />
        )}
        <TodoTable
          todos={todos}
          deleteTodo={deleteTodo}
          editingId={editingId}
          setEditingId={setEditingId}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}
