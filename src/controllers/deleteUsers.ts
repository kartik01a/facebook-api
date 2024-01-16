import { RequestHandler } from 'express';
import express,{Request} from 'express'
import User from '../modals/schema';
  export const deleteUser:RequestHandler = async(req:Request, res, next) => {
    try{
        const id = req.params.id;
        
        const user = await User.findByIdAndDelete(id)
        if(!user){
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted"});

    } catch(err:any){
        return res.status(500).json({message : err.message})
    }
    
};