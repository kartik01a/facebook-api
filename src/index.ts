import express from 'express';
import bodyParser from 'body-parser';
import "dotenv/config"
import connect = require('./DB/connect')
import userRouter from './routes/route'
import 'express-async-errors'
// import imageRoute from './routes/images' ;
import cookieParser from 'cookie-parser'
import multer from 'multer'

const PORT = process.env.PORT || 5000;

import errorHandlerMiddleware from './middleware/errorHandler';
declare global {
  namespace Express {
    interface Request {
      userId?: string ;
    }
  }
}
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',userRouter);
app.use(errorHandlerMiddleware)
// app.use('/image',imageRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async () => {
    try {
      // connectDB
      await connect.connectDB(process.env.MONGO_URL!);
      app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
