// ROMO App - Clickdummy Script

// Navigation between screens
function navigate(screenId) {
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Welcome slides management
let currentSlide = 1;

function showSlide(screenId, slideNumber) {
    const screen = document.getElementById(screenId);
    const slides = screen.querySelectorAll('.slide');
    const dots = screen.querySelectorAll('.dot');

    slides.forEach((slide, index) => {
        if (index + 1 === slideNumber) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, index) => {
        if (index + 1 === slideNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    currentSlide = slideNumber;
}

function nextSlide(screenId) {
    const screen = document.getElementById(screenId);
    const slides = screen.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (currentSlide < totalSlides) {
        showSlide(screenId, currentSlide + 1);
    } else {
        // Last slide, navigate to next screen
        navigate('screen-register-1');
    }
}

// Interest selection toggle
function toggleInterest(element) {
    element.classList.toggle('selected');
}

// Timer selection
function selectTimer(minutes) {
    // Remove selected class from all timer options
    const timerOptions = document.querySelectorAll('.timer-option');
    timerOptions.forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to clicked option
    event.target.closest('.timer-option').classList.add('selected');

    // Update custom timer inputs
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    document.getElementById('hours').value = hours;
    document.getElementById('minutes').value = mins;

    // Update calculated credits
    updateCalculatedCredits(minutes);
}

// Update calculated credits based on time
function updateCalculatedCredits(minutes) {
    if (!minutes) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const mins = parseInt(document.getElementById('minutes').value) || 0;
        minutes = (hours * 60) + mins;
    }

    const credits = minutes * 10; // 10 credits per minute
    const calculatedCreditsElement = document.getElementById('calculated-credits');
    if (calculatedCreditsElement) {
        calculatedCreditsElement.textContent = credits + ' 💎';
    }
}

// Emergency dialog
function showEmergencyDialog() {
    const confirmed = confirm('⚠️ ACHTUNG!\n\nWenn du jetzt abbrichst, erhältst du 0 Credits für diese Session - auch wenn du fast fertig bist!\n\nMöchtest du wirklich abbrechen?');

    if (confirmed) {
        const abort = confirm('Bist du dir WIRKLICH sicher? Alle bisherigen Credits für diese Session gehen verloren.');

        if (abort) {
            navigate('screen-dashboard');
        }
    }
}

// Simulate timer countdown (for demo purposes)
let timerInterval = null;

function startTimerCountdown() {
    let timeRemaining = 15 * 60; // 15 minutes in seconds

    timerInterval = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            navigate('screen-timer-complete');
            return;
        }

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        const timeDisplay = document.querySelector('.time-remaining');
        if (timeDisplay) {
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update progress
        const totalTime = 15 * 60;
        const progress = ((totalTime - timeRemaining) / totalTime) * 100;

        const progressCircle = document.querySelector('.circle-progress circle:last-child');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 130;
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        // Update earned credits
        const earnedCredits = Math.floor((15 - (timeRemaining / 60)) * 10);
        const creditsEarnedElement = document.querySelector('.credits-earned');
        if (creditsEarnedElement) {
            creditsEarnedElement.textContent = earnedCredits + ' 💎';
        }

        // Update progress bar
        const progressBar = document.querySelector('.timer-info .progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, 1000);
}

// Initialize custom timer inputs change listeners
document.addEventListener('DOMContentLoaded', function() {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');

    if (hoursInput && minutesInput) {
        hoursInput.addEventListener('input', () => updateCalculatedCredits());
        minutesInput.addEventListener('input', () => updateCalculatedCredits());
    }

    // Check if we're on timer active screen and start countdown
    const timerActiveScreen = document.getElementById('screen-timer-active');
    if (timerActiveScreen && timerActiveScreen.classList.contains('active')) {
        startTimerCountdown();
    }
});

// Category filter toggle
function selectCategory(element) {
    const categories = document.querySelectorAll('.category-tab');
    categories.forEach(cat => {
        cat.classList.remove('active');
    });
    element.classList.add('active');
}

// Voucher actions
function saveToWallet() {
    alert('✅ Voucher wurde in dein Wallet gespeichert!');
}

function copyVoucherCode() {
    alert('📋 Voucher-Code wurde kopiert!');
}

// Social sharing
function shareSuccess() {
    alert('📤 Teile deinen Erfolg auf Social Media!\n\nDiese Funktion würde in der echten App die Share-Funktion des Smartphones öffnen.');
}

// Referral code copy
function copyReferralCode() {
    alert('📋 Dein Referral-Code wurde kopiert!\n\nMAX2024ROMO');
}

// Achievement click handler
function showAchievementDetail(achievementName) {
    alert('🏆 Achievement: ' + achievementName + '\n\nDetails zu diesem Achievement würden hier angezeigt.');
}

// Leaderboard tab switching
function switchLeaderboardTab(tabName) {
    alert('Leaderboard für "' + tabName + '" wird geladen...');
}

// Filter handling for store
function openStoreFilter() {
    alert('🎚️ Store-Filter\n\nHier könntest du nach:\n- Kategorie\n- Standort\n- Credit-Bereich\nfiltern.');
}

// Search in store
function searchStore(query) {
    if (query.length > 0) {
        console.log('Suche nach:', query);
    }
}

// Notification handling
function openNotifications() {
    alert('🔔 Benachrichtigungen\n\nDu hast keine neuen Benachrichtigungen.');
}

// Profile image upload
function uploadProfileImage() {
    alert('📷 Profilbild hochladen\n\nIn der echten App würdest du hier ein Foto aufnehmen oder aus deiner Galerie auswählen können.');
}

// Settings handlers
function openNotificationSettings() {
    alert('🔔 Benachrichtigungs-Einstellungen\n\n✓ Push-Benachrichtigungen\n✓ Streak-Erinnerungen\n✓ Partner-Angebote\n✓ Motivations-Nachrichten');
}

function openPrivacySettings() {
    alert('🔒 Datenschutz-Einstellungen\n\n- Datennutzung\n- Standort-Freigabe\n- Profil-Sichtbarkeit\n- Cookie-Einstellungen');
}

function openLanguageSettings() {
    alert('🌐 Sprache\n\nAktuell: Deutsch\n\nVerfügbare Sprachen:\n- Deutsch\n- English\n- Français');
}

function openSoundSettings() {
    alert('🔊 Sounds & Vibration\n\n✓ Sounds aktiviert\n✓ Vibration aktiviert\n- Benachrichtigungs-Sound\n- Timer-Abschluss-Sound');
}

function openPermissionSettings() {
    alert('✓ Bildschirmzeit-Berechtigung\n\nStatus: Aktiv\n\nDu wirst zu den System-Einstellungen weitergeleitet, um die Berechtigung zu überprüfen oder zu ändern.');
}

// Support functions
function openFAQ() {
    alert('📖 FAQ\n\nHäufig gestellte Fragen:\n1. Wie funktionieren Credits?\n2. Wie löse ich Angebote ein?\n3. Was passiert bei Notfall-Button?\n4. Wie lade ich Freunde ein?\n...');
}

function contactSupport() {
    alert('💬 Support kontaktieren\n\nSende uns eine Nachricht:\nsupport@romo-app.at\n\nOder nutze das Kontaktformular in der App.');
}

function giveFeedback() {
    alert('⭐ Feedback geben\n\nDeine Meinung ist uns wichtig!\n\nWas können wir besser machen?');
}

// Delete account
function deleteAccount() {
    const confirmed = confirm('⚠️ Konto löschen\n\nMöchtest du dein Konto wirklich löschen?\n\nAlle deine Daten, Credits und Vouchers gehen unwiderruflich verloren!');

    if (confirmed) {
        const doubleCheck = confirm('Bist du dir ABSOLUT sicher?\n\nDiese Aktion kann nicht rückgängig gemacht werden!');

        if (doubleCheck) {
            alert('Dein Konto wurde gelöscht. 😢\n\nWir hoffen, dich bald wieder zu sehen!');
            navigate('screen-welcome');
        }
    }
}

// Pro subscription
function selectSubscription(type) {
    if (type === 'monthly') {
        alert('💎 Monatliches Abo ausgewählt\n\n4,99 € pro Monat\n\nDu wirst zum App Store weitergeleitet, um das Abo abzuschließen.');
    } else if (type === 'yearly') {
        alert('💎 Jährliches Abo ausgewählt\n\n39,99 € pro Jahr (spare 33%!)\n\nDu wirst zum App Store weitergeleitet, um das Abo abzuschließen.');
    }
}

// Friend invitation
function inviteFriend(method) {
    const referralCode = 'MAX2024ROMO';
    const message = `Hey! Probiere ROMO aus und verdiene Credits für deine Offline-Zeit!\n\nMein Referral-Code: ${referralCode}\n\nWir beide bekommen 500 Bonus-Credits! 🎁`;

    switch(method) {
        case 'whatsapp':
            alert('💬 Via WhatsApp teilen\n\n' + message);
            break;
        case 'instagram':
            alert('📸 Via Instagram teilen\n\n' + message);
            break;
        case 'link':
            alert('🔗 Link kopiert!\n\nhttps://romo-app.at/invite/' + referralCode);
            break;
    }
}

// Offer reminder
function setOfferReminder(offerId) {
    alert('🔔 Erinnerung gesetzt!\n\nWir erinnern dich, sobald du genug Credits für dieses Angebot hast.');
}

// Map/Directions
function openDirections(location) {
    alert('📍 Wegbeschreibung\n\nÖffne Google Maps / Apple Maps für:\n' + location);
}

// Partner website
function openPartnerWebsite(url) {
    alert('🌐 Partner-Website\n\nÖffne: ' + url);
}

// Rate partner
function ratePartner(partnerId) {
    alert('⭐ Partner bewerten\n\nWie war deine Erfahrung?\n\n(Hier würde eine Bewertungs-Funktion erscheinen)');
}

// Demo: Simulate time passing for streak
function simulateTimePassing() {
    // This would normally be handled by the backend
    console.log('Time simulation for demo purposes');
}

// Challenge tracking
function trackChallenge(challengeId) {
    console.log('Tracking challenge:', challengeId);
}

// Analytics (for demo - would be real analytics in production)
function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('ROMO App Clickdummy loaded');

    // Track initial page view
    trackEvent('page_view', { screen: 'welcome' });

    // Add event listeners for dynamic elements
    initializeEventListeners();
});

function initializeEventListeners() {
    // Search input in store
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchStore(e.target.value);
        });
    }

    // Category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            selectCategory(this);
        });
    });

    // Navigation tracking
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            trackEvent('navigation', { target: this.querySelector('.label').textContent });
        });
    });
}

// Helper function to format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to format credits
function formatCredits(credits) {
    return new Intl.NumberFormat('de-AT').format(credits) + ' 💎';
}

// Local storage helpers (for demo persistence)
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

// Demo data
const demoData = {
    user: {
        name: 'Max Mustermann',
        nickname: '@maxmustermann',
        level: 1,
        credits: 150,
        streak: 1,
        totalDetoxTime: 15, // in minutes
        successRate: 100
    },
    achievements: [
        { id: 'first-steps', name: 'First Steps', unlocked: true, date: 'Heute' }
    ],
    sessions: [
        { duration: 15, credits: 150, completed: true, date: 'Heute' }
    ]
};

// Export functions for use in HTML onclick handlers
window.navigate = navigate;
window.showSlide = showSlide;
window.nextSlide = nextSlide;
window.toggleInterest = toggleInterest;
window.selectTimer = selectTimer;
window.showEmergencyDialog = showEmergencyDialog;
window.selectCategory = selectCategory;
window.openStoreFilter = openStoreFilter;
window.uploadProfileImage = uploadProfileImage;
window.openNotifications = openNotifications;
window.deleteAccount = deleteAccount;
window.selectSubscription = selectSubscription;
window.inviteFriend = inviteFriend;
window.setOfferReminder = setOfferReminder;
window.openDirections = openDirections;

console.log('🚀 ROMO Clickdummy initialized successfully!');
