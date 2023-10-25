// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    // Structure to represent a task
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    // Array to store tasks
    Task[] public tasks;

    // Event to emit when a new task is created
    event TaskCreated(uint256 id, string content, bool completed);

    // Constructor to initialize the contract with an example task
    constructor() {
        createTask("Example Task");
    }

    // Function to create a new task
    function createTask(string memory _content) public {
        uint256 taskId = tasks.length;
        tasks.push(Task(taskId, _content, false));
        emit TaskCreated(taskId, _content, false);
    }

    // Function to toggle the completion status of a task
    function toggleCompleted(uint256 _taskId) public {
        require(_taskId < tasks.length, "Invalid task ID");
        tasks[_taskId].completed = !tasks[_taskId].completed;
    }

    // Function to get the total number of tasks
    function getTaskCount() public view returns (uint256) {
        return tasks.length;
    }

    // Function to get task details by ID
    function getTask(uint256 _taskId) public view returns (uint256, string memory, bool) {
        require(_taskId < tasks.length, "Invalid task ID");
        Task memory task = tasks[_taskId];
        return (task.id, task.content, task.completed);
    }

    // Function to delete a task by ID
    function deleteTask(uint256 _taskId) public {
        require(_taskId < tasks.length, "Invalid task ID");
        delete tasks[_taskId];
    }

    // Function to get all tasks
    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
