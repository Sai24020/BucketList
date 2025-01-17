Hämta objekt 
(const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList )

När du trycker på knappen "Lägg till"
(addTaskButton)

Hitta eller skapa en partition om den inte finns
(categorySection)

Skapa uppgiften
(    const taskItem = document.createElement("div");
    taskItem.className = "task";)

Lägg till knapphändelser
(    const doneButton = taskItem.querySelector(".done-btn");
    const deleteButton = taskItem.querySelector(".delete-btn");
)

   Om partitionen blir tom tas den bort
   (taskList.removeChild(categorySection);)

Lägg till uppgift i avsnitt
(    categorySection.appendChild(taskItem);)

Återställ ingång
( taskInput.value = "";)

