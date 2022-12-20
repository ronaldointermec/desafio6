import AppError from '../errors/AppError';

import { getRepository } from 'typeorm'

import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    try {
      const transacationRepository = getRepository(Transaction);
      await transacationRepository.delete(id);
    } catch {
      new AppError('Não foi possivel realizar a exclusão', 400)
    }

  }
}

export default DeleteTransactionService;
