// Main JavaScript for Thomistic Institute Website

// Configuration
const CONFIG = {
    newsletterFormUrl: 'https://forms.google.com/your-form-link', // Replace with actual Google Form link
    contactEmail: 'info@Thomistic.regent.edu',
    contactPhone: '(757) 352-4000'
};

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Load Executive Board members from JSON
async function loadExecutiveBoard() {
    let boardMembers;
    
    try {
        const response = await fetch('data/board.json');
        if (!response.ok) throw new Error('Failed to fetch');
        boardMembers = await response.json();
    } catch (error) {
        console.log('Using fallback board data (fetch failed - likely running locally)');
        boardMembers = [];
    }
    
    const boardContainer = document.getElementById('executive-board');
    if (boardContainer && boardMembers.length > 0) {
        boardContainer.innerHTML = boardMembers.map(member => `
            <div class="board-member">
                <img src="${member.image || 'images/default-avatar.png'}" alt="${member.name}">
                <h4>${member.name}</h4>
                <div class="position">${member.position}</div>
                <p class="bio">${member.bio}</p>
            </div>
        `).join('');
    }
}

// Load Awards from JSON
async function loadAwards() {
    let awards;
    
    try {
        const response = await fetch('data/awards.json');
        if (!response.ok) throw new Error('Failed to fetch');
        awards = await response.json();
    } catch (error) {
        console.log('Using fallback awards data (fetch failed - likely running locally)');
        awards = [];
    }
    
    const awardsContainer = document.getElementById('awards');
    if (awardsContainer && awards.length > 0) {
        awardsContainer.innerHTML = awards.map(award => `
            <div class="award-item">
                <h4>${award.title}</h4>
                <div class="award-year">${award.year}</div>
                <p class="award-description">${award.description}</p>
            </div>
        `).join('');
    }
}

// Load Newsletters from JSON
async function loadNewsletters() {
    let newsletters;
    
    try {
        const response = await fetch('data/newsletters.json');
        if (!response.ok) throw new Error('Failed to fetch');
        newsletters = await response.json();
    } catch (error) {
        console.log('Using fallback newsletter data (fetch failed - likely running locally)');
        newsletters = [];
    }
    
    const container = document.getElementById('newsletters-list');
    if (container && newsletters.length > 0) {
        container.innerHTML = newsletters.map(newsletter => `
            <div class="newsletter-item" ${newsletter.link !== '#' ? `onclick="window.open('${newsletter.link}', '_blank')"` : ''}>
                <div class="newsletter-date">${newsletter.date}</div>
                <div class="newsletter-title">${newsletter.title}</div>
                <p class="newsletter-preview">${newsletter.preview}</p>
            </div>
        `).join('');
    }
}

// Setup newsletter signup button
function setupNewsletterButton() {
    const btn = document.getElementById('newsletter-signup-btn');
    if (btn && CONFIG.newsletterFormUrl) {
        btn.href = CONFIG.newsletterFormUrl;
    }
}

// Update footer information
function updateFooter() {
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Set contact information
    const emailElement = document.getElementById('contact-email');
    const phoneElement = document.getElementById('contact-phone');
    
    if (emailElement) emailElement.textContent = CONFIG.contactEmail;
    if (phoneElement) phoneElement.textContent = CONFIG.contactPhone;
}
