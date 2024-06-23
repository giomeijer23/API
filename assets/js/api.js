// api.js
const apiRoot = 'https://api.api-ninjas.com/v1/exercises';
const apiKey = 'zqEoEzvLqtdEVp8K6t0Q0w==u4fd1WFHy3a3Kt4D';

/**
 * Async functie om data van een externe API op te halen
 * @param url - De URL om data op te halen
 * @returns {Promise<Object>} - Gegevens van de API
 */
async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Helaas is er een fout opgetreden: ${error}`);
    return null;
  }
}

/**
 * Haal een lijst van oefeningen op basis van spiergroep
 * @param {string} spiergroep - De spiergroep
 * @returns {Promise<Array>} - Lijst van oefeningen
 */
async function getOefeningen(spiergroep) {
  const url = `${apiRoot}?muscle=${spiergroep}`;
  const data = await fetchData(url);
  
  if (!data || data.error) {
    console.error('Fout bij het ophalen van oefeningen:', data && data.message);
    return [];
  }

  return data.exercises;
}

export { getOefeningen };
