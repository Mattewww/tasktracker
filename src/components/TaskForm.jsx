import React, { useState } from 'react';

import './TaskForm.css';
import Tag from './Tag';

const TaskForm = ({ setTasks }) => {
	const [taskData, setTaskData] = useState({
		task: '',
		status: 'todo',
		tags: [],
	});

	const checkTag = (tag) => {
		return taskData.tags.some((item) => item === tag);
	};

	const selectTag = (tag) => {
		if (taskData.tags.some((item) => item === tag)) {
			const filterTags = taskData.tags.filter((item) => item !== tag);
			setTaskData((prev) => {
				return { ...prev, tags: filterTags };
			});
		} else {
			setTaskData((prev) => {
				return { ...prev, tags: [...prev.tags, tag] };
			});
		}
	};
	// console.log(taskData.tags);

	const handleChange = (event) => {
		const { name, value } = event.target;

		// const name = event.target.name;
		// const value = event.target.value;

		setTaskData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(taskData);
		setTasks((prev) => {
			return [...prev, taskData];
		});
		setTaskData({
			task: '',
			status: 'todo',
			tags: [],
		});
	};
	return (
		<header className='app_header'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={taskData.task}
					name='task' // Crucial for #2 method (handleChange)
					className='task_input'
					placeholder='Enter your task'
					// onChange={handleTaskChange} #1
					onChange={handleChange}
				/>
				<div className='task_form_bottom_line'>
					<div>
						<Tag
							tagName='HTML'
							onTagSelect={selectTag}
							selected={checkTag('HTML')}
						/>
						<Tag
							tagName='CSS'
							onTagSelect={selectTag}
							selected={checkTag('CSS')}
						/>
						<Tag
							tagName='JavaScript'
							onTagSelect={selectTag}
							selected={checkTag('JavaScript')}
						/>
						<Tag
							tagName='React'
							onTagSelect={selectTag}
							selected={checkTag('React')}
						/>
					</div>
					<div>
						<select
							value={taskData.status}
							name='status' // Crucial for #2 method (handleChange)
							className='task_status'
							// onChange={handleStatusChange} #1
							onChange={handleChange}
						>
							<option value='todo'>To Do</option>
							<option value='doing'>Doing</option>
							<option value='done'>Done</option>
						</select>
						<button type='submit' className='task_submit'>
							+ Add Task
						</button>
					</div>
				</div>
			</form>
		</header>
	);
};

export default TaskForm;
