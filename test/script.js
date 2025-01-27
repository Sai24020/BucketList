
// Initiera en tom array för aktiviteter
let bucketList = JSON.parse(localStorage.getItem('activities')) || [];

// Funktion för att rita upp listan i DOM
function renderList() {
      const bucketLists = document.getElementById('bucketLists');
      bucketLists.innerHTML = ''; // Töm innehållet i #bucketLists varje gång listan ritas om

  // Sortera aktiviteter efter kategori och sedan alfabetiskt inom varje kategori
 //  const categories = {};
      const categories = {};
    bucketList.forEach((activity) => {
  //    const categoryActivities = bucketList.filter(activity => activity.category === category);
    //  categoryActivities.sort((a, b) => a.name.localeCompare(b.name)); // Sortera alfabetiskt
    
   // });
//    renderList(categories);   In this example, the renderList function checks if the items variable is an array before calling forEach on it. If items is not an array, it logs an error message and exits the function.
   // if (categoryActivities.length > 0) {
//      console.log(category);
      if (!categories[activity.category]) {
          categories[activity.category] = []; 
      }
      categories[activity.category].push(activity);
    });

for (let category in categories) {
  const categoryDiv = document.createElement('div');
  categoryDiv.innerHTML = `<h3>${category}</h3>`;
  const ul = document.createElement('ul');

categories[category].forEach((activity) => {
    const li = document.createElement('li');
    li.textContent = activity.name;

    const doneButton = document.createElement('button');
    doneButton.classContent = 'task.completed';
    doneButton.textContent = activity.done ? '✓' : '?';

   
    doneButton.addEventListener('click', () => {
      activity.done = !activity.done;
     activity.completed = true;
      doneButton.textContent = '✓';
      renderList();

    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✘';
  deleteButton.addEventListener('click', () => {
      const categoryActivities = categories[activity.category];
      const activityIndex = categoryActivities.indexOf(activity);
        if (activityIndex > -1) {
           categoryActivities.splice(activityIndex, 1);
           bucketList = bucketList.filter((item) => item !== activity);
        }
        renderList();
  });
        li.appendChild(doneButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
});

      categoryDiv.appendChild(ul);
      bucketLists.appendChild(categoryDiv);
  }
}

// Funktion för att lägga till en ny aktivitet
function addActivity(event) {
  event.preventDefault();

  const activityName = document.getElementById('activityName').value;
  const activityCategory = document.getElementById('activityCategory').value;

  if (!activityName) return; // Om inget namn anges, gör inget

  const newActivity = {
    name: activityName,
    category: activityCategory,
    completed: false
  };

  bucketList.push(newActivity);
  saveToLocalStorage();
  renderList();

  document.getElementById('bucketForm').reset(); // Töm formuläret
}

// Funktion för att markera en aktivitet som klar eller ångra
function toggleComplete(activity) {
  activity.completed = !activity.completed;
  saveToLocalStorage();
  renderList();
}

// Funktion för att ta bort en aktivitet
function deleteActivity(activity) {
  bucketList = bucketList.filter(a => a !== activity);
  saveToLocalStorage();
  renderList();
}

// Funktion för att redigera en aktivitet
function editActivity(activity) {
  const newName = prompt('Redigera aktivitetens namn:', activity.name);
  if (newName && newName !== activity.name) {
    activity.name = newName;
    saveToLocalStorage();
    renderList();
  }
}

// Funktion för att spara aktiviteter till localStorage
function saveToLocalStorage() {
  localStorage.setItem('activities', JSON.stringify(bucketList));
}

// Eventlyssnare för formuläret
document.getElementById('bucketForm').addEventListener('submit', addActivity);

// Rendera listan när sidan laddas
renderList();


