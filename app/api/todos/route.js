import connectDB from "../../../libs/mongodb";
import Todo from '../../../models/todo';
import { NextResponse } from 'next/server';

export async function POST(request){
    await connectDB();
    const{title,landType,landSize,irrigation,price,date,description,status,phone}=await request.json();
    await Todo.create({title,landType,landSize,irrigation,price,date,description,status,phone});
    return new NextResponse(JSON.stringify({message:"created succesfully"}));
};

export async function GET(){
    await connectDB();
    const todos=await Todo.find();
    console.log(todos);
    return new NextResponse(JSON.stringify({todos}))
};
    