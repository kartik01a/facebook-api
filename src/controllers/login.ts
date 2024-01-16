import  { RequestHandler } from 'express';
import Jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import User from '../modals/schema';


  export const loginUser:RequestHandler = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        const existinguser = await User.findOne({email});
        // console.log(existinguser,"Email  ",email)
        //if user is not found
        if(!existinguser){
            return res.status(407).json({ message: 'User not Exist' });
        }
        const isMatch = compareSync((""+password), existinguser.password);
        //if password doens't match
        if(!isMatch){
            return res.status(407).json({ message: 'Password not match' });
        }
        const id = existinguser._id;
        let refereshToken = "", AccessToken = "";

        refereshToken = await Jwt.sign({id}, process.env.JWT_REFRESH_SECRET_KEY!, {
            expiresIn: "2h"
        });
        AccessToken = await Jwt.sign({id}, process.env.JWT_SECRET_KEY!,{
            expiresIn: "30m",
        });
        res.cookie('authToken',AccessToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refereshToken,({httpOnly:true})) ;
    
        res.status(201).json({
            refereshToken,
            AccessToken,
            message: 'User logged in successfully'
        });
        
        next()
    
    }
    catch(err){
        res.status(407).json({message: err});

    }
    
};