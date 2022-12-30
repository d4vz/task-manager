import React, { useState, useEffect } from 'react';
import CustomModal from './components/Modal';

type Task = {
  title: string;
  description: string;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '' });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask({ title: '', description: '' });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="container">
      <button onClick={handleModalOpen}>Add Task</button>
      <CustomModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2>Add Task</h2>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleTaskChange}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleTaskChange}
          />
        </form>
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={handleModalClose}>Cancel</button>
      </CustomModal>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
