import React, { useState } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  if (expenses.length === 0) return (
    <div className="alert alert-info" role="alert">
      No expenses to display. Add an expense to get started!
    </div>
  );

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <span className="badge bg-secondary">{expense.category}</span>
              </td>
              <td>
                {deleteConfirm === expense.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => {
                        onDelete(expense.id);
                        setDeleteConfirm(null);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setDeleteConfirm(expense.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-group-divider">
          <tr>
            <td className="fw-bold">Total</td>
            <td className="fw-bold">${totalAmount.toFixed(2)}</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
