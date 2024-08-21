import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Todo } from "./Types";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const addTask = (title: string) => {
    setTodos((current) => {
      if (!title) return current;
      return [...current, { title, id: crypto.randomUUID(), completed: false }];
    });
  };

  const handleDelete = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string, checked: boolean) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: checked } : todo
      )
    );
  };

  const getTaskPos = (id: string): number => {
    return todos.findIndex((todo) => todo.id === id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setTodos((todos) => {
      const originPos = getTaskPos(active?.id as string);
      const newPos = getTaskPos(over?.id as string);

      return arrayMove(todos, originPos, newPos);
    });
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <AddTask addTask={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <TaskList
          todos={todos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          setTodos={setTodos}
        />
      </DndContext>
    </div>
  );
}

export default App;
