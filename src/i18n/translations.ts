// Define translation keys
export type TranslationKey = 
  | 'appTitle'
  | 'lightMode'
  | 'darkMode'
  | 'exportCSV'
  | 'resetData'
  | 'resetConfirmation'
  | 'addNewExpense'
  | 'description'
  | 'amount'
  | 'category'
  | 'filterByCategory'
  | 'allCategories'
  | 'selectCategory'
  | 'totalExpenses'
  | 'noExpenses'
  | 'addExpense'
  | 'delete'
  | 'confirm'
  | 'cancel'
  | 'expenseDescription'
  | 'expenseCategories'
  | 'validationMinChars'
  | 'validationRequired'
  | 'validationAmount';

// Categories
export const categories = {
  en: ["Groceries", "Utilities", "Entertainment", "Housing", "Transport", "Health", "Learning"],
  ar: ["البقالة", "الخدمات", "الترفيه", "السكن", "النقل", "الصحة", "التعليم"]
};

// Translations
export const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    appTitle: 'Expense Tracker',
    lightMode: '☀️ Light Mode',
    darkMode: '🌙 Dark Mode',
    exportCSV: '📊 Export CSV',
    resetData: 'Reset Data',
    resetConfirmation: 'Are you sure you want to reset to default expenses? This will delete all your current expenses.',
    addNewExpense: 'Add New Expense',
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    filterByCategory: 'Filter by Category',
    allCategories: 'All Categories',
    selectCategory: 'Select Category',
    totalExpenses: 'Total Expenses',
    noExpenses: 'No expenses to display. Add an expense to get started!',
    addExpense: 'Add Expense',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    expenseDescription: 'What was this expense for?',
    expenseCategories: 'Categories',
    validationMinChars: 'Description should be at least 3 characters',
    validationRequired: 'Category is required',
    validationAmount: 'Amount must be greater than 0'
  },
  ar: {
    appTitle: 'متتبع المصاريف',
    lightMode: '☀️ وضع النهار',
    darkMode: '🌙 وضع الليل',
    exportCSV: '📊 تصدير CSV',
    resetData: 'إعادة ضبط البيانات',
    resetConfirmation: 'هل أنت متأكد من أنك تريد إعادة التعيين إلى المصاريف الافتراضية؟ سيؤدي هذا إلى حذف جميع مصاريفك الحالية.',
    addNewExpense: 'إضافة مصروف جديد',
    description: 'الوصف',
    amount: 'المبلغ',
    category: 'الفئة',
    filterByCategory: 'تصفية حسب الفئة',
    allCategories: 'جميع الفئات',
    selectCategory: 'اختر الفئة',
    totalExpenses: 'إجمالي المصاريف',
    noExpenses: 'لا توجد مصاريف للعرض. أضف مصروفًا للبدء!',
    addExpense: 'إضافة مصروف',
    delete: 'حذف',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    expenseDescription: 'على ماذا كان هذا المصروف؟',
    expenseCategories: 'الفئات',
    validationMinChars: 'يجب أن يتكون الوصف من 3 أحرف على الأقل',
    validationRequired: 'الفئة مطلوبة',
    validationAmount: 'يجب أن يكون المبلغ أكبر من 0'
  }
}; 