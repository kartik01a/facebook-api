import { Schema, model } from 'mongoose';

// Document interface
interface User {
  Fname: string;
  Lname:string;
  email: string;
  password:string;
  phone:number;
  imageUrl:string;
}

// Schema
 const schema = new Schema<User>({
  Fname: { type: String, required: true },
  Lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  
});

export default model<User>('User', schema);