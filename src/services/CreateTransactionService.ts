import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome',
  category: string;
}

class CreateTransactionService {
  public async execute({ title, type, value, category }: Request): Promise<Transaction> {

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const catetoryRepository = getRepository(Category);

    let transacationCategory = await catetoryRepository.findOne({
      where: {
        title: category
      }
    });
    const { total } = await transactionRepository.getBalance();



    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance', 400);
    }

 
    if (!transacationCategory) {
      transacationCategory = catetoryRepository.create({
        title: category
      });

      await catetoryRepository.save(transacationCategory);
    }


    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: transacationCategory.id
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
