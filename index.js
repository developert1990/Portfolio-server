import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRouter from './userSignin';
import mongoose from 'mongoose';


dotenv.config();

if (!process.env.MONGODB_URL) {
    console.log("MONGODB_URL is not set");
    process.exit(1);
}

const PORT = 7777
const app = express();

const corsOption = {
    origin: true,
    credentials: true,
    preFlightContinue: true,
}

app.use(cors(corsOption));
app.use(express.json());

app.use('/api', userRouter);


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})


app.listen(PORT || 7777, () => {
    console.log(`Server is running at ${PORT}`)
})