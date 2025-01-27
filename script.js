// جلب العناصرHämta objekt 
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

//När sidan startar ,,Ladda taskItems från "Local Storage"
//behöver koda sen för att uppdatera min project :)

// عند الضغط على زر "Lägg till"
//När du trycker på knappen "Lägg till"

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;

    if (!taskText) {
        alert("Vänligen ange en uppgift!");
        return;
    }

    // البحث عن القسم أو إنشاؤه إذا لم يكن موجودًا
    //    Hitta eller skapa en partition"categorySection" om den inte finns

    let categorySection = document.getElementById(`category-${category}`);
    if (!categorySection) {
        categorySection = document.createElement("section");
        categorySection.id = `category-${category}`;
        categorySection.innerHTML = `<h2>${category}</h2>`;
        taskList.appendChild(categorySection);
    }

   
    // إنشاء المهمة
   // Skapa taskItem

    const taskItem = document.createElement("div");
    taskItem.className = "task";

    taskItem.innerHTML = `
        <span class="text-span">${taskText}</span>
        <button class="done-btn">L</button>
        <button class="delete-btn">X</button>
    `;

    // إضافة أحداث الأزرار
   // Lägg till knapphändelser

    const doneButton = taskItem.querySelector(".done-btn");
    const deleteButton = taskItem.querySelector(".delete-btn");

    doneButton.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

    deleteButton.addEventListener("click", () => {
        categorySection.removeChild(taskItem);
        
        // إذا أصبح القسم فارغًا، يتم حذفه
     //         Om partitionen"categorySection" blir tom tas den bort

        if (categorySection.children.length === 1) {
            taskList.removeChild(categorySection);
        }

//Save task to localStorage...behöver call function att spara taskItems till  "Local Storage"

    
    });

    // إضافة المهمة للقسم
 //     Lägg till taskItem i avsnitt"catergorySection"

    categorySection.appendChild(taskItem);

      //Save task to localStorage
     // Sen taskInput.value = ""
    // إعادة تعيين المدخلات
   // Återställ ingång"taskInput"

    taskInput.value = "";
});


//Skapa function  Save task to localStorage,,,,saveTasksToLS() med const tasks={} och sections= taskList.querySelectorAll("section")
//sen  localStorage.setItem("tasks", JSON.stringify(tasks)) sen close function }

//Och behöver skapa function to loadTasksFromLS   och skriva const tasks använda JSON.parse(localStorage.getItem("tasks")) och if statment
