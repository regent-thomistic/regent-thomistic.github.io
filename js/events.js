// Enhanced Events functionality with dropdown calendar and embedded map

// Configuration
const CALENDAR_CONFIG = {
    calendarId: 'YOUR_GOOGLE_CALENDAR_ID@group.calendar.google.com', // Update this
    icalFeedUrl: 'YOUR_ICAL_FEED_URL' // Update this
};

// Load Events from JSON
async function loadEvents() {
    let allEvents = [];
    
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        if (data.allEvents) {
            allEvents = data.allEvents;
        } else if (data.upcoming || data.past) {
            allEvents = [...(data.upcoming || []), ...(data.past || [])];
        }
    } catch (error) {
        console.log('Using fallback events data (fetch failed - likely running locally)');
    }
    
    const { upcoming, past } = sortEventsByDate(allEvents);
    
    renderEvents(upcoming, 'upcoming-events', false); // false = not past events
    renderEvents(past, 'past-events', true); // true = past events
}

function sortEventsByDate(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = [];
    const past = [];
    
    events.forEach(event => {
        const eventDate = parseEventDate(event.date);
        
        if (eventDate >= today) {
            upcoming.push(event);
        } else {
            past.push(event);
        }
    });
    
    upcoming.sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));
    past.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));
    
    return { upcoming, past };
}

function parseEventDate(dateString) {
    const date = new Date(dateString);
    
    if (isNaN(date)) {
        console.warn(`Could not parse date: ${dateString}`);
        return new Date();
    }
    
    return date;
}

function renderEvents(events, containerId, isPastEvents) {
    const container = document.getElementById(containerId).querySelector('.events-grid');
    
    if (!events || events.length === 0) {
        container.innerHTML = '<p class="text-center">No events to display at this time.</p>';
        return;
    }
    
    container.innerHTML = events.map(event => createEventCard(event, isPastEvents)).join('');
}

function createEventCard(event, isPastEvents) {
    const backgroundImage = event.image ? `background-image: url('images/photos/${event.image}');` : '';
    const hasBackground = event.image ? 'has-background' : '';
    
    // Only show calendar button for upcoming events
    const calendarButton = !isPastEvents ? `
        <div class="event-calendar-dropdown">
            <button class="event-calendar-btn" onclick="toggleCalendarDropdown(event, this)">
                📅 Add to Calendar... ▼
            </button>
            <div class="event-calendar-dropdown-content">
                <a href="#" onclick="addToGoogleCalendar(event, ${JSON.stringify(escapeEvent(event)).replace(/"/g, '&quot;')}); return false;">Google Calendar</a>
                <a href="#" onclick="addToAppleCalendar(event, ${JSON.stringify(escapeEvent(event)).replace(/"/g, '&quot;')}); return false;">Apple Calendar</a>
            </div>
        </div>
    ` : '';
    
    return `
        <div class="event-card ${hasBackground}">
            <div class="event-card-header" style="${backgroundImage}">
                <div class="event-header-overlay">
                    <div class="event-date">${event.date} • ${event.time}</div>
                    <h4>${event.title}</h4>
                </div>
            </div>
            <div class="event-card-body">
                <div class="event-location-wrapper">
                    <a href="#map-container" class="event-location" onclick="showEmbeddedMap(event, '${escapeQuotes(event.location)}', '${escapeQuotes(event.title)}'); return false;">
                        📍 ${event.location}
                    </a>
                </div>
                <p class="event-description">${event.description}</p>
                ${event.speaker ? `<div class="event-speaker">Speaker: ${event.speaker}</div>` : ''}
                ${calendarButton}
            </div>
        </div>
    `;
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function escapeEvent(event) {
    return {
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        speaker: event.speaker || ''
    };
}

// Toggle calendar dropdown
function toggleCalendarDropdown(e, button) {
    e.stopPropagation();
    
    // Close all other dropdowns
    document.querySelectorAll('.event-calendar-dropdown-content').forEach(dropdown => {
        if (dropdown !== button.nextElementSibling) {
            dropdown.classList.remove('show');
        }
    });
    
    // Toggle this dropdown
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.event-calendar-btn')) {
        document.querySelectorAll('.event-calendar-dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Show embedded map
function showEmbeddedMap(e, location, eventTitle) {
    e.preventDefault();
    
    const mapContainer = document.getElementById('map-container');
    const mapEmbed = document.getElementById('map-embed');
    const mapTitle = document.getElementById('map-title');
    
    // Update title
    mapTitle.textContent = eventTitle;
    
    // Encode location for Google Maps embed
    const encodedLocation = encodeURIComponent(location + ', Regent University, Virginia Beach, VA');
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '450';
    iframe.style.border = '0';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.src = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
    
    // Clear and add iframe
    mapEmbed.innerHTML = '';
    mapEmbed.appendChild(iframe);
    
    // Show map container
    mapContainer.classList.remove('hidden');
    
    // Smooth scroll to map
    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Close map
function closeMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.add('hidden');
    
    // Clear map content
    document.getElementById('map-embed').innerHTML = '';
}

// Add event to Google Calendar
function addToGoogleCalendar(e, event) {
    e.preventDefault();
    e.stopPropagation();
    
    const startDate = parseEventDate(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);
    
    const formatGoogleDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
        details: `${event.description}\n\nSpeaker: ${event.speaker || 'TBA'}`,
        location: event.location,
        trp: 'false'
    });
    
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
}

// Add event to Apple Calendar
function addToAppleCalendar(e, event) {
    e.preventDefault();
    e.stopPropagation();
    
    const startDate = parseEventDate(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);
    
    const formatICalDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Thomistic Institute//Events//EN
BEGIN:VEVENT
UID:${Date.now()}@thomistic.regent.edu
DTSTAMP:${formatICalDate(new Date())}
DTSTART:${formatICalDate(startDate)}
DTEND:${formatICalDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\n\\nSpeaker: ${event.speaker || 'TBA'}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event tabs functionality
function initEventTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}-events`) {
                    content.classList.add('active');
                }
            });
        });
    });
}
