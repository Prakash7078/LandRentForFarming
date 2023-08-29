import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    status:Number,
  },
  {
    timestamps: true,
  }
);

const Todo =mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
