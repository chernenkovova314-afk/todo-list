// Початковий масив завдань
const tasks = [
  { id: 1, text: "Зробити домашнє завдання", done: false, priority: "high" },
  { id: 2, text: "Прибрати в кімнаті", done: true, priority: "low" },
  { id: 3, text: "Піти на тренування", done: false, priority: "medium" },
  { id: 4, text: "Прочитати розділ книги", done: true, priority: "medium" },
  { id: 5, text: "Купити продукти", done: false, priority: "low" }
];

// Номер для наступного нового завдання
let nextId = tasks.length + 1;

// Елементи на сторінці
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const clearDoneBtn = document.getElementById("clear-done");

// Створення елемента списку для одного завдання
function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  // Текст завдання
  const span = document.createElement("span");
  span.textContent = task.text;

  // Кнопка видалення
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Видалити";
  deleteBtn.classList.add("delete-btn");

  li.append(span, deleteBtn);

  // Клас пріоритету: priority-high, priority-medium або priority-low
  li.classList.add("priority-" + task.priority);

  // Виконаним завданням додаємо клас done
  if (task.done) {
    li.classList.add("done");
  }

  return li;
}

// Виведення всіх завдань на сторінку
function renderTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    taskList.append(createTaskElement(tasks[i]));
  }
}

// Лічильник: скільки завдань всього і скільки виконано
function updateCounter() {
  let doneCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      doneCount++;
    }
  }
  counter.textContent = "Всього завдань: " + tasks.length + ", виконано: " + doneCount;
}

// Додавання нового завдання через форму
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") {
    return;
  }

  const newTask = {
    id: nextId++,
    text: text,
    done: false,
    priority: prioritySelect.value
  };

  tasks.push(newTask);
  taskList.append(createTaskElement(newTask));
  updateCounter();
  form.reset();
});

// Клік у списку: видалення або перемикання статусу (делегування)
taskList.addEventListener("click", function (event) {
  const li = event.target.closest("li");
  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  // Клік по кнопці «Видалити»
  if (event.target.classList.contains("delete-btn")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
        break;
      }
    }
    li.remove();
    updateCounter();
    return;
  }

  // Клік по самому завданню: перемикання «виконано»
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
      break;
    }
  }

  li.classList.toggle("done");
  updateCounter();
});

// Кнопка «Очистити виконані»: видаляє всі виконані завдання
clearDoneBtn.addEventListener("click", function () {
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].done) {
      tasks.splice(i, 1);
    }
  }
  renderTasks();
  updateCounter();
});

renderTasks();
updateCounter();