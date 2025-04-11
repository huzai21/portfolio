// Add floating particles to hero section
function createParticles() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        particles.appendChild(particle);
    }
}

// Handle project card interactions
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    handleProjectCards();
});

// Close modal functionality
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Ensure smooth background animation
const hero = document.querySelector('#hero');
let isHovered = false;

hero.addEventListener('mouseenter', () => {
    isHovered = true;
    hero.style.animationPlayState = 'running';
    hero.style.backgroundSize = '200% 200%';
});

hero.addEventListener('mouseleave', () => {
    isHovered = false;
    hero.style.animationPlayState = 'running';
    hero.style.backgroundSize = '400% 400%';
});

// Handle window resize
window.addEventListener('resize', () => {
    handleProjectCards();
});

// Add cursor following effect to hero section
const cursorEffect = document.createElement('div');
cursorEffect.className = 'cursor-effect';
hero.appendChild(cursorEffect);

function updateCursorEffect(e) {
    const rect = hero.getBoundingClientRect();
    const mouseX = e.pageX - (rect.left + window.scrollX);
    const mouseY = e.pageY - (rect.top + window.scrollY);
    
    requestAnimationFrame(() => {
        cursorEffect.style.left = `${mouseX}px`;
        cursorEffect.style.top = `${mouseY}px`;
        cursorEffect.style.opacity = '1';
    });
}

function handleHeroHover(e) {
    isHovered = true;
    hero.classList.add('active');
    updateCursorEffect(e);
    cursorEffect.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

function handleHeroLeave() {
    isHovered = false;
    hero.classList.remove('active');
    cursorEffect.style.opacity = '0';
}

hero.addEventListener('mousemove', updateCursorEffect);
hero.addEventListener('mouseenter', handleHeroHover);
hero.addEventListener('mouseleave', handleHeroLeave);

// Throttle the mousemove event for better performance
function throttle(func, limit) {
    let inThrottle;
    return function(e) {
        if (!inThrottle) {
            func(e);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

hero.addEventListener('mousemove', throttle(updateCursorEffect, 10));

// Add scroll handler for navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Handle project cards separately for mobile and desktop
const handleProjectCards = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const front = card.querySelector('.project-card-front');
        const back = card.querySelector('.project-card-back');

        if (isMobile) {
            // On mobile, clicking toggles the visibility
            card.addEventListener('click', () => {
                if (front.style.opacity === '0') {
                    front.style.opacity = '1';
                    back.style.opacity = '0';
                } else {
                    front.style.opacity = '0';
                    back.style.opacity = '1';
                }
            });
        } else {
            // On desktop, use hover
            card.addEventListener('mouseenter', () => {
                front.style.opacity = '0';
                back.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                front.style.opacity = '1';
                back.style.opacity = '0';
            });
        }
    });
};