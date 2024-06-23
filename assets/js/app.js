let currentpage = 1;
const ExercisesPerPage = 10;

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
        currentPage = parseInt(pageParam);
    }
    
    await showExercises();
}

async function showExercises() {
    const domElement = document.getElementById("exercises-info");
    let htmlFragments = '';

    const startIndex = (currentPage - 1) * ExercisesPerPage + 1;
    const endIndex = startIndex + ExercisesPerPage - 1;

    const requests = [];
    for (let i = startIndex; i <= endIndex; i++) {
        requests.push(getExerciseData(i));
    }

    const results = await Promise.all(requests);
    results.forEach(exerciseData => {
        if (exerciseData) {
            const html = `
                <div class="superhero-info-item">
                    <h2>${exerciseData.name}</h2>
                    <button class="superhero-image-btn" onclick="showSuperheroDetails(${exerciseData.id})">
                        <img src="${exerciseData.image.url}" alt="${exerciseData.name}">
                    </button>
                </div>
            `;
            htmlFragments += html;
        }
    });

    domElement.innerHTML = htmlFragments;

    const currentPageElement = document.getElementById("current-page");
    currentPageElement.textContent = `Page ${currentPage}`;

    updateURL();
}