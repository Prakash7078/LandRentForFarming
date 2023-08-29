import connectDB from "../../../libs/mongodb";
import Todo from '../../../models/todo';
import { NextResponse } from 'next/server';

export async function POST(request){
    await connectDB();
    const{title,description,status}=await request.json();
    await Todo.create({title,description,status});
    return new NextResponse(JSON.stringify({message:"created succesfully"}));
};

export async function GET(){
    await connectDB();
    const todos=await Todo.find();
    console.log(todos);
    return new NextResponse(JSON.stringify({todos}))
};
    