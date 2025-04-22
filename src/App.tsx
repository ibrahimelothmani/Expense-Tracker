import { useState, useEffect } from 'react'
import ExpenseList from './expense-tracker/components/ExpenseList'
import ExpenseFilter from './expense-tracker/components/ExpenseFilter';
import ExpenseForm from './expense-tracker/components/ExpenseForm';
import { useLanguage } from './i18n/LanguageContext';
import LanguageSwitcher from './i18n/LanguageSwitcher';
import { categories as translatedCategories } from './i18n/translations';

// Define the expense type
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

// Default expenses
const defaultExpenses: Expense[] = [];

const App = () => {
  const { t, isRtl } = useLanguage();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : defaultExpenses;
  });

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Apply dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
    if (isRtl) {
      document.body.classList.add('rtl');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode, isRtl]);

  const visibleExpenses = selectedCategory 
    ? expenses.filter(e => e.category === selectedCategory)
    : expenses;

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    // Find the next ID
    const nextId = expenses.length > 0 
      ? Math.max(...expenses.map(e => e.id)) + 1 
      : 1;
      
    setExpenses([...expenses, { ...expense, id: nextId }]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleResetExpenses = () => {
    if (window.confirm(t('resetConfirmation'))) {
      setExpenses(defaultExpenses);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['ID', t('description'), t('amount'), t('category')];
    const dataRows = expenses.map(expense => 
      [expense.id, expense.description, expense.amount.toFixed(2), expense.category]
    );
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up and trigger download
    link.setAttribute('href', url);
    link.setAttribute('download', `expense-data-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`container mt-5 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className={darkMode ? 'text-info' : 'text-primary'}>{t('appTitle')}</h1>
        <div>
          <LanguageSwitcher />
          <button 
            className="btn btn-success me-2"
            onClick={handleExportCSV}
            disabled={expenses.length === 0}
          >
            {t('exportCSV')}
          </button>
          <button 
            className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? t('lightMode') : t('darkMode')}
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleResetExpenses}
          >
            {t('resetData')}
          </button>
        </div>
      </div>
      
      <div className={`card mb-4 ${darkMode ? 'bg-dark border-secondary' : ''}`}>
        <div className="card-body">
          <h5 className="card-title mb-3">{t('addNewExpense')}</h5>
          <ExpenseForm onSubmit={handleAddExpense} />
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <ExpenseFilter onFilterChange={(category) => setSelectedCategory(category)} />
        </div>
        <div className="col-md-6 text-end">
          <p className="mb-0">
            {selectedCategory && (
              <span className="badge bg-info me-2">
                {(() => {
                  // Translate the category to the current language if needed
                  const categoryIndex = translatedCategories.en.findIndex(cat => cat === selectedCategory);
                  if (categoryIndex !== -1) {
                    return translatedCategories[isRtl ? 'ar' : 'en'][categoryIndex];
                  }
                  return selectedCategory;
                })()}
              </span>
            )}
            {t('totalExpenses')}: <span className="fw-bold">${visibleExpenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0).toFixed(2)}</span>
          </p>
        </div>
      </div>
      
      <ExpenseList 
        expenses={visibleExpenses}
        onDelete={handleDeleteExpense}
      /> 
    </div>
  )
}

export default App
