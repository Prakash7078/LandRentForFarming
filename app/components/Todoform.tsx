"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BiSolidAddToQueue } from 'react-icons/bi';

interface TaskData {
    title: string;
    description: string;
    status: number;
}

function Todoform({ fetchTasks }: { fetchTasks: () => void }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<TaskData>({ title: "", description: "", status: 0 });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFormSubmit =async(e: FormEvent) => {
        e.preventDefault();
        try{
            const response=await fetch('/api/todos',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setOpen(false);
            fetchTasks();

        } catch (error) {
            console.error("Post error:", error);
        }
    }

    return (
        <div className='flex flex-col items-center mt-10 mx-auto'>
            <div className='flex gap-3 justify-center bg-green-400 items-center px-10 py-3 border-2 border-black ' onClick={() => setOpen(true)}>
                <button>Add Task</button>
                <BiSolidAddToQueue />
            </div>
            {open &&
                <form className="mt-5 shadow-inner bg-white sm:p-10 px-5 py-5" onSubmit={handleFormSubmit}>
                    <div className="flex gap-14">
                        <label className="font-bold">Title</label>
                        <input
                            className="border-2"
                            type='text'
                            name='title'
                            placeholder='task title...'
                            onChange={handleChange}
                            value={data.title}
                        />
                    </div>
                    <div className="mt-5 flex gap-10">
                        <label className="font-bold">Description</label>
                        <textarea
                            rows={3}
                            cols={20}
                            name='description'
                            placeholder='description...'
                            className="border-2"
                            onChange={handleChange}
                            value={data.description}
                        />
                    </div>
                    <button className='bg-red-500 px-6 border-2 mt-5 font-semibold mx-auto w-full py-1' type='submit'>Add</button>
                </form>
            }
        </div>
    )
}

export default Todoform;
