// Main JavaScript for Thomestic Institute Website

// Configuration
const CONFIG = {
    newsletterFormUrl: 'https://forms.google.com/your-form-link', // Replace with actual Google Form link
    contactEmail: 'info@thomestic.regent.edu',
    contactPhone: '(757) 352-4000'
};

// Inline data fallback for when fetch doesn't work (e.g., file:// protocol)
const FALLBACK_DATA = {
    board: [
        {
            "name": "Sarah Thompson",
            "position": "President",
            "bio": "Senior Philosophy major passionate about fostering intellectual discourse and academic excellence at Regent University.",
            "image": "images/default-avatar.png"
        },
        {
            "name": "Michael Chen",
            "position": "Vice President",
            "bio": "Junior Political Science student dedicated to organizing engaging events and supporting institute initiatives.",
            "image": "images/default-avatar.png"
        },
        {
            "name": "Emily Rodriguez",
            "position": "Secretary",
            "bio": "Sophomore English major managing communications and maintaining comprehensive institute records.",
            "image": "images/default-avatar.png"
        },
        {
            "name": "David Williams",
            "position": "Treasurer",
            "bio": "Junior Business major overseeing financial operations and budget management for all institute activities.",
            "image": "images/default-avatar.png"
        }
    ],
    awards: [
        {
            "title": "Excellence in Academic Programming",
            "year": "2024",
            "description": "Recognized by Regent University Student Life for outstanding contribution to intellectual discourse and student development through innovative programming."
        },
        {
            "title": "Best New Student Organization",
            "year": "2023",
            "description": "Awarded for exceptional growth and impact in the first year of operation, demonstrating strong leadership and community engagement."
        },
        {
            "title": "Community Service Award",
            "year": "2023",
            "description": "Honored for dedication to serving the Virginia Beach community through educational outreach programs and philosophical discussions."
        }
    ],
    events: [
        {
            "title": "Philosophy and Faith Symposium",
            "date": "November 15, 2024",
            "time": "6:00 PM",
            "location": "Robertson Hall, Room 201",
            "description": "Join us for an evening exploring the intersection of philosophical inquiry and religious faith. Features panel discussion and Q&A session.",
            "speaker": "Dr. Robert Williams, Georgetown University"
        },
        {
            "title": "Annual Thomestic Debate Championship",
            "date": "December 3, 2024",
            "time": "7:00 PM",
            "location": "Student Center Auditorium",
            "description": "Watch as teams from across campus debate 'Resolved: Artificial Intelligence poses an existential threat to human dignity.' Open to all students.",
            "speaker": "Moderated by Prof. Jennifer Blake"
        },
        {
            "title": "Ethics in Modern Medicine",
            "date": "January 18, 2025",
            "time": "5:30 PM",
            "location": "Communication Building, Theater",
            "description": "A discussion on bioethics, medical decision-making, and the philosophy of healthcare in the 21st century.",
            "speaker": "Dr. Marcus Johnson, Johns Hopkins"
        },
        {
            "title": "Fall Semester Opening Reception",
            "date": "September 5, 2024",
            "time": "5:00 PM",
            "location": "Main Library, Reading Room",
            "description": "Kicked off the academic year with an inspiring talk on 'The Life of the Mind' and welcomed new members to the institute.",
            "speaker": "Dean Margaret Thompson"
        },
        {
            "title": "Political Philosophy Roundtable",
            "date": "October 12, 2024",
            "time": "6:30 PM",
            "location": "Robertson Hall, Room 105",
            "description": "Faculty and students engaged in lively discussion about justice, governance, and the common good in contemporary society.",
            "speaker": "Panel of Regent Faculty"
        }
    ],
    newsletters: [
        {
            "title": "Fall Semester Highlights",
            "date": "October 2024",
            "preview": "Read about our successful opening reception, upcoming debates, and new partnerships with academic departments.",
            "link": "#"
        },
        {
            "title": "Welcome Back Edition",
            "date": "September 2024",
            "preview": "New semester brings exciting opportunities for intellectual growth. Meet our new board members and learn about fall events.",
            "link": "#"
        },
        {
            "title": "Summer Planning Issue",
            "date": "June 2024",
            "preview": "Preview of fall programming, summer reading recommendations, and reflections on the past academic year.",
            "link": "#"
        }
    ]
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
        boardMembers = FALLBACK_DATA.board;
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
        awards = FALLBACK_DATA.awards;
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
        allEvents = FALLBACK_DATA.events;
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
        newsletters = FALLBACK_DATA.newsletters;
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
