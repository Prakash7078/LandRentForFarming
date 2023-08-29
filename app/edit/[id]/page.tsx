"use client";
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiSolidAddToQueue } from 'react-icons/bi'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

function Editpage() {
  const params=useParams();
  const router = useRouter()
  const {id}=params;
  const[editdata,setEditdata]=useState({title:"",description:""});
  useEffect(()=>{
    const fetchdata=async()=>{
      const response=await fetch(`/api/todos/${id}`);
      const data=await response.json();
      setEditdata({
        ...editdata,
        "title": data.todo.title,
        "description": data.todo.description
      });    };
    fetchdata();
  },[]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditdata(prevData => ({
        ...prevData,
        [name]: value,
    }));
};
  const handleEdit=async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try {
      console.log(editdata);
      await fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(editdata),
      });
      router.push("/");
    } catch (error) {
        console.log("update error", error);
    }
  }
  return (
    <div className='flex flex-col items-center mt-10 mx-auto'>
            <form className="mt-5 shadow-inner bg-white sm:p-10 px-5 py-5 ">
                <div className="flex gap-14">
                    <label className="font-bold">Title</label>
                    <input className=" border-2" type='text' placeholder='task title...' value={editdata.title} name="title" onChange={handleChange}/>
                </div>
                <div className="mt-5 flex gap-10">
                    <label className=" font-bold">Description</label>
                    <textarea rows={3} cols={20} placeholder='description...' className="border-2" value={editdata.description} name="description" onChange={handleChange}/>
                </div>
                <button className='bg-red-500 px-6 border-2 mt-5 font-semibold mx-auto w-full py-1' onClick={handleEdit}>Save</button>
            </form>
    </div>
  )
}

export default Editpage;