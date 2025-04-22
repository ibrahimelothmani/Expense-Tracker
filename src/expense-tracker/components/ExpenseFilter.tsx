interface Props {
  onFilterChange: (category: string) => void;
}

export const categories = ["Groceries", "Utilities", "Entertainment", "Housing", "Transport", "Health", "Learning"];

const ExpenseFilter = ({ onFilterChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="category-filter" className="form-label">Filter by Category</label>
      <select
        id="category-filter"
        className="form-select"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
