import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import TaskList from './components/TaskList';

type Task = {
  title: string;
  description: string;
  timestamp: number;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    timestamp: 0,
  });

  useEffect(() => {
    const tasksFromStorage = localStorage.getItem('tasks');
    const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
    setTasks(tasks);
  }, []);

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
    const updatedTasks = [...tasks, { ...newTask, timestamp: Date.now() }];
    updatedTasks.sort((a, b) => b.timestamp - a.timestamp);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask({ title: '', description: '', timestamp: 0 });
    handleModalClose();
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.timestamp !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="bg-blue-200 h-screen">
      <div className="max-w-3xl mx-auto h-full bg-gray-100 p-4 flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center"
          onClick={handleModalOpen}
        >
          Add Task
        </button>
        <TaskList tasks={tasks} delete={handleDeleteTask} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="bg-white p-4 rounded flex flex-col w-1/2"
          overlayClassName="bg-gray-900 bg-opacity-50 fixed inset-0 flex items-center justify-center"
        >
          <label htmlFor="title" className="block">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleTaskChange}
          />
          <label htmlFor="description" className="mt-2 block">
            Description:
          </label>
          <input
            className="block mb-2"
            id="description"
            type="textarea"
            name="description"
            value={newTask.description}
            onChange={handleTaskChange}
          />
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 w-1/2"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
