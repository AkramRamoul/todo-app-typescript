import { useState, useRef, useEffect } from "react";
import "../App.css";

interface AddTaskProps {
  addTask: (title: string) => void;
}

function AddTask({ addTask }: AddTaskProps) {
  const [newTodo, setNewTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTask(newTodo);
    setNewTodo("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="input"
        ref={inputRef}
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add Todo
      </button>
    </form>
  );
}

export default AddTask;
