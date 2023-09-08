import connectDB from '../../../../libs/mongodb';
import Todo from '../../../../models/todo';
import { NextResponse } from 'next/server';

export async function PUT(request,{params}){
    const {id}=params;
    await connectDB();
    console.log(request);
    const {title,landType,landSize,irrigation,price,date,description,status,phone}=await request.json();
    await Todo.findByIdAndUpdate(id,{title,landType,landSize,irrigation,price,date,description,status,phone});
    return new NextResponse(JSON.stringify({message:"Topic updated succesfully"}));
}
export async function DELETE(request,{params}){
    const {id}=params;
    await connectDB();
    await Todo.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({message:"deleted succesfully"}));
};
export async function GET(request,{params}){
    const{id}=params;
    await connectDB();
    const todo=await Todo.findOne({_id:id});
    return new NextResponse(JSON.stringify({todo}))
}