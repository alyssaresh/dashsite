// document.addEventListener('DOMContentLoaded', () => {
//     const links = document.querySelectorAll('.nav-link');
//     const contentDiv = document.getElementById('content');

//     links.forEach(link => {
//         link.addEventListener('click', event => {
//             event.preventDefault(); // Prevent default link behavior
//             const url = event.target.getAttribute('href'); // Get the URL from the link

//             // Fetch the content of the linked page
//             fetch(url)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! status: ${response.status}`);
//                     }
//                     return response.text();
//                 })
//                 .then(html => {
//                     contentDiv.innerHTML = html; // Load the fetched content into the #content div
//                 })
//                 .catch(error => {
//                     console.error('Error fetching content:', error);
//                     contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
//                 });
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Prevent default link behavior
            const url = event.target.getAttribute('href'); // Get the URL from the link

            // Fetch the content of the linked page
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    contentDiv.innerHTML = html; // Load the fetched content into the #content div

                    // Dynamically load lightbox.css if the gallery page is loaded
                    if (url.includes('gallery.html')) {
                        if (!document.querySelector('link[href="/css/lightbox.css"]')) {
                            const lightboxStylesheet = document.createElement('link');
                            lightboxStylesheet.rel = 'stylesheet';
                            lightboxStylesheet.href = '/css/lightbox.css';
                            document.head.appendChild(lightboxStylesheet);
                        }
                        // Add the .gallery-page class to the <body>
                        document.body.classList.add('gallery-page');
                    } else {
                        // Remove the .gallery-page class if not on the gallery page
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