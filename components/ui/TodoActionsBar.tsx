import React from "react";
import { Button } from "@/components/ui/button";
import { X, CirclePlus } from "lucide-react";

interface TodoActionsBarProps {
  toggleForm: () => void;
  showForm: boolean;
}

export function TodoActionsBar({ toggleForm, showForm }: TodoActionsBarProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight font-mono">Todo List</h1>
      <Button className="bg-green-600 hover:bg-green-700" onClick={toggleForm}>
        {showForm ? (
          <X className="h-4 w-4 font-mono" />
        ) : (
          <CirclePlus className="mr-2 h-4 w-4 font-mono" />
        )}
        {showForm ? "Cancel" : "Add Todo"}
      </Button>
    </div>
  );
}
