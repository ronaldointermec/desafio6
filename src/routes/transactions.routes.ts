import { Router } from 'express';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = new TransactionsRepository();

  const transactions = await getRepository(Transaction)
    .createQueryBuilder('transaction')
    .innerJoinAndSelect("transaction.category", "category")
    .getMany();

  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });

});

transactionsRouter.post('/', async (request, response) => {

  const { title, type, value, category } = request.body;

  const createTransactionService = new CreateTransactionService();
  const transacation = await createTransactionService.execute({ title, type, value, category });

  return response.json(transacation);

});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransactionService = new DeleteTransactionService();
  await deleteTransactionService.execute(id);
  return response.status(204).send()

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
