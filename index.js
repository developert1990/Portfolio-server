import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRouter from './routes/userSigninRouter';
import skillsRouter from './routes/skillsRouter';
import mongoose from 'mongoose';


dotenv.config();

console.log('플레그: == > ', process.argv)

console.log('process.env.NODE_ENV ==> ', process.env.NODE_ENV)

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
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));


app.use('/api', userRouter);
app.use('/api', skillsRouter);
app.get('/', (req, res) => {
    res.send("Server is connected")
})

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})


app.listen(PORT || 7777, () => {
    console.log(`Server is running at ${PORT}`)
})