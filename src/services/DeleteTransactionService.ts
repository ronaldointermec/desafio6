import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transacationRepository = getCustomRepository(TransactionsRepository);

    const transacation = await transacationRepository.findOne(id);
    if (!transacation) {
      throw new AppError('Transation does not exist', 400);
    }

    await transacationRepository.remove(transacation);
  }
}

export default DeleteTransactionService;
