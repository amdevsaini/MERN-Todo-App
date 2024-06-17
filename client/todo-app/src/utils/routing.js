import { addTodoUrl, getTodoUrl, deleteTodoUrl } from "../CONSTANTS";

export const addTodo = async (title, description) => {
    const response = await fetch(addTodoUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, description
        })
    })

    return await response.json();
}

export const getTodo = async () => {
    const response = await fetch(getTodoUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}

export const deleteTodo = async (titleId) => {
    const response = await fetch(deleteTodoUrl, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: titleId
        })
    })

    return await response.json();
}