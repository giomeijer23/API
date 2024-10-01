const apiUrl = 'https://spapi.dev/api/characters';
const limit = 10;
let offset = 0;

const exerciseList = document.getElementById('exercise-list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Event listeners toevoegen aan de knoppen
prevBtn.addEventListener('click', () => {
  if (offset > 0) {
    offset -= limit;
    fetchCharacters(offset); // Fetch de vorige pagina
  }
});
nextBtn.addEventListener('click', () => {
  offset += limit;
  fetchCharacters(offset); // Fetch de volgende pagina
});

async function fetchCharacters(offset) {
  try {
      const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
          throw new Error(`Error fetching characters: ${response.statusText}`);
      }
      const apiResponse = await response.json();
      console.log(apiResponse); // Log de volledige API-response
      displayCharacters(apiResponse); // Geef de data door aan de displayCharacters functie
  } catch (error) {
      console.error('Error fetching characters:', error);
  }
}

function displayCharacters(apiResponse) {
  const characters = apiResponse.data || [];

  exerciseList.innerHTML = '';
  characters.forEach(character => {
      // Controleer of het character object een 'name' heeft
      if (!character.name) {
          console.error('Character does not have a name property', character);
          return; // Sla dit character over als het geen name heeft
      }

      const li = document.createElement('li');
      li.classList.add('cursor-pointer', 'hover:underline', 'bg-white', 'p-4', 'rounded-lg', 'shadow');
      li.textContent = character.name;
      li.addEventListener('click', () => {
          // Controleer nogmaals voordat je het karakter doorgeeft aan de volgende pagina
          if (character.name) {
              window.location.href = `southPark.html?name=${encodeURIComponent(character.name)}`;
          } else {
              console.error('Character name is undefined:', character);
          }
      });
      exerciseList.appendChild(li);
  });
}


// Initial fetch
fetchCharacters(offset);
