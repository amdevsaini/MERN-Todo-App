import React, { useEffect, useRef, useState } from 'react';
import { addTodo, getTodo } from '../utils/routing';

const Todo = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  
  const title = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    async function getDataTodo() { 
      const data = await getTodo();
      setAllTodo(data.todos);
    }
    console.log("++++++++", allTodo);
    if (isAdded) {
      getDataTodo();
      setIsAdded(false);
    }
  }, [isAdded]);


  const handleApiCall = async (title, description) => {
    const data = await addTodo(title, description);
    if (data.success) {
      setIsAdded(true);
    } 
  }

  const handleChange = () => {
    setError(null);
  }

  const handleSubmit = () => {
    if (!title?.current?.value || !description?.current?.value) {
      setError('Please Enter the details.');
    } else {
      handleApiCall(title?.current?.value, description?.current?.value);
    }
  }
  
  return (
    <div className="w-1/2 my-20 p-10 bg-black mx-auto text-white bg-opacity-80 rounded-lg mb-4">
      { allTodo.length ? 
      allTodo.map(ele => 
      <div className='flex'>
      <div>
      <p>{ele.title}</p>
      <p>{ele.description}</p>
      <br/>
      <br/>
      </div>
      <div className='right-0'>
      <button onClick={handleSubmit} className="p-2 my-1 bg-red-700 w-full rounded-lg h-12">Add todo</button>
      </div>
      </div>
      
      )
      : <><h1 className="text-center text-3xl mb-2">Todo App</h1>
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
