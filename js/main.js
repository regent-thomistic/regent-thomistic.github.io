// Main JavaScript for Thomestic Institute Website

// Configuration
const CONFIG = {
    newsletterFormUrl: 'https://forms.google.com/your-form-link', // Replace with actual Google Form link
    contactEmail: 'info@thomestic.regent.edu',
    contactPhone: '(757) 352-4000'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadExecutiveBoard();
    loadAwards();
    loadEvents();
    loadNewsletters();
    initEventTabs();
    updateFooter();
    setupNewsletterButton();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateTo(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
}

// Navigate to a specific section
function navigateTo(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update nav active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
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
    }
    
    const boardContainer = document.getElementById('executive-board');
    boardContainer.innerHTML = boardMembers.map(member => `
        <div class="board-member">
            <img src="${member.image || 'images/default-avatar.png'}" alt="${member.name}">
            <h4>${member.name}</h4>
            <div class="position">${member.position}</div>
            <p class="bio">${member.bio}</p>
        </div>
    `).join('');
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
    }
    
    const awardsContainer = document.getElementById('awards');
    awardsContainer.innerHTML = awards.map(award => `
        <div class="award-item">
            <h4>${award.title}</h4>
            <div class="award-year">${award.year}</div>
            <p class="award-description">${award.description}</p>
        </div>
    `).join('');
}

// Load Events from JSON
async function loadEvents() {
    let allEvents = [];
    
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        // Handle different data structures
        if (data.allEvents) {
            allEvents = data.allEvents;
        } else if (data.upcoming || data.past) {
            allEvents = [...(data.upcoming || []), ...(data.past || [])];
        }
    } catch (error) {
        console.log('Using fallback events data (fetch failed - likely running locally)');
    }
    
    // Automatically sort events based on current date
    const { upcoming, past } = sortEventsByDate(allEvents);
    
    renderEvents(upcoming, 'upcoming-events');
    renderEvents(past, 'past-events');
}

// Function to automatically sort events by date
function sortEventsByDate(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    const upcoming = [];
    const past = [];
    
    events.forEach(event => {
        // Parse the event date
        const eventDate = parseEventDate(event.date);
        
        if (eventDate >= today) {
            upcoming.push(event);
        } else {
            past.push(event);
        }
    });
    
    // Sort upcoming events (earliest first)
    upcoming.sort((a, b) => {
        return parseEventDate(a.date) - parseEventDate(b.date);
    });
    
    // Sort past events (most recent first)
    past.sort((a, b) => {
        return parseEventDate(b.date) - parseEventDate(a.date);
    });
    
    return { upcoming, past };
}

// Parse event date string to Date object
function parseEventDate(dateString) {
    // Handle various date formats
    // Examples: "November 15, 2024", "2024-11-15", "15 Nov 2024"
    const date = new Date(dateString);
    
    // If invalid date, try alternative parsing
    if (isNaN(date)) {
        console.warn(`Could not parse date: ${dateString}`);
        return new Date(); // Return current date as fallback
    }
    
    return date;
}

// Render events to the page
function renderEvents(events, containerId) {
    const container = document.getElementById(containerId).querySelector('.events-grid');
    
    if (!events || events.length === 0) {
        container.innerHTML = '<p class="text-center">No events to display at this time.</p>';
        return;
    }
    
    container.innerHTML = events.map(event => `
        <div class="event-card">
            <div class="event-card-header">
                <div class="event-date">${event.date} • ${event.time}</div>
                <h4>${event.title}</h4>
            </div>
            <div class="event-card-body">
                <div class="event-location">📍 ${event.location}</div>
                <p class="event-description">${event.description}</p>
                ${event.speaker ? `<div class="event-speaker">Speaker: ${event.speaker}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// Event tabs functionality
function initEventTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Update button states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}-events`) {
                    content.classList.add('active');
                }
            });
        });
    });
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
    }
    
    const container = document.getElementById('newsletters-list');
    container.innerHTML = newsletters.map(newsletter => `
        <div class="newsletter-item" ${newsletter.link !== '#' ? `onclick="window.open('${newsletter.link}', '_blank')"` : ''}>
            <div class="newsletter-date">${newsletter.date}</div>
            <div class="newsletter-title">${newsletter.title}</div>
            <p class="newsletter-preview">${newsletter.preview}</p>
        </div>
    `).join('');
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
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set contact information
    const emailElement = document.getElementById('contact-email');
    const phoneElement = document.getElementById('contact-phone');
    
    if (emailElement) emailElement.textContent = CONFIG.contactEmail;
    if (phoneElement) phoneElement.textContent = CONFIG.contactPhone;
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Export functions for external use
window.navigateTo = navigateTo;
