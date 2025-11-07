import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import expenseRoutes from './routes/expenseRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../views')));

app.use('/api/expenses', expenseRoutes);

mongoose.connect('mongodb://localhost:27017/controle-despesas')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});