import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsBalance = getCustomRepository(TransactionsRepository);

  const transactions = await getCustomRepository(TransactionsRepository).find();
  // .createQueryBuilder('transaction')
  // .innerJoinAndSelect('transaction.category', 'category')
  // .getMany();

  const balance = await transactionsBalance.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const createTransaction = new CreateTransactionService();
  const transacation = await createTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transacation);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransaction = new DeleteTransactionService();
  await deleteTransaction.execute(id);
  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const ImportTransactions = new ImportTransactionsService();
    const transaction = await ImportTransactions.execute(request.file.path);
    return response.json(transaction);
  },
);

export default transactionsRouter;
