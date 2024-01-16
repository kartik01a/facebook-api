import { RequestHandler,Request } from 'express';
import User from '../modals/schema';
export const updateUser: RequestHandler = async(req:Request, res, next) => {
  try {
    const { Fname, Lname, email, phone } = req.body;
    const updatedata = await User.findByIdAndUpdate(
      req.params.id,
      {
        Fname,
        Lname,
        email,
        phone,
      },
      { new: true }
    )
    if (!updatedata) {
      return res.status(404).json({ message: "User Id not found" });
    }
    return res.status(200).json({ message: "User's data is sucessully updated", updatedata });

  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }

};