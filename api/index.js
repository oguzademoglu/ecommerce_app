import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, 
        console.log('Connected to MongoDB...')
        );        
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDb disconnected!");
});

app.get('/', (req,res) => {
    res.send("Hello ");
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    connect();
    console.log('app listening on port 8800');
});
