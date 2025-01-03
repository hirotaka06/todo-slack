import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Badge, BadgeCheck } from "lucide-react";
import { Todo } from "@/app/types";

interface TodoTableProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  newTitle: string;
  setNewTitle: (title: string) => void;
  updateTodo: (id: number, title: string, done: boolean) => void;
}

export function TodoTable({
  todos,
  deleteTodo,
  editingId,
  setEditingId,
  newTitle,
  setNewTitle,
  updateTodo,
}: TodoTableProps) {
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="text-gray-500 font-mono font-bold">
            TITLE
          </TableHead>
          <TableHead className="text-gray-500 w-20 font-mono font-bold">
            DATE
          </TableHead>
          <TableHead className="text-gray-500 w-20 font-mono font-bold">
            DONE
          </TableHead>
          <TableHead className="text-gray-500 w-20 font-mono font-bold">
            EDIT
          </TableHead>
          <TableHead className="text-gray-500 w-20 font-mono font-bold">
            DELETE
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-black p-2 rounded-md"
                />
              ) : (
                todo.title
              )}
            </TableCell>
            <TableCell>{new Date(todo.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateTodo(todo.id, todo.title, !todo.done)}
              >
                {todo.done ? (
                  <BadgeCheck className="h-6 w-6 ml-2 text-green-500" />
                ) : (
                  <Badge className="h-6 w-6 ml-2 text-gray-500" />
                )}
              </Button>
            </TableCell>
            <TableCell>
              {editingId === todo.id ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => updateTodo(todo.id, newTitle, todo.done)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500 transition-colors focus:outline-none"
                  onClick={() => {
                    setEditingId(todo.id);
                    setNewTitle(todo.title);
                  }}
                >
                  <Pencil className="h-4 w-4 ml-2" />
                </Button>
              )}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0  text-muted-foreground hover:text-red-500 transition-colors focus:outline-none"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4 ml-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
