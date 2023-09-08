"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BiSolidAddToQueue } from 'react-icons/bi';

interface TaskData {
    title: string;
    description: string;
    status: number;
    landType:string;
    landSize:number;
    irrigation:boolean;
    price:number;
    phone:number;
    date:Date;
}

function Todoform({ fetchTasks }: { fetchTasks: () => void }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<TaskData>({ title: "", description: "", status: 0, landType:"",landSize:0,irrigation:false,price:0,date: new Date(),phone:0});
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
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
                <button>Add Land</button>
                <BiSolidAddToQueue />
            </div>
            {open &&
                <form className="mt-5 shadow-inner bg-white sm:p-10 px-5 py-5 flex flex-col gap-5" onSubmit={handleFormSubmit}>
                    <div className="flex gap-14">
                        <label className="font-bold">Name</label>
                        <input
                            className="border-2"
                            type='text'
                            name='title'
                            placeholder='owner name...'
                            onChange={handleChange}
                            value={data.title}
                        />
                    </div>
                    <div className="flex gap-14">
                        <label className="font-bold">LandType</label>
                        <select className='border-2 p-2' name='landType' onChange={handleChange} value={data.landType}>
                            <option value="">Select Land Type</option>
                            <option value="Agricultural">Agricultural</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="flex gap-14">
                        <label className="font-bold">LandSize(acres)</label>
                        <input
                            className="border-2"
                            type='number'
                            name='landSize'
                            placeholder='land size...'
                            onChange={handleChange}
                            value={data.landSize}
                        />
                    </div>
                    <div className="flex gap-14">
                        <label className="font-bold">Price</label>
                        <input
                            className="border-2"
                            type='number'
                            name='price'
                            placeholder='price...'
                            onChange={handleChange}
                            value={data.price}
                        />
                    </div>
                    <div className="flex gap-14">
                        <label className="font-bold">Phone</label>
                        <input
                            className="border-2"
                            type='tel'
                            name='phone'
                            placeholder='mobile...'
                            onChange={handleChange}
                            value={data.phone}
                        />
                    </div>
                    <div className="flex gap-14">
                        <label className='font-bold'>Irrigation</label>
                        <div>
                            <input
                                type='radio'
                                className='border-2'
                                name='irrigation'
                                value='true'
                                onChange={handleChange} // Handle change event to update data.irrigation
                            />
                            <label>Yes</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                className='border-2'
                                name='irrigation'
                                value='false'
                                onChange={handleChange} // Handle change event to update data.irrigation
                            />
                            <label>No</label>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-10">
                        <label className="font-bold">Address</label>
                        <textarea
                            rows={3}
                            cols={20}
                            name='description'
                            placeholder='address...'
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
