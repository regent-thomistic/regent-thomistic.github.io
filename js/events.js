// Enhanced Events functionality with calendar and map support

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
    const date = new Date(dateString);
    
    if (isNaN(date)) {
        console.warn(`Could not parse date: ${dateString}`);
        return new Date();
    }
    
    return date;
}

// Render events to the page with enhanced features
function renderEvents(events, containerId) {
    const container = document.getElementById(containerId).querySelector('.events-grid');
    
    if (!events || events.length === 0) {
        container.innerHTML = '<p class="text-center">No events to display at this time.</p>';
        return;
    }
    
    container.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Create an event card with enhanced features
function createEventCard(event) {
    const backgroundImage = event.image ? `background-image: url('images/photos/${event.image}');` : '';
    const hasBackground = event.image ? 'has-background' : '';
    
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
                    <a href="#" class="event-location" onclick="showMap(event, '${escapeQuotes(event.location)}'); return false;">
                        📍 ${event.location}
                    </a>
                </div>
                <p class="event-description">${event.description}</p>
                ${event.speaker ? `<div class="event-speaker">Speaker: ${event.speaker}</div>` : ''}
                <div class="event-actions">
                    <button class="event-action-btn" onclick="addToGoogleCalendar(${JSON.stringify(escapeEvent(event)).replace(/"/g, '&quot;')})">
                        📅 Google Calendar
                    </button>
                    <button class="event-action-btn" onclick="addToAppleCalendar(${JSON.stringify(escapeEvent(event)).replace(/"/g, '&quot;')})">
                        🍎 Apple Calendar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Helper function to escape quotes in strings
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// Helper function to escape event data for JSON embedding
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

// Show map in a modal/new window
function showMap(event, location) {
    event.preventDefault();
    
    // Encode location for URL
    const encodedLocation = encodeURIComponent(location + ', Regent University, Virginia Beach, VA');
    
    // Create Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    // Open in new window
    window.open(mapsUrl, 'Map', 'width=800,height=600,scrollbars=yes,resizable=yes');
}

// Add event to Google Calendar
function addToGoogleCalendar(event) {
    const startDate = parseEventDate(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // Assume 2-hour duration
    
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

// Add event to Apple Calendar (iCal format)
function addToAppleCalendar(event) {
    const startDate = parseEventDate(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // Assume 2-hour duration
    
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
    
    // Create a blob and download link
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
