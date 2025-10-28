// Main JavaScript for Thomistic Institute Website

// Configuration
const CONFIG = {
    newsletterFormUrl: 'https://forms.google.com/your-form-link',
    contactEmail: 'thomistic@mail.regent.edu',
    contactPhone: '(757) 352-4000',
    googleCalendarId: 'YOUR_GOOGLE_CALENDAR_ID@group.calendar.google.com', // Update this
    icalFeedUrl: 'YOUR_ICAL_FEED_URL' // Update this for Apple Calendar subscription
};

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Calendar Subscribe functionality
function initCalendarSubscribe() {
    const subscribeBtn = document.querySelector('.calendar-follow-btn');
    const dropdown = document.querySelector('.calendar-dropdown-content');
    
    if (subscribeBtn && dropdown) {
        subscribeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.calendar-follow-btn')) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    // Google Calendar subscribe
    const googleBtn = document.getElementById('subscribe-google-calendar');
    if (googleBtn) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const calendarUrl = `https://calendar.google.com/calendar/r?cid=${CONFIG.googleCalendarId}`;
            window.open(calendarUrl, '_blank');
        });
    }
    
    // Apple Calendar subscribe
    const appleBtn = document.getElementById('subscribe-apple-calendar');
    if (appleBtn) {
        appleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Note: User needs to provide their iCal feed URL
            if (CONFIG.icalFeedUrl && CONFIG.icalFeedUrl !== 'YOUR_ICAL_FEED_URL') {
                window.location.href = CONFIG.icalFeedUrl;
            } else {
                alert('Calendar subscription URL not configured. Please contact the administrator.');
            }
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
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    const emailElement = document.getElementById('contact-email');
    const phoneElement = document.getElementById('contact-phone');
    
    if (emailElement) emailElement.textContent = CONFIG.contactEmail;
    if (phoneElement) phoneElement.textContent = CONFIG.contactPhone;
}
