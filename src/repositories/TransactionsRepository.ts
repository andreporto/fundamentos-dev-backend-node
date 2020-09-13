import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomings = this.transactions.filter(t => t.type == 'income').map(t=> t.value);
    const incomeValue = incomings.length > 0 ? incomings.reduce((bincome, value)=> bincome + value) : 0;
    const outcomings = this.transactions.filter(t => t.type == 'outcome').map(t=> t.value);
    const outcomeValue = outcomings.length > 0 ? outcomings.reduce((boutcome, value)=> boutcome + value):0;
    const balance: Balance = {income: incomeValue, outcome: outcomeValue, total: incomeValue - outcomeValue}
    return balance;
  }

  public create(transactionData: Omit<Transaction,'id'>): Transaction {
    const transaction = new Transaction(transactionData);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
