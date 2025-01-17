// جلب العناصرHämta objekt 
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

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
    //    Hitta eller skapa en partition om den inte finns

    let categorySection = document.getElementById(`category-${category}`);
    if (!categorySection) {
        categorySection = document.createElement("section");
        categorySection.id = `category-${category}`;
        categorySection.innerHTML = `<h2>${category}</h2>`;
        taskList.appendChild(categorySection);
    }

   
    // إنشاء المهمة
   // Skapa uppgiften

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
     //         Om partitionen blir tom tas den bort

        if (categorySection.children.length === 1) {
            taskList.removeChild(categorySection);
        }
    });

    // إضافة المهمة للقسم
 //     Lägg till uppgift i avsnitt

    categorySection.appendChild(taskItem);

    // إعادة تعيين المدخلات
   // Återställ ingång

    taskInput.value = "";
});