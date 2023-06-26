import express from 'express';
import mongoose from 'mongoose';

const app = express();

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


app.listen(8800, () => {
    connect();
    console.log('app listening on port 8800');
});
