import * as fs from "fs";

// Task Interface
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// File to store tasks
const FILE_PATH = "tasks.json";

// Load tasks from JSON file
function loadTasks(): Task[] {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save tasks to JSON file
function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

// Function to add a task
function addTask(title: string, description: string): Task {
  const tasks = loadTasks();
  const newTask: Task = { id: Date.now(), title, description, completed: false };
  
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

// Function to get all tasks
function getTasks(): Task[] {
  return loadTasks();
}

// Function to update a task
function updateTask(id: number, updatedData: Partial<Task>): Task | null {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    console.log(`Task with ID ${id} not found!`);
    return null;
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
  saveTasks(tasks);
  return tasks[taskIndex];
}

// Function to delete a task
function deleteTask(id: number): boolean {
  let tasks = loadTasks();
  const newTasks = tasks.filter(task => task.id !== id);

  if (tasks.length === newTasks.length) {
    console.log(`Task with ID ${id} not found!`);
    return false;
  }

  saveTasks(newTasks);
  return true;
}

// ---------------------------
// Example Usage

// Add multiple tasks
const sampleTasks = [
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
sampleTasks.forEach(task => console.log("Added:", addTask(task.title, task.description)));

// View all tasks
console.log("\nAll Tasks:", getTasks());

// Update a specific task
const allTasks = getTasks();
if (allTasks.length > 0) {
  console.log("\nUpdating Task...");
  const updatedTask = updateTask(allTasks[1].id, { completed: true });
  console.log("Updated Task:", updatedTask);
}

// Delete a specific task
if (allTasks.length > 2) {
  console.log("\nDeleting Task...");
  const deleted = deleteTask(allTasks[2].id);
  console.log("Deleted:", deleted);
}

// View all tasks after update and delete
console.log("\nAll Tasks After Deletion and Update:", getTasks());
