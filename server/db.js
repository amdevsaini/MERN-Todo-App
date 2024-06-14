const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required:true},
    completed: {type: Boolean },
    timeStamp: { type: Date, default: Date.now()}
},{
    collection: 'Todo-App'
})


const todo = mongoose.model('TodoApp', todoSchema);

module.exports = {
    todo
};