

import { useState } from 'react'
import ExpenseList from './expense-tracker/components/ExpenseList'

const [expenses, setExpenses] = useState([
  { id: 1, description: 'Groceries', amount: 50.0, category: 'Food' },
  { id: 2, description: 'Rent', amount: 1200.0, category: 'Housing' },
  { id: 3, description: 'Utilities', amount: 150.0, category: 'Bills' },
  { id: 4, description: 'Transportation', amount: 75.0, category: 'Transport' },
  { id: 5, description: 'Entertainment', amount: 100.0, category: 'Leisure' },
  { id: 6, description: 'Healthcare', amount: 200.0, category: 'Health' },
  { id: 7, description: 'Education', amount: 300.0, category: 'Learning' },
]);



const App = () => {
  return (
    <div>
      <ExpenseList expenses={expenses} onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}/> 
    </div>
  )
}

export default App
