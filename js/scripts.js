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
                })
                .catch(error => {
                    console.error('Error fetching content:', error);
                    contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
                });
        });
    });
});

/* gallery */

