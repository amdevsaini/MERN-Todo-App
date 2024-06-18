const express = require('express');
const mongoose = require('mongoose');
const { createTodo, updateTodo } = require('./validation');
const { todo } = require('./db');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

const mongoURI = 'mongodb://127.0.0.1/TodoApp';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload) {
        return res.status(411).json({
            message: "Invalid Inputs to create Todo"
        })
    }

    const result = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    if (result) {
        return res.status(200).json({
            success: true,
            message: "Todo has been created successfully"
        })
    } else {
        return res.status(401).json({
            message: "Internal Server Error"
        })
    }

})

app.get("/todos", async (req, res) => {
    const todos = await todo.find({ completed: false })
    return res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload) {
        return res.status(411).json({
            message: "Invalid Inputs for update"
        })
    }
    const updateData = await todo.updateOne({
        _id: updatePayload._id
    }, {
        completed: true
    })

    console.log("Data has been updated", updateData);
    if (updateData) {
        res.json({
            message: "Todo has been completed."
        })
    }
})

app.patch("/update", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Invalid Inputs for update"
        });
    }

    const { _id, title, description } = updatePayload;

    try {
        const updateData = await todo.updateOne(
            { _id },
            { $set: { title, description } }
        );

        console.log("Data has been updated", updateData);

        if (updateData.nModified === 0) {
            return res.status(404).json({
                message: "Todo not found or no changes made."
            });
        }

        res.json({
            success: true,
            message: "Todo has been updated."
        });
    } catch (error) {
        console.error("Error updating todo", error);
        res.status(500).json({
            message: "An error occurred while updating the todo."
        });
    }
});

app.listen('1234', () => console.log("Server Started on port 1234"))