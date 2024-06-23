const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
const apiKey = 'zqEoEzvLqtdEVp8K6t0Q0w==u4fd1WFHy3a3Kt4D';

const exerciseDetail = document.getElementById('exercise-detail');

// Haal de naam van de oefening op uit de query parameter
const urlParams = new URLSearchParams(window.location.search);
const exerciseName = urlParams.get('name');

async function fetchExerciseDetail(name) {
    try {
        if (!name) {
            throw new Error('Exercise name is not provided');
        }
        
        const response = await fetch(`${apiUrl}?name=${name}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching exercise detail: ${response.statusText}`);
        }
        
        const exercises = await response.json();
        if (exercises.length === 0) {
            throw new Error('No exercise found with the provided name');
        }
        
        displayExerciseDetail(exercises[0]);
    } catch (error) {
        console.error('Error fetching exercise detail:', error);
        exerciseDetail.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayExerciseDetail(exercise) {
    exerciseDetail.innerHTML = `
        <h2>${exercise.name}</h2>
        <p><strong>Type:</strong> ${exercise.type}</p>
        <p><strong>Muscle:</strong> ${exercise.muscle}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
        <p><strong>Instructions:</strong> ${exercise.instructions}</p>
    `;
}

// Haal de detailinformatie van de oefening op
fetchExerciseDetail(exerciseName);
