import express from 'express';
import cors from 'cors';
import log from './logger';
import router from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000 ;


app.listen(PORT,()=> log.info(`server is running on port : ${PORT}`));
    

app.use('/api',router);