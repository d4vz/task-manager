import React from 'react';

type Task = {
  title: string;
  description: string;
  timestamp: number;
};

type TaskItemProps = {
  task: Task;
  delete: (taskId: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  delete: handleDeleteTask,
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setChecked(checked);
  };

  return (
    <li className="p-2 flex w-full justify-between items-center">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div>
          <h3
            className={`text-xl font-bold ${checked ? 'line-through' : ''}
          `}
          >
            {task.title}
          </h3>
          <p className="text-gray-600">{task.description}</p>
        </div>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleDeleteTask(task.timestamp)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
