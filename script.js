const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => {
        addToDom(todo);
      });
    });
};

function addToDom(todo) {
  const div = document.createElement("div");
  div.classList.add("todo");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);
  if (todo.completed) {
    div.style.textDecoration = "line-through";
    //   div.classList.add("done");
  }
  document.getElementById("todo-list").appendChild(div);
}

const createTodo = (e) => {
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((data) => addToDom(data));
};

const toggleIt = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");
  }
  updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
};

function updateTodo(id, completed) {
  fetch(apiUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ title: "meow" }),
    body: JSON.stringify({ completed }),
  });
}

const deleteTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.remove();
  }
  deleteFromApi(e.target.dataset.id);
};

function deleteFromApi(id) {
  fetch(apiUrl + "/" + id, {
    method: "DELETE",
  });
  // .then((res) => res.json())
  // .then((data) => console.log(data));
}

const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document.querySelector("#todo-list").addEventListener("click", toggleIt);
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
};

init();
