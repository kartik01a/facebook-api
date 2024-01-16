import { NextFunction, Request,Response } from "express"
import CustomAPIError  from '../error/custonError'

const errorHandlerMiddleware = async (err:unknown, req:Request, res:Response, next:NextFunction)=> {
    // console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(404).json({ msg: err.message })
      }
    next(err)
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
  }
  
export default errorHandlerMiddleware