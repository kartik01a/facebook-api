import {v2 as cloudinary} from 'cloudinary';
import { Request,Response } from 'express';
import CustomAPIError from '../error/custonError';
          
cloudinary.config({ 
  cloud_name: 'drm7dvyyt', 
  api_key: '753724826474299', 
  api_secret: '2XbN2SSaxAD0uaONp7oZTEITTu4',
  secure:true
});

let fileUploader = async(req:Request,res:Response)=>{

        try{
            if(req.file){
                console.log(req.file.path)
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result)
                console.log("pass1")
                return res.json({url:result.secure_url});
            }
            else return res.status(400).json({msg:"File not uploader"})
        }
        catch(err){
            res.status(400).json({msg:err})
        }
}
export {fileUploader}