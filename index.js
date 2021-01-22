import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = 7777
const app = express();

const corsOption = {
    origin: true,
    credentials: true,
    preFlightContinue: true,
}

app.use(cors(corsOption));
app.use(express.json());

app.listen(PORT || 7777, () => {
    console.log(`Server is running at ${PORT}`)
})