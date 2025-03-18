"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// File to store tasks
var FILE_PATH = "tasks.json";
// Load tasks from JSON file
function loadTasks() {
    try {
        var data = fs.readFileSync(FILE_PATH, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
}
// Save tasks to JSON file
function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
// Function to add a task
function addTask(title, description) {
    var tasks = loadTasks();
    var newTask = { id: Date.now(), title: title, description: description, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}
// Function to get all tasks
function getTasks() {
    return loadTasks();
}
// Function to update a task
function updateTask(id, updatedData) {
    var tasks = loadTasks();
    var taskIndex = tasks.findIndex(function (task) { return task.id === id; });
    if (taskIndex === -1) {
        console.log("Task with ID ".concat(id, " not found!"));
        return null;
    }
    tasks[taskIndex] = __assign(__assign({}, tasks[taskIndex]), updatedData);
    saveTasks(tasks);
    return tasks[taskIndex];
}
// Function to delete a task
function deleteTask(id) {
    var tasks = loadTasks();
    var newTasks = tasks.filter(function (task) { return task.id !== id; });
    if (tasks.length === newTasks.length) {
        console.log("Task with ID ".concat(id, " not found!"));
        return false;
    }
    saveTasks(newTasks);
    return true;
}
// ---------------------------
// Example Usage
// Add multiple tasks
var sampleTasks = [
    { title: "Learn TypeScript", description: "Complete a CRUD task" },
    { title: "Study Node.js", description: "Read documentation" },
    { title: "Practice JavaScript", description: "Work on algorithms" },
    { title: "Write Blog", description: "Publish a TypeScript article" },
    { title: "Workout", description: "30-minute exercise" },
    { title: "Meditation", description: "10 minutes of mindfulness" },
    { title: "Read Book", description: "Finish one chapter" },
    { title: "Learn Express.js", description: "Build a small API" },
    { title: "Contribute to Open Source", description: "Find a GitHub issue" },
    { title: "Write Tests", description: "Add unit tests for the project" },
];
console.log("\nAdding Tasks...");
sampleTasks.forEach(function (task) { return console.log("Added:", addTask(task.title, task.description)); });
// View all tasks
console.log("\nAll Tasks:", getTasks());
// Update a specific task
var allTasks = getTasks();
if (allTasks.length > 0) {
    console.log("\nUpdating Task...");
    var updatedTask = updateTask(allTasks[1].id, { completed: true });
    console.log("Updated Task:", updatedTask);
}
// Delete a specific task
if (allTasks.length > 2) {
    console.log("\nDeleting Task...");
    var deleted = deleteTask(allTasks[2].id);
    console.log("Deleted:", deleted);
}
// View all tasks after update and delete
console.log("\nAll Tasks After Deletion and Update:", getTasks());
