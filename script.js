const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(item =>
    tasks.push({ text: item.textContent, done: item.classList.contains("completed") })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.done) span.classList.add("completed");
  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("button");
  del.textContent = "✕";
  del.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(del);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    addTaskToDOM({ text: taskInput.value, done: false });
    saveTasks();
    taskInput.value = "";
  }
});

window.onload = loadTasks;
