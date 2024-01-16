import express, { Express, Request, Response , Application, NextFunction} from 'express';
import  { RequestHandler } from 'express';
import Jwt from "jsonwebtoken";
// import { compareSync } from "bcrypt-ts";
import User from '../modals/schema';

export const getuserdata:RequestHandler = async(req:Request, res, next) => {
    try{
    // const id = req.userId;
    const {id} = req.params;
    console.log(id)
    const user = await User.findById(`${id}`).select('-password');
    // console.log(user)
 
    res.status(200).json({user});
    } catch(err:any){
        return res.status(500).json({message : err.message})
    }
    
};