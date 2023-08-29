"use client";
import React, {useState } from 'react';
import Tasks from "./components/Tasks";
import Todoform from "./components/Todoform";
interface Task {
  id: string;
  title: string;
  description: string;
  status: number;
}
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = async () => {
    try {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTasks(data.todos);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
  return (
    <div className="w-full font-sans">
      <Todoform fetchTasks={fetchTasks} />
      <Tasks tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  )
}
