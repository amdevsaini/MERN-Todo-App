import React, { useEffect, useRef, useState } from 'react';
import { addTodo, getTodo, deleteTodo } from '../utils/routing';

const Todo = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [view, setView] = useState(false);

  const handleAdd = () => {
    setView(!view);
  }

  const title = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    async function getDataTodo() {
      try {
        const data = await getTodo();
        setAllTodo(data.todos);
      } catch (error) {
        // Handle errors appropriately, e.g., set an error state
        console.error('Error fetching todo data:', error);
      }
    }

    // Call getDataTodo directly when component mounts
    getDataTodo();

    // Also call getDataTodo when isAdded changes
    if (isAdded) {
      getDataTodo();
      setIsAdded(false); // Reset isAdded state after triggering the call
    }
  }, [isAdded]);


  const handleApiCall = async (title, description) => {
    const data = await addTodo(title, description);
    if (data.success) {
      setIsAdded(true);
      setView(true);
    }
  }

  const handleChange = () => {
    setError(null);
  }

  const completeTodo = async (todoID) => {
    await deleteTodo(todoID);
    setIsAdded(true);
  }

  const handleSubmit = () => {
    if (!title?.current?.value || !description?.current?.value) {
      setError('Please Enter the details.');
    } else {
      handleApiCall(title?.current?.value, description?.current?.value);
    }

  }

  return (
    <div className="relative w-1/2 my-20 p-10 bg-black mx-auto text-white bg-opacity-80 rounded-lg mb-4">
      {allTodo.length > 0 && view && <div className='absolute top-3 right-0 h-10 w-16'><button className='right-0' onClick={handleAdd}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      </button></div>}
      {(allTodo.length > 0 && view) ?
        allTodo.map(ele =>
          <div className='flex justify-between'>
            <div>
              <p>{ele.title}</p>
              <p>{ele.description}</p>
              <br />
              <br />
            </div>
            <div>
              <button onClick={() => completeTodo(ele._id)} className="p-2 my-1 bg-red-700 w-full rounded-lg h-12">Mark as Complete</button>
            </div>
          </div>

        )
        : <>
          <div className='flex justify-between'>
            <h1 className="mx-auto text-center text-3xl mb-2">Todo App</h1>
            {allTodo.length > 0 && <button onClick={handleAdd}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            </button>}
          </div>
          <label htmlFor="title" className="block text-sm font-medium text-white dark:text-white">
            Todo title
          </label>
          <input
            ref={title}
            onChange={handleChange}
            type="text"
            placeholder="Enter title"
            className="p-4 my-2 w-full bg-gray-700 h-12 rounded-lg"
          />
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-white dark:text-white">
            Your message
          </label>
          <textarea
            ref={description}
            onChange={handleChange}
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <p className='text-red-500 text-xs my-2'>{error}</p>
          <button onClick={handleSubmit} className="p-2 my-1 bg-red-700 w-full rounded-lg h-12">Add todo</button> </>}
    </div>
  );
};

export default Todo;
