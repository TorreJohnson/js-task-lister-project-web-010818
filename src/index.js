document.addEventListener('DOMContentLoaded', () => {
  console.log("The DOM content has loaded");

  // var x = document.getElementById("create-task-form");
  // x.style.display = "none";

  let list = new List();
  let task = new Task();
  list.createList();
  list.getAllList();
  task.creatingTask();
});
