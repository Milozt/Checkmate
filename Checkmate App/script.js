const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const progressText = document.getElementById('progress-text');

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = prompt('Enter task:');
  if (taskText) {
    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    saveTasks();
    updateProgress();
  }
}

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.classList.add('fade-in');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = taskText;

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'Delete';

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
    updateProgress();
    if (checkbox.checked) {
      li.classList.add('bounce');
      setTimeout(() => li.classList.remove('bounce'), 1000);
    }
  });

  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
    updateProgress();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(task => {
    tasks.push({
      text: task.querySelector('.task-text').textContent,
      completed: task.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskElement = createTaskElement(task.text);
    taskElement.querySelector('.task-checkbox').checked = task.completed;
    if (task.completed) taskElement.classList.add('completed');
    taskList.appendChild(taskElement);
  });
  updateProgress();
}

function updateProgress() {
  const tasks = document.querySelectorAll('#task-list li');
  const completed = document.querySelectorAll('#task-list li.completed');
  const percent = tasks.length ? (completed.length / tasks.length) * 100 : 0;
  document.getElementById('progress-fill').style.width = percent + '%';
  progressText.textContent = `${completed.length} of ${tasks.length} tasks completed`;
}
