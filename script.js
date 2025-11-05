//  HEADER SCROLL EFFECT 
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle?.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            nav?.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});

// STATS COUNTER ANIMATION (MAP istifadəsi)
const statsData = [
    { target: 500 },
    { target: 50 },
    { target: 1000 },
    { target: 98, suffix: '%' }
];

const statItems = document.querySelectorAll('.stat-item');

const statNumbers = Array.from(statItems).map((item, index) => {
    const numberElement = item.querySelector('.stat-number');
    const data = statsData[index];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(numberElement, data.target, data.suffix || '');
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(item);
    return numberElement;
});

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

//  BUTTON CLICK HANDLERS (MAP)
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');


Array.from(buttons).map(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();

        if (buttonText === 'Başla') {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (buttonText === 'Kəşf Et') {
            document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

//FORM SUBMISSION 
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, textarea');

    const formData = Array.from(inputs).reduce((acc, input) => {
        const key = input.type === 'email' ? 'email' :
            input.tagName === 'TEXTAREA' ? 'message' : 'name';
        acc[key] = input.value;
        return acc;
    }, {});

    const allFilled = Object.values(formData).every(value => value.trim() !== '');

    if (allFilled) {
        showNotification('Mesajınız uğurla göndərildi!', 'success');
        inputs.forEach(input => input.value = '');
    } else {
        showNotification('Zəhmət olmasa bütün sahələri doldurun!', 'error');
    }
});

//  NOTIFICATION SYSTEM 
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (scrollIndicator) {
        scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
});

// SOCIAL LINKS
const socialLinks = document.querySelectorAll('.social-link');
let clickCounts = {};

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('aria-label');
        clickCounts[platform] = (clickCounts[platform] || 0) + 1;

       
        const totalClicks = Object.values(clickCounts).reduce((sum, count) => sum + count, 0);

        showNotification(`${platform}: ${totalClicks} klik`);
    });
});

// FEATURE CARDS
const featureCards = document.querySelectorAll('.feature-card');


Array.from(featureCards).map(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h4').textContent;
        showNotification(`${title} seçildi`);
    });
});

// SERVICES FILTER
const serviceCards = document.querySelectorAll('.service-card');
const filterInput = document.getElementById('serviceFilter');

function filterServices(searchTerm) {
    const cards = Array.from(serviceCards);

   
    const filtered = cards.filter(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        return title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase());
    });

    cards.forEach(card => card.style.display = 'none');
    filtered.forEach(card => card.style.display = 'block');

    return filtered.length;
}

filterInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm === '') {
        serviceCards.forEach(card => card.style.display = 'block');
    } else {
        filterServices(searchTerm);
    }
});

// SERVICES SLIDER
const sliderTrack = document.getElementById('servicesSlider');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');
const dotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = serviceCards.length;


function recreateDots() {
    if (!dotsContainer) return [];
    dotsContainer.innerHTML = '';
    return Array.from({ length: totalSlides }).map((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (index === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        return dot;
    });
}

let dots = recreateDots();

function updateSlider() {
    const radius = window.innerWidth > 768 ? 400 : 300; 
    const totalCards = serviceCards.length;
    const angleStep = (2 * Math.PI) / totalCards; 


    const rotationY = -(currentSlide * (360 / totalCards));
    if (sliderTrack) {
        sliderTrack.style.transform = `rotateY(${rotationY}deg)`;
    }

  
    serviceCards.forEach((card, index) => {
        const angle = index * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotationY = (angle * 180) / Math.PI;

      
        const isActive = index === currentSlide;

    
        requestAnimationFrame(() => {
            const cardHeight = card.offsetHeight || 400;
            const marginTop = -(cardHeight / 2);
            card.style.marginTop = `${marginTop}px`;
        });

        card.style.transform = `
            translateX(${x}px) 
            translateZ(${z}px) 
            rotateY(${rotationY}deg)
            ${isActive ? 'scale(1.1)' : 'scale(0.85)'}
        `;

        card.style.opacity = isActive ? '1' : '0.4';
        card.classList.toggle('active', isActive);
    });

   
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

   
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        updateSlider();
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

prevBtn?.addEventListener('click', prevSlide);
nextBtn?.addEventListener('click', nextSlide);


let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}


sliderTrack?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
sliderTrack?.addEventListener('mouseleave', startAutoSlide);


let isDragging = false;
let startX = 0;
let dragThreshold = 50;

sliderTrack?.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    clearInterval(autoSlideInterval);
    if (sliderTrack) {
        sliderTrack.style.cursor = 'grabbing';
    }
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;

    isDragging = false;
    if (sliderTrack) {
        sliderTrack.style.cursor = 'grab';
    }

    const deltaX = startX - e.clientX;

    if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }

    startAutoSlide();
});

// Touch support (mobile)
let touchStartX = 0;

sliderTrack?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlideInterval);
});

sliderTrack?.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

sliderTrack?.addEventListener('touchend', (e) => {
    const touchX = e.changedTouches[0].clientX;
    const deltaX = touchX - touchStartX;

    if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }

    startAutoSlide();
});


if (sliderTrack) {
    sliderTrack.style.cursor = 'grab';
}


updateSlider();
startAutoSlide();


let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateSlider();
    }, 250);
});
