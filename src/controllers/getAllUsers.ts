import express, {Router, Express, Request, Response , Application} from 'express';
import { RequestHandler } from 'express';
import User from '../modals/schema';
  export const getAllUsers:RequestHandler = async(req, res, next) => {
    try{
        // User.find({},(req:Request,users:any)=>{
        //     res.status(200).send();
        // });
        const user = await User.find().select('-password').exec();
        console.log(user);
        res.status(200).json({user});

    }catch(err){
        res.status(407).json({message: err});
    }   
    
};