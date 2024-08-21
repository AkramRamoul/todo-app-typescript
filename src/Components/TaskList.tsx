import Task from "./Task";
import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Todo } from "../Types";

interface TaskListProps {
  todos: Todo[];
  handleDelete: (id: string) => void;
  handleToggle: (id: string, checked: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TaskList({
  todos,
  handleDelete,
  handleToggle,
  setTodos,
}: TaskListProps) {
  const [sort, setSort] = useState<"order" | "title" | "completed">("order");

  let sortedTodos = todos;
  if (sort === "title") {
    sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "completed") {
    sortedTodos = [...todos].sort(
      (a, b) => Number(b.completed) - Number(a.completed)
    );
  }

  const clearAllItems = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all todos?"
    );
    if (confirmed) setTodos([]);
  };

  return (
    <>
      <div className="column">
        <SortableContext
          items={sortedTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <Task
                {...todo}
                key={todo.id}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </SortableContext>
      </div>
      <div className="actions">
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "completed" | "title" | "order")
          }
        >
          <option value="order">Sort by order of input</option>
          <option value="title">Sort alphabetically</option>
          <option value="completed">Sort by state</option>
        </select>
        <button onClick={clearAllItems}>Clear List</button>
      </div>
    </>
  );
}

export default TaskList;
