"use client";
import React, {useState } from 'react';
import Tasks from "./components/Tasks";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todoform from "./components/Todoform";
interface Task {
  _id: string;
  serve:number;
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
    <div >
      <Todoform fetchTasks={fetchTasks} />
      <Tasks tasks={tasks} fetchTasks={fetchTasks} />
      <ToastContainer />
    </div>
  )
}
