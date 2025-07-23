// Form submission
        function setupFormSubmission() {
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(form);
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;

                button.textContent = 'Sending...';
                button.disabled = true;

                fetch('https://formsubmit.co/ajax/2acfa1008d7a71c730d351c559d65d1e', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.json();
                })
                .then(data => {
                    button.textContent = 'Message Sent!';
                    button.style.background = 'var(--gradient-secondary)';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        form.reset();
                    }, 2000);
                })
                .catch(error => {
                    button.textContent = 'Error!';
                    console.error('Error:', error);
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 2000);
                });
            });
        }
document.addEventListener('DOMContentLoaded', setupFormSubmission);