const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Import cors

const app = express();
app.use(cors()); // Allows all domains to access the server
app.use(bodyParser.json());

let todos = [];

app.post('/todos', (req, res) => {
  const { title, description, text, dueDate, category } = req.body;

  if (!text || !dueDate || !category) {
    return res.status(400).json({ message: 'Text, DueDate, and Category are required!' });
  }
  
  const newTodo = {
    id: uuidv4(),
    title,
    description,
    text,
    dueDate,
    category,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all Todos
app.get('/todos', (req, res) => {
  const { filter, sortBy, category } = req.query;

  let filteredTodos = todos;

  if (category) {
    filteredTodos = filteredTodos.filter((todo) => todo.category === category);
  }

  if (filter === 'active') {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  }

  if (sortBy) {
    filteredTodos = filteredTodos.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'createdAt') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });
  }

  res.json(filteredTodos);
});


app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, text, dueDate, category } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    text: text || todos[todoIndex].text,
    dueDate: dueDate || todos[todoIndex].dueDate,
    category: category || todos[todoIndex].category,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
  };

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});


app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
