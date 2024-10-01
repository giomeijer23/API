const apiUrl = 'https://spapi.dev/api/characters';
const southParkDetail = document.getElementById('southParkName-detail');

// Haal de naam van het personage op uit de query parameter
const urlParams = new URLSearchParams(window.location.search);
const southParkName = urlParams.get('name');

// Als de naam niet is opgehaald, geef een foutmelding
if (!southParkName) {
    southParkDetail.innerHTML = `<p>Geen personage geselecteerd.</p>`;
} else {
    fetchCharacterDetail(southParkName); // Roep de functie aan om de details te laden
}

async function fetchCharacterDetail(name) {
    try {
        if (!name) {
            throw new Error('South Park character name is not provided');
        }

        console.log('Fetching details for:', name); // Voeg een log toe om te controleren of de juiste naam wordt doorgegeven
        
        const response = await fetch(`${apiUrl}?name=${name}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching character detail: ${response.statusText}`);
        }

        const characters = await response.json();
        if (characters.length === 0) {
            throw new Error('No character found with the provided name');
        }

        displayCharacterDetail(characters[0]);
    } catch (error) {
        console.error('Error fetching character detail:', error);
        southParkDetail.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayCharacterDetail(character) {
    southParkDetail.innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Occupation:</strong> ${character.occupation}</p>
        <p><strong>Catchphrase:</strong> ${character.catchphrase}</p>
        <p><strong>Episodes:</strong> ${character.episodes.join(', ')}</p>
    `;
}
