import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    serve:{type:Number,required:true},
    landType: { type: String, required: true },
    landSize:{type:Number,required:true},
    irrigation:{type:Boolean,required:true},
    price:{type:Number,required:true},
    status:Number,
    phone:{type:Number,required:true},
    date: { type: Date, default: Date.now }, 
    description: String,
  },
  {
    timestamps: true,
  }
);

const Todo =mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
