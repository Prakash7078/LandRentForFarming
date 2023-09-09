"use client";
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface Task {
    _id: string;
    title: string;
    serve:number,
    description: string;
    status: number;
    landType:string;
    landSize:number;
    phone:number;
    irrigation:boolean;
    price:number;
    date:Date;
}
export default function Tasks({ tasks, fetchTasks }: { tasks: Task[], fetchTasks: () => void }) {
    const[complete,setComplete]=useState<string | null>(null);
    const router=useRouter();
    useEffect(() => {
        fetchTasks();
        const completedTask = tasks.find(item => item.status === 100);
        if (completedTask) {
            setComplete(completedTask._id);
        } else {
            setComplete(null);
        }
    }, []);
    const handleDelete = async (id: string, serve: number) => {
        try {
          const n = Number(window.prompt("Enter serve number..."));
          if (!isNaN(n) && n === serve) {
            await fetch(`/api/todos/${id}`, {
              method: 'DELETE'
            });
            // Assuming fetchTasks is a function to refresh your tasks list
            fetchTasks();
          } else {
            // Handle the case where the user entered an incorrect serve number
            toast.error("Serve number does not match.");
          }
        } catch (error) {
          console.error(error);
        }
      };
      const handleUpdate = (id: string, serve: number) => {
        const n = Number(window.prompt("Enter serve number..."));
        if (!isNaN(n) && n === serve) {
          router.push(`/edit/${id}`); // Use router.push to navigate
        } else {
          toast.error("Serve number does not match.");
        }
      };
    const handleChange = async (e: ChangeEvent<HTMLInputElement>, id: string,serve:number) => {
        const newStatus = parseInt(e.target.value, 10);
        console.log("id",id);
        const n = Number(window.prompt("Enter serve number..."));
        if (!isNaN(n) && n != serve) {
            toast.error("Serve number does not match.");
            return ;
        }
        if (newStatus === 100) {
            setComplete(id);
        } else {
            setComplete(null);
        }
        try {
            await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchTasks();
            // Update the tasks state locally to reflect the changed status
            
        } catch (error) {
            console.log("update error", error);
        }
    }

    return (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto'>
            {tasks.map((item: Task) => {
                const line = complete === item._id ? 'bg-green-400' : '';
                return (
                    <div key={item._id} className={`flex gap-4 shadow-slate-500 shadow-inner p-3 flex-col  flex-wrap m-3 sm:m-10 bg-white  ${line}`}>
                        <h1 className='font-bold '>{item.title}</h1>
                        <p>{item.landSize} acres</p>
                        <p>{item.landType} Land</p>
                        <p>{item.price} /-</p>
                        <p>{item.irrigation ? "Irrigation":"No Irrigation"}</p>
                        <p>{new Date(item.date).toLocaleDateString()}</p>
                        <p className='font-bold '>+91 {item.phone}</p>                 
                        <p>{item.description}</p>
                        <div className='flex gap-3'>
                            <AiTwotoneEdit size={23} className="cursor-pointer" color="blue" onClick={()=>handleUpdate(item._id,item.serve)}/>
                            <AiFillDelete size={20} className="cursor-pointer" color="red" onClick={() => handleDelete(item._id,item.serve)}/>                        </div>
                        <input
                            type='range'
                            value={item.status}
                            onChange={(e) => handleChange(e, item._id,item.serve)}
                            className='cursor-pointer'
                            min="0"
                            max="100"
                        />
                        <span>Production {item.status}</span>
                    </div>
                );
            })}
        </div>
    );
}
