const accessKey = 'Z9YSDjpXXTvLWM2WgK0f5ee1_tiKnZCM7Ym4QdR61FI';
const galleryElement = document.getElementById('gallery');

function searchImages() {
    const searchInput = document.getElementById('searchInput').value;

    galleryElement.innerHTML = '';

    if (searchInput.trim() !== '') {
       
        fetch(`https://api.unsplash.com/photos/random?query=${searchInput}&count=9&client_id=${accessKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(photo => {
                        const imgElement = document.createElement('img');
                        imgElement.src = photo.urls.regular;
                        imgElement.alt = photo.alt_description;
                        galleryElement.appendChild(imgElement);
                    });
                } else {
                    displayMessage('Nerasta nuotraukų su šiuo žodžiu ar fragmentu.');
                }
            })
            .catch(error => {
                console.error('Klaida gaunant duomenis iš Unsplash API:', error);
                displayMessage('Įvyko klaida gaunant nuotraukas.');
            });
    } else {
        displayMessage('Įveskite žodį ar fragmentą.');
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    galleryElement.appendChild(messageElement);
}
