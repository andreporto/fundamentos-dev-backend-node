import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const result = transactionsRepository.all();
    const resultBalance = transactionsRepository.getBalance();
    return response.status(200).json({transactions:result, balance:resultBalance});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const {title, value, type} = request.body;
  if(type == 'outcome') {
    const {total} = transactionsRepository.getBalance();
    if (value > total) return response.status(400).json({error: "There is no enough balance"});
  }

  try {
    const service = new CreateTransactionService(transactionsRepository);
    const result = service.execute({title, value, type})
    return response.status(200).json(result)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
