import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';



interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const rep = getRepository(Transaction);
    const transacations = await rep.find();

    const { income, outcome } = transacations.reduce((priviousValue: Balance, currenValue: Transaction) => {
      switch (currenValue.type) {        
        case 'income':
          priviousValue.income += parseInt(currenValue.value);
          break;

        case 'outcome':
          priviousValue.outcome += parseInt(currenValue.value);
          break;

        default:
          break;
      }
      return priviousValue
    }, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;

    return { income, outcome, total }

  }
}

export default TransactionsRepository;
