import React from 'react'

const Todo = () => {
    return (
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" w-1/3 my-20 p-10 bg-black  mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg mb-4"
          > 
            <h1 class="text-center text-3xl mb-2">Todo App</h1>
            <label for="message" class="block text-sm font-medium text-white dark:text-white">Todo title</label>
            <input
              type="text"
              placeholder="Email Address"
              className="p-4 my-2 w-full bg-gray-700 h-12 rounded-lg"
            />
            <label for="message" class="block mb-2 text-sm font-medium text-white dark:text-white">Your message</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

            <button
              className="p-2 my-6 bg-red-700 w-full rounded-lg h-12"
            >
              Add todo
            </button>
          </form>
        </div>
      );
}

export default Todo