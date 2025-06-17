document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); 
            const url = event.target.getAttribute('href'); 

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    contentDiv.innerHTML = html; 

                    if (url.includes('gallery.html')) {
                        if (!document.querySelector('link[href="/css/lightbox.css"]')) {
                            const lightboxStylesheet = document.createElement('link');
                            lightboxStylesheet.rel = 'stylesheet';
                            lightboxStylesheet.href = '/css/lightbox.css';
                            document.head.appendChild(lightboxStylesheet);
                        }
                        document.body.classList.add('gallery-page');
                    } else {
                        document.body.classList.remove('gallery-page');
                    }
                })
                .catch(error => {
                    console.error('Error fetching content:', error);
                    contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
                });
        });
    });
});