import { RequestHandler } from "express";
import User from '../modals/schema'
import CustomAPIError  from '../error/custonError'
import { genSaltSync, hashSync } from "bcrypt";

export const registerUser:RequestHandler = async(req,res,next)=>{

    try{
        const {Fname,Lname,email,phone,password} = req.body;

        // input passed or not
        if(!Fname) throw new CustomAPIError("First name required.")
        if(!Lname) throw new CustomAPIError("Last name required.")
        if(!email) throw new CustomAPIError("Email required.")
        if(!password) throw new CustomAPIError("Password required.")
        if(!phone) throw new CustomAPIError("Phone number required.")

        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const pass:RegExp=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    
        // check input for correctness
        if (!pass.test(password.toString())) throw new CustomAPIError("Enter valid password with uppercase, lowercase, number & @")
        if (!expression.test(email.toString())) throw new CustomAPIError("Enter valid email")
        if(typeof phone !== 'number' && (""+phone).length !== 10 ) throw new CustomAPIError("Phone number should only have 10 digits, No character allowed.")

        const existinguser = await User.findOne({ email });

        if (existinguser) {
            return res.status(407).json({ message: 'User already Exist' });
        }
        // password hashing
        const salt = genSaltSync(10);
        const hashPassword = hashSync(password.toString(), salt);
        await new User({Fname,Lname,email,phone,password:hashPassword}).save()
   
   
        res.status(200).json({msg:"New user registered"});
    }
    catch(error){
        next(error)
    }
}