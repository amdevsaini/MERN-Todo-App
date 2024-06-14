import { addTodoUrl, getTodoUrl } from "../CONSTANTS";

export const addTodo = async (title, description) => {
    const response = await fetch(addTodoUrl, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title, description
        })
    })

    return await response.json();
}

export const getTodo = async (title, description) => {
    const response = await fetch(getTodoUrl, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}