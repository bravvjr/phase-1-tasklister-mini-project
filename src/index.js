// document.addEventListener("DOMContentLoaded", () => {
//   // your code here
// });
document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortAscButton = document.getElementById('sort-asc');
  const sortDescButton = document.getElementById('sort-desc');
  let tasks = [];

  // Function to add task to the list
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskDescription = document.getElementById('new-task-description').value;
    const taskPriority = document.getElementById('priority').value;
    const taskUser = document.getElementById('task-user').value;
    const taskDuration = document.getElementById('task-duration').value;
    const taskDueDate = document.getElementById('task-due-date').value;

    if (taskDescription) {
      const task = {
        description: taskDescription,
        priority: taskPriority,
        user: taskUser,
        duration: taskDuration,
        dueDate: taskDueDate,
      };
      tasks.push(task);
      displayTasks();
      taskForm.reset(); // clear form after submission
    }
  });

  // Function to display tasks
  function displayTasks() {
    taskList.innerHTML = ''; // Clear current task list
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span style="color: ${getPriorityColor(task.priority)};">${task.description} (Priority: ${task.priority}) 
        <br>User: ${task.user} | Duration: ${task.duration}hrs | Due: ${task.dueDate}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
      `;
      taskList.appendChild(li);
    });
    addEventListeners();
  }

  // Function to get priority color
  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
    }
  }

  // Add event listeners to delete buttons
  function addEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteTask);
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', editTask);
    });
  }

  // Function to delete a task
  function deleteTask(e) {
    const taskIndex = e.target.dataset.index;
    tasks.splice(taskIndex, 1);
    displayTasks();
  }

  // Function to edit a task
  function editTask(e) {
    const taskIndex = e.target.dataset.index;
    const task = tasks[taskIndex];
    
    document.getElementById('new-task-description').value = task.description;
    document.getElementById('priority').value = task.priority;
    document.getElementById('task-user').value = task.user;
    document.getElementById('task-duration').value = task.duration;
    document.getElementById('task-due-date').value = task.dueDate;

    // Remove task from the list so it can be replaced when edited
    tasks.splice(taskIndex, 1);
  }

  // Sort tasks by priority
  sortAscButton.addEventListener('click', () => {
    tasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    displayTasks();
  });

  sortDescButton.addEventListener('click', () => {
    tasks.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    displayTasks();
  });

  // Function to get numeric priority value for sorting
  function getPriorityValue(priority) {
    switch (priority) {
      case 'high': return 1;
      case 'medium': return 2;
      case 'low': return 3;
    }
  }
});
