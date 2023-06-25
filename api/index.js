import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello ");
})


app.listen(8800, () => {
    console.log('app listening on port 3001');
});
