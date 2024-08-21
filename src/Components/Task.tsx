import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskListProps {
  completed: boolean;
  id: string;
  title: string;
  handleDelete: (id: string) => void;
  handleToggle: (id: string, checked: boolean) => void;
}
const Task = ({
  completed,
  id,
  title,
  handleDelete,
  handleToggle,
}: TaskListProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => handleToggle(id, e.target.checked)}
      />
      <span className={`title ${completed ? "checked" : ""}`}>{title}</span>
      <button className="delete" onClick={() => handleDelete(id)}>
        ❌
      </button>
    </div>
  );
};

export default Task;
