import { useState } from "react";
import { categories } from "./ExpenseFilter";
import { z } from "zod";

// Create schema for form validation
const schema = z.object({
  description: z.string().min(3, { message: "Description should be at least 3 characters" }),
  amount: z.number({ invalid_type_error: "Amount is required" }).min(0.01, { message: "Amount must be greater than 0" }),
  category: z.string().min(1, { message: "Category is required" })
});

// Type for the data that will be submitted through the form
export type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const data = schema.parse({
        description,
        amount: parseFloat(amount.toString()),
        category
      });
      
      onSubmit(data);
      
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
            Description
          </label>
          <input 
            id="description" 
            type="text" 
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this expense for?"
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
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
            />
            {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select 
          className={`form-select ${errors.category ? "is-invalid" : ""}`} 
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>
      
      <button type="submit" className="btn btn-primary w-100">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
