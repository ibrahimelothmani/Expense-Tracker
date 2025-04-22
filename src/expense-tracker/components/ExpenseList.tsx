import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { categories as translatedCategories } from "../../i18n/translations";

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
  const { t, language } = useLanguage();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  if (expenses.length === 0) return (
    <div className="alert alert-info" role="alert">
      {t('noExpenses')}
    </div>
  );

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Function to translate category from English to current language
  const translateCategory = (englishCategory: string): string => {
    const index = translatedCategories.en.findIndex(cat => cat === englishCategory);
    return index !== -1 ? translatedCategories[language][index] : englishCategory;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>{t('description')}</th>
            <th>{t('amount')}</th>
            <th>{t('category')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <span className="badge bg-secondary">{translateCategory(expense.category)}</span>
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
                      {t('confirm')}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      {t('cancel')}
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setDeleteConfirm(expense.id)}
                  >
                    {t('delete')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-group-divider">
          <tr>
            <td className="fw-bold">{t('totalExpenses')}</td>
            <td className="fw-bold">${totalAmount.toFixed(2)}</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
