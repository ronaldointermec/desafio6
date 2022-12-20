import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

import { getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
interface Request {
  title: string,
  value: string,
  type: 'income' | 'outcome',
  category: string;
}

class CreateTransactionService {
  public async execute({ title, type, value, category }: Request): Promise<Transaction> {

    let category_id;

    const transactionRepository = getRepository(Transaction);

    const catetoryRepository = getRepository(Category);

    const transacation = new TransactionsRepository();
    const balance = await transacation.getBalance();

    const valor = parseInt(value)

    if (type === 'outcome') {
      if (valor > balance.total) {
        throw new AppError('Saldo infuficiente', 400);
      }
    }

    const findCategory = await catetoryRepository.findOne({ where: { title: category } });
    category_id = findCategory?.id;

    if (!findCategory) {
      const categoryCreated = catetoryRepository.create({ title: category });
      const categorySalved = await catetoryRepository.save(categoryCreated)
      category_id = categorySalved.id
    }


    const transaction = transactionRepository.create({ title, value, type, category_id });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
