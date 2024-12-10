import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Price Hunter API" })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});