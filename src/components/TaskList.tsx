import React from 'react';
import TaskItem from './TaskItem';

type Task = {
  title: string;
  description: string;
  timestamp: number;
};

type TaskListProps = {
  tasks: Task[];
  delete: (taskId: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  delete: handleDeleteTask,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.title} task={task} delete={handleDeleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
