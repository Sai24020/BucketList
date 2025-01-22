
// Initiera en tom array för aktiviteter
let activities = JSON.parse(localStorage.getItem('activities')) || [];

// Funktion för att rita upp listan i DOM
function renderList() {
  const bucketLists = document.getElementById('bucketLists');
  bucketLists.innerHTML = ''; // Töm innehållet i #bucketLists varje gång listan ritas om

  // Sortera aktiviteter efter kategori och sedan alfabetiskt inom varje kategori
  const categories = ['Resor', 'Äventyr', 'Lärande', 'Hobby'];
  categories.forEach(category => {
    const categoryActivities = activities.filter(activity => activity.category === category);
    categoryActivities.sort((a, b) => a.name.localeCompare(b.name)); // Sortera alfabetiskt
    
    console.log(category);
//    renderList(categories);   In this example, the renderList function checks if the items variable is an array before calling forEach on it. If items is not an array, it logs an error message and exits the function.
    if (categoryActivities.length > 0) {
//      console.log(category);

      const categoryHeader = document.createElement('h2');
      const ul = document.createElement('ul');

      categoryHeader.classList.add('category-title');
      categoryHeader.textContent = category;

      ul.appendChild(categoryHeader);

     
      categoryActivities[category].forEach((activity) => {
        const li = document.createElement('li');
        li.textContent = activity;

        li.classList.add(activity.completed ? 'completed' : '');

        const span = document.createElement('.text-span');
        span.textContent = activity.name;

        const completeButton = document.createElement('.done-btn');
        completeButton.textContent = 'V';

        const deleteButton = document.createElement('.delete-btn');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => deleteActivity(activity);

        completeButton.textContent = activity.completed ? 'Ångra' : 'Klar';
        completeButton.onclick = () => toggleComplete(activity);

        li.appendChild(span);
        li.appendChild(deleteButton);
        li.appendChild(completeButton);
        ul.appendChild(li);
      });

      bucketLists.appendChild(ul);
    }
  });
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

  activities.push(newActivity);
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
  activities = activities.filter(a => a !== activity);
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
  localStorage.setItem('activities', JSON.stringify(activities));
}

// Eventlyssnare för formuläret
document.getElementById('bucketForm').addEventListener('submit', addActivity);

// Rendera listan när sidan laddas
renderList();


