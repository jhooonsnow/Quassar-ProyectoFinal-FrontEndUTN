/* api noticias */
document.addEventListener('DOMContentLoaded', async () => {
    const apiKeyNews = '5Bxks0KjtGcnRsr6T9FuLwfBWj7y1cmvmQFHuYd80IbK9UUD'; 
    const apiUrlNews = 'https://api.currentsapi.services/v1/latest-news';

    async function obtenerNoticias() {
        try {
            const response = await fetch(`${apiUrlNews}?apiKey=${apiKeyNews}&language=en&number=50`);
            const data = await response.json();

            mostrarNoticias(data.news);
        } catch (error) {
            console.error('Error al obtener noticias:', error);
        }
    }

    function mostrarNoticias(noticias) {
        const noticiasContainer = document.getElementById('noticias-container');

        // Limpiar contenido existente
        noticiasContainer.innerHTML = '';

        noticias.forEach(noticia => {
            const card = document.createElement('div');
            card.classList.add('noticia-card');

            const titulo = document.createElement('h3');
            titulo.textContent = noticia.title;

            const descripcion = document.createElement('p');
            descripcion.textContent = noticia.description;

            card.appendChild(titulo);
            card.appendChild(descripcion);

            noticiasContainer.appendChild(card);
        });
    }

    // Obtener y mostrar noticias automáticamente al cargar la página
    await obtenerNoticias();
});