import type { TTask } from "./TodoList";

type TaskItemProps = {
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  task: TTask;
};

const TaskItem = ({ completeTask, deleteTask, task }: TaskItemProps) => {
  return (
    <li
      role="checkbox"
      aria-checked={task.isCompleted}
      tabIndex={0}
      onClick={() => completeTask(task.id)}
      className="flex justify-between items-center border-b border-gray-700 mb-3 p-2 text-lg cursor-pointer hover:bg-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
    >
      <span
        className={
          task.isCompleted ? "line-through text-gray-400" : "text-gray-100"
        }
      >
        {task.task}
      </span>

      <button
        aria-label={`Delete task: ${task.task}`}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="text-red-400 hover:text-red-600 transition duration-200 ease-in-out text-xl font-bold"
      >
        ×
      </button>
    </li>
  );
};

export default TaskItem;
