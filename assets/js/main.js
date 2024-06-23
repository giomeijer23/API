const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
const apiKey = 'zqEoEzvLqtdEVp8K6t0Q0w==u4fd1WFHy3a3Kt4D';
const limit = 10;
let offset = 0;

const exerciseList = document.getElementById('exercise-list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Event listeners toevoegen aan de knoppen
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);

async function fetchExercises(offset) {
  try {
    const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error(`Error fetching exercises: ${response.statusText}`);
    }
    const exercises = await response.json();
    displayExercises(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

function displayExercises(exercises) {
  exerciseList.innerHTML = '';
  exercises.forEach(exercise => {
    const li = document.createElement('li');
    li.classList.add('cursor-pointer', 'hover:underline', 'bg-white', 'p-4', 'rounded-lg', 'shadow');
    li.textContent = exercise.name;
    li.addEventListener('click', () => {
      window.location.href = `exercise.html?name=${encodeURIComponent(exercise.name)}`;
    });
    exerciseList.appendChild(li);
  });
}

async function prevPage() {
  if (offset > 0) {
    offset -= limit;
    await fetchExercises(offset);
  }
}

async function nextPage() {
  offset += limit;
  await fetchExercises(offset);
}

// Initial fetch
fetchExercises(offset);
