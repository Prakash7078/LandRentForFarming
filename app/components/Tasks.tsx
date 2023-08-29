"use client";
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
interface Task {
    _id: string;
    title: string;
    description: string;
    status: number;
}
export default function Tasks({ tasks, fetchTasks }: { tasks: Task[], fetchTasks: () => void }) {
    useEffect(() => {
        fetchTasks();
    }, []);
    const handleDelete=async(id:string)=>{
      try{
        await fetch(`/api/todos/${id}`,{
          method:'DELETE'})
        fetchTasks();
      }catch(error){
        console.log(error);
      }
    }
    const handleChange = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const newStatus = parseInt(e.target.value, 10);
        console.log("id",id);
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
        <div className='flex justify-center flex-col items-center mt-8 gap-5 mx-auto'>
            {tasks.map((item: Task) => {
                return (
                    <div key={item._id} className='flex gap-8 shadow-slate-500 shadow-inner p-3 flex-col sm:flex-row flex-wrap'>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <div className='flex gap-3'>
                            <Link href={`edit/${item._id}`}><AiTwotoneEdit size={23} className="cursor-pointer" color="blue" /></Link>
                            <AiFillDelete size={20} className="cursor-pointer" color="red" onClick={() => handleDelete(item._id)}/>
                        </div>
                        <input
                            type='range'
                            value={item.status}
                            onChange={(e) => handleChange(e, item._id)}
                            className='cursor-pointer'
                            min="0"
                            max="100"
                        />
                        <span>Status {item.status}</span>
                    </div>
                );
            })}
        </div>
    );
}
