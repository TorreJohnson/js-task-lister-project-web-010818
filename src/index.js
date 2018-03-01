document.addEventListener('DOMContentLoaded', () => {
  console.log("The DOM content has loaded");

  // var x = document.getElementById("create-task-form");
  // x.style.display = "none";

  let list = new List();
  list.updateCurrentLists();
  list.createNewListEventListener();

  let task = new Task();
  task.displayAllTasks()
  task.creatingTask();
});
