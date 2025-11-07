import { Request, Response } from 'express';
import Expense from '../models/Expense';

export const createExpense = async (req: Request, res: Response) => {
    try {
        const { description, amount, date } = req.body;
        const newExpense = new Expense({ description, amount, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar despesa' });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar despesas' });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { description, amount, date } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(id, { description, amount, date }, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar despesa' });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Despesa excluída' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir despesa' });
    }
};

export const getTotalExpenses = async (req: Request, res: Response) => {
    try {
        const total = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
        res.json({ totalAmount });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao calcular o total das despesas' });
    }
};