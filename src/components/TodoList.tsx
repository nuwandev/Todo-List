import { useState } from "react";

const TodoList = () => {
  type TTask = {
    id: string;
    task: string;
    isCompleted: boolean;
  };

  const [taskList, setTaskList] = useState<TTask[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTaskList([
      { id: crypto.randomUUID(), task: newTask, isCompleted: false },
      ...taskList,
    ]);
    setNewTask("");
  };

  const completeTask = (id: string) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[300px]">
        <div className="flex justify-center items-center mt-8">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Type Task..."
            className="h-[40px] border-2 rounded-lg rounded-r-none text-lg px-4 py-1 outline-0 border-blue-500"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button
            onClick={addTask}
            className="h-[40px] bg-blue-500 px-4 rounded-lg rounded-l-none cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="mt-5 px-2">
          {taskList.map((task) => (
            <li
              onClick={() => completeTask(task.id)}
              className="flex justify-between border-b-2 border-b-gray-600 mb-3 text-lg cursor-pointer"
              key={task.id}
            >
              <span className={task.isCompleted ? "line-through" : ""}>
                {task.task}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="text-red-500 pr-2 cursor-pointer"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
