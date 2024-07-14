import express from "express";
import userRouter from "./router/user"
import bodyParser from 'body-parser';
const app=express();

const cors = require('cors');

app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use(cors());
app.use(express.json());

app.listen(4000);

const corsOptions = {
    origin:'*', 
   credentials:true,
   methods: ['GET','POST', 'PUT'], 
   allowedHeaders: ['Content-Type', 'Authorization'], 
  };
 
app.use(cors(corsOptions));
export {app,corsOptions}