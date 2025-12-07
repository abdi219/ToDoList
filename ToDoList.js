const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";
  
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const formattedDate = dueDate ? formatDate(dueDate) : 'No date';
    
    const html = `
      <div class="todo-item">
        <div class="todo-content">
          <span class="todo-name">${escapeHtml(name)}</span>
          <span class="todo-date">${formattedDate}</span>
        </div>
        <button class="delete-button js-delete-button">Delete</button>
      </div>`;

    todoListHTML += html;
  });

  const todoListElement = document.querySelector(".js-todo-list");
  todoListElement.innerHTML = todoListHTML;
  
  // Show/hide empty state
  const emptyState = document.querySelector(".js-empty-state");
  if (todoList.length === 0) {
    emptyState.classList.add("show");
  } else {
    emptyState.classList.remove("show");
  }

  // Add delete event listeners
  document
    .querySelectorAll(".js-delete-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

function formatDate(dateString) {
  if (!dateString) return '';
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

document.querySelector(".js-add-button").addEventListener("click", () => {
  addTodo();
});

// Allow adding todo with Enter key
document.querySelector(".js-name-input").addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value.trim();

  if (!name) {
    alert('Please enter a task name');
    return;
  }

  const dateInputElement = document.querySelector(".js-dueDate-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate,
  });

  inputElement.value = "";
  dateInputElement.value = "";
  inputElement.focus();

  renderTodoList();
}
