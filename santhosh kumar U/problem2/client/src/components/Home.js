import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Register.module.css';


const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', type: '', amount: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/home');
      setExpenses(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/home', newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ name: '', type: '', amount: '' });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleEdit = async (expense) => {
    try {
      const response = await axios.put(`/api/home/${expense._id}`, expense);
      const updatedExpenses = expenses.map((e) => (e._id === expense._id ? response.data : e));
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/home/${id}`);
      const updatedExpenses = expenses.filter((e) => e._id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Expense Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newExpense.name}
          onChange={handleChange}
        />
        <label htmlFor="type">Expense Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={newExpense.type}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <p>Name: {expense.name}</p>
            <p>Type: {expense.type}</p>
            <p>Amount: {expense.amount}</p>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;