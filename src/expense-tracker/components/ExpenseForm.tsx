import { useState } from "react";
import { z } from "zod";
import { useLanguage } from "../../i18n/LanguageContext";
import { categories as translatedCategories, TranslationKey } from "../../i18n/translations";

// Create schema for form validation
const createSchema = (t: (key: TranslationKey) => string) => z.object({
  description: z.string().min(3, { message: t('validationMinChars') }),
  amount: z.number({ invalid_type_error: t('validationRequired') }).min(0.01, { message: t('validationAmount') }),
  category: z.string().min(1, { message: t('validationRequired') })
});

// Type for the data that will be submitted through the form
export type ExpenseFormData = {
  description: string;
  amount: number;
  category: string;
};

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const { t, language, isRtl } = useLanguage();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get the categories for the current language
  const categories = translatedCategories[language];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const schema = createSchema(t);
      // Parse and validate the data
      schema.parse({
        description,
        amount: parseFloat(amount.toString()),
        category
      });
      
      // Find the English category equivalent since we store category values in English
      const categoryIndex = translatedCategories[language].findIndex(cat => cat === category);
      const englishCategory = translatedCategories.en[categoryIndex];
      
      onSubmit({
        description,
        amount: parseFloat(amount.toString()),
        category: englishCategory || category
      });
      
      // Reset form after submission
      setDescription("");
      setAmount("");
      setCategory("");
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        err.errors.forEach(error => {
          const field = error.path[0].toString();
          errorMap[field] = error.message;
        });
        setErrors(errorMap);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="description" className="form-label">
            {t('description')}
          </label>
          <input 
            id="description" 
            type="text" 
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('expenseDescription')}
            dir={isRtl ? "rtl" : "ltr"}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="amount" className="form-label">
            {t('amount')}
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input 
              id="amount" 
              type="number" 
              step="0.01"
              className={`form-control ${errors.amount ? "is-invalid" : ""}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              dir="ltr"
            />
            {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          {t('category')}
        </label>
        <select 
          className={`form-select ${errors.category ? "is-invalid" : ""}`} 
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <option value="">{t('selectCategory')}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>
      
      <button type="submit" className="btn btn-primary w-100">{t('addExpense')}</button>
    </form>
  );
};

export default ExpenseForm;
