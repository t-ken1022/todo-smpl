const w = window;
const d = document;
const b = "body";
const viewport = "html, body";

d.ontouchstart = () => {};

const addButton = d.getElementById("js-add-btn");

const onClickAdd = () => {
  const inputText = d.getElementById("js-add-txt");

  // テキストボックスの値を取得後、初期化
  const getValue = inputText.value;

  inputText.value = "";

  createTodoItem(getValue);
};

const deleteTodoItem = (targetList, targetTodo) => {
  targetList.removeChild(targetTodo);
};

const createTodoItem = (text) => {
  const incompleteList = d.getElementById("js-in-cpl-lst");
  const completeList = d.getElementById("js-cpl-lst");

  // TODOアイテムの生成
  const todoItem = d.createElement("li");

  todoItem.className = "todo-lst_itm";

  // TODOテキストの生成
  const todoText = d.createElement("p");

  todoText.className = "todo-lst_b-cpy";
  todoText.innerText = text;

  // 完了・削除・戻すボタンの生成、イベント付与
  const completeButton = d.createElement("button");
  const deleteButton = d.createElement("button");

  completeButton.className = "todo-lst_btn -cpl utl-ovr";
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeTodo = completeButton.parentNode;
    const getTodoText = completeTodo.firstElementChild.innerText;

    deleteTodoItem(incompleteList, completeTodo);

    completeTodo.textContent = null;

    const completeTodoText = d.createElement("p");

    completeTodoText.className = "todo-lst_b-cpy";
    completeTodoText.innerText = getTodoText;

    const backButton = d.createElement("button");

    backButton.className = "todo-lst_btn -bak utl-ovr";
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      const backTodo = backButton.parentNode;
      const getBackTodoText = backTodo.firstElementChild.innerText;

      deleteTodoItem(completeList, backTodo);

      createTodoItem(getBackTodoText);
    });

    completeTodo.appendChild(completeTodoText);
    completeTodo.appendChild(backButton);

    completeList.appendChild(completeTodo);
  });

  deleteButton.className = "todo-lst_btn -del utl-ovr";
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const deleteTodo = deleteButton.parentNode;

    deleteTodoItem(incompleteList, deleteTodo);
  });

  // TODOアイテムの子要素に各要素を格納
  todoItem.appendChild(todoText);
  todoItem.appendChild(completeButton);
  todoItem.appendChild(deleteButton);

  // 未完了TODOリストに追加
  incompleteList.appendChild(todoItem);
};

addButton.addEventListener("click", onClickAdd);
