import { useLanguage } from '../../i18n/LanguageContext';
import { categories as translatedCategories } from '../../i18n/translations';

interface Props {
  onFilterChange: (category: string) => void;
}

const ExpenseFilter = ({ onFilterChange }: Props) => {
  const { t, language } = useLanguage();
  
  // Get the categories for the current language
  const categories = translatedCategories[language];

  return (
    <div className="mb-3">
      <label htmlFor="category-filter" className="form-label">{t('filterByCategory')}</label>
      <select
        id="category-filter"
        className="form-select"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">{t('allCategories')}</option>
        {categories.map((category, index) => (
          <option key={category} value={translatedCategories.en[index]}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
