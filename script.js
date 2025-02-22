// Project Modal Logic
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const targetModal = card.getAttribute('data-modal');
        document.querySelector(targetModal).style.display = 'block';
    });
});

document.querySelectorAll('.close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside content area
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});