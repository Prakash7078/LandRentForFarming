"use client";
import React, {useState } from 'react';
import Tasks from "./components/Tasks";
import Todoform from "./components/Todoform";
interface Task {
  _id: string;
  title: string;
  description: string;
  status: number;
  landType:string;
  landSize:number;
  phone:number;
  irrigation:boolean;
  price:number;
  date:Date;
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
    <div className="w-full font-sans text-lg flex justify-start flex-col md:flex-row">
      <Todoform fetchTasks={fetchTasks} />
      <Tasks tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  )
}
