import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

export type TTask = {
  id: string;
  task: string;
  isCompleted: boolean;
};

const TodoList = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
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

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("todos", JSON.stringify(taskList));
    }
  }, [taskList, hasLoaded]);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      try {
        const parsedTodos = JSON.parse(todos) as TTask[];
        setTaskList(parsedTodos);
      } catch (err) {
        console.error("Failed to parse todos", err);
      }
    }
    setHasLoaded(true); // now mark as loaded
  }, []);

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-center items-center mt-8">
          <input
            aria-label="Input Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Type Task..."
            className="h-10 border-2 border-blue-500 rounded-l-md px-4 text-base outline-none flex-1"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button
            aria-label="Add Task"
            onClick={addTask}
            className="h-10 bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 active:scale-95 transition"
          >
            Add
          </button>
        </div>
        <ul className="mt-5 px-2" aria-label="Task List">
          {taskList.length !== 0 ? (
            taskList.map((task) => (
              <TaskItem
                completeTask={completeTask}
                deleteTask={deleteTask}
                task={task}
                key={task.id}
              />
            ))
          ) : (
            <h1 className="text-center text-gray-500 mt-4">
              You have no tasks today. Relax 😎
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
