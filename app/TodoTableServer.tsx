//"https://nextjs-prisma-phi.vercel.app/api/todos"

import React from "react";
import TodotableClient from "./TodotableClient";
import { Todo } from "@/app/types";

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(
    "https://todo-slack-bpk6tdd6t-hirotaka06s-projects.vercel.app/api/todos",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export default async function TodoTableServer() {
  const todos = await fetchTodos();

  return <TodotableClient initialTodos={todos} />;
}
