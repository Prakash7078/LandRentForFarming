"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'; // Import FormEvent here
import { BiSolidAddToQueue } from 'react-icons/bi'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

function Editpage() {
  const params=useParams();
  const router = useRouter()
  const {id}=params;
  const[editdata,setEditdata]=useState({ title: "",serve:0,district:"", description: "", status: 0, landType:"",landSize:0,irrigation:false,price:0,date: new Date(),phone:0});
  useEffect(()=>{
    const fetchdata=async()=>{
      const response=await fetch(`/api/todos/${id}`);
      const data=await response.json();
      setEditdata({
        ...editdata,
        "title": data.todo.title,
        "description": data.todo.description,
        "serve":data.todo.serve,
        "district":data.todo.district,
        "landType":data.todo.landType,
        "landSize":data.todo.landSize,
        "irrigation":data.todo.irrigation,
        "phone":data.todo.phone,
        "price":data.todo.price,
        "date":data.todo.date,
      });    };
    fetchdata();
  },[]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditdata(prevData => ({
        ...prevData,
        [name]: value,
    }));
};
  const handleEdit=async(e: FormEvent<HTMLFormElement>)=>{
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
    <div className='flex flex-col items-center mt-5 '>
            <form className="mt-5 shadow-inner bg-white sm:p-10  py-5 flex flex-col gap-5 px-5 mx-2 mb-10" onSubmit={handleEdit}>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Name</label>
                        <input
                            className="border-2"
                            type='text'
                            name='title'
                            placeholder='task title...'
                            onChange={handleChange}
                            value={editdata.title}
                        />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">LandType</label>
                        <select className='border-2 p-2' name='landType' onChange={handleChange} value={editdata.landType}>
                            <option value="">Select Land Type</option>
                            <option value="Agricultural">Agricultural</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">LandSize(acres)</label>
                        <input
                            className="border-2"
                            type='number'
                            name='landSize'
                            placeholder='land size...'
                            onChange={handleChange}
                            value={editdata.landSize}
                        />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Price</label>
                        <input
                            className="border-2"
                            type='number'
                            name='price'
                            placeholder='price...'
                            onChange={handleChange}
                            value={editdata.price}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Phone</label>
                        <input
                            className="border-2"
                            type='number'
                            name='phone'
                            placeholder='mobile...'
                            onChange={handleChange}
                            value={editdata.phone}
                        />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Survey No</label>
                        <input
                            className="border-2"
                            type='text'
                            name='serve'
                            placeholder='Serve Number...'
                            onChange={handleChange}
                            value={editdata.serve}
                        />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className='font-bold'>Irrigation</label>
                        <div className='flex gap-2'>
                            <div>
                                <input
                                    type='radio'
                                    className='border-2'
                                    name='irrigation'
                                    value='true'
                                    checked={editdata.irrigation === true} // Set checked if data.irrigation is true
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
                                    checked={editdata.irrigation === false} // Set checked if data.irrigation is false
                                    onChange={handleChange} // Handle change event to update data.irrigation
                                />
                                <label>No</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="font-bold">Address</label>
                        <textarea
                            rows={3}
                            cols={20}
                            name='description'
                            placeholder='address...'
                            className="border-2"
                            onChange={handleChange}
                            value={editdata.description}
                        />
                    </div>
                    <button className='bg-red-500 px-6 border-2 mt-5 font-semibold mx-auto w-full py-1' type='submit'>Update</button>
                </form>
    </div>
  )
}

export default Editpage;