# ROMO App - Klickdummy Prototype

Ein vollständig interaktiver Klickdummy für die ROMO Mobile App, der alle User Journey Phasen abdeckt.

## 🎯 Über ROMO

ROMO ist eine innovative Mobile App, die User belohnt, wenn sie offline gehen. User verdienen Credits für ihre Offline-Zeit und können diese bei über 100+ Premium-Partnern in ganz Österreich einlösen.

**Slogan:** "Verdiene Credits für deine Offline-Zeit und löse sie bei Premium-Partnern ein"

## 📱 Klickdummy starten

### Option 1: Direkt im Browser öffnen
Öffne einfach die `index.html` Datei in einem modernen Browser:
- Chrome (empfohlen)
- Firefox
- Safari
- Edge

### Option 2: Mit lokalem Server
```bash
# Python 3
python -m http.server 8000

# Oder mit Node.js
npx serve
```

Dann öffne: `http://localhost:8000`

### Option 3: Mobile Ansicht simulieren
1. Öffne die Developer Tools (F12)
2. Aktiviere "Device Toolbar" (Strg+Shift+M)
3. Wähle ein Mobile Gerät (z.B. iPhone 12 Pro, 428px Breite)

## 🗺️ App-Struktur und Navigation

### Phase 1: Pre-Download und Installation
Die App-Store-Präsenz und Marketing-Materialien sind nicht Teil des Klickdummys, aber die Onboarding-Experience beginnt hier.

### Phase 2: Onboarding und Registrierung

#### Welcome Screens (4 Slides)
- **Slide 1:** Willkommen und Hauptversprechen
- **Slide 2:** Wie Credits funktionieren
- **Slide 3:** Partner-Netzwerk Vorstellung
- **Slide 4:** Call-to-Action zur Registrierung

#### Registrierungs-Flow (5 Slides)
1. **Name:** Vor- und Nachname eingeben
2. **Alter:** Geburtsdatum mit Date-Picker
3. **Interessen:** Multi-Select von Interessenskategorien
4. **Ziele:** Freitext-Eingabe für persönliche Ziele
5. **Account-Erstellung:**
   - Passkey (FIDO2/WebAuthn) - empfohlen
   - Google Sign-In
   - Apple Sign-In
   - E-Mail mit 2FA

#### Berechtigungen
- Screen Time API (iOS) / Digital Wellbeing API (Android)
- Push-Benachrichtigungen
- Schritt-für-Schritt Anleitung zur Berechtigungs-Erteilung

#### Profil vervollständigen
- Profilbild (optional)
- Nickname
- Standort (Österreich-spezifisch)
- Interessenskategorien für Partner-Angebote

### Phase 3: Tutorial und erste Schritte

#### Interaktives Tutorial (5 Screens)
1. Willkommen in der App
2. Timer-Funktion Erklärung
3. Credit-System Übersicht
4. Store & Partner Vorstellung
5. Notfall-Button Warnung

#### Erste Mission
- 15 Minuten Offline-Zeit
- 150 Credits verdienen
- "First Steps" Achievement freischalten

### Phase 4: Hauptfunktionen

#### Dashboard/Home Screen
- **Header:** Begrüßung, Level-Badge, Benachrichtigungen
- **Credits-Card:** Aktueller Kontostand prominent
- **Stats:** Heute, Streak, Level
- **Quick-Start:** Detox sofort starten
- **Tägliche Challenge:** Fortschritts-Anzeige
- **Level-Fortschritt:** XP-Balken
- **Bottom Navigation:** Home, Timer, Store, Profil

#### Timer/Detox-Funktion

**Timer Setup:**
- Schnellauswahl: 15min, 30min, 1h, 2h, 4h, 8h
- Custom Timer: Eigene Zeit einstellen
- Credit-Berechnung: 10 Credits pro Minute
- Motivations-Spruch

**Timer Aktiv:**
- Großer Countdown-Timer
- Kreis-Fortschritts-Anzeige
- Aktuell verdiente Credits (live)
- Motivations-Nachrichten
- Notfall-Button (rot, mit Warnung)

**Timer Abgeschlossen:**
- Konfetti-Animation
- Verdiente Credits und XP
- Neue Achievements
- Level-Up Check
- Streak-Update
- Social Sharing Option
- Nächste Session starten

#### Gamification

**Level-System:**
- Level 1-10: Smartphone Junie (Bronze)
- Level 11-25: Smartphone Enthusiast (Silber)
- Level 26-50: Smarter Smartphone User (Gold)
- Level 51+: Offline-Meister (Platin)

**Streak-System:**
- Aufeinanderfolgende Tage mit mindestens einer Session
- Milestones: 3, 7, 14, 30, 60, 90, 180, 365 Tage
- Bonus-Credits bei Milestones
- Visuelle Flamme

**Achievements:**
- Zeitbasiert (Morgenruhe, Nachtruhe, Arbeitsfokus)
- Quantitätsbasiert (10, 50, 100, 500 Sessions)
- Qualitätsbasiert (Eiserner Wille, Weekend Warrior)
- Sozial (Influencer, Community Leader)

**Leaderboard:**
- Monatlich
- All-Time
- Freunde
- Regional (z.B. Wien)

**Daily/Weekly Challenges:**
- Täglich neue Mini-Challenge
- Wöchentliche Challenge
- Bonus-Credits bei Erfüllung

#### Store-Funktion

**Store Hauptscreen:**
- Credits-Anzeige oben
- Suchfunktion
- Filter (Kategorie, Standort, Credits)
- Hervorgehobene Angebote (Werbung)
- Kategorien-Navigation
- Partner-Angebots-Karten

**Kategorien:**
- Hotels und Übernachtungen
- Cafés und Restaurants
- Yoga und Fitness Studios
- Wellness und Spa
- Kultur und Events
- Shopping
- Dienstleistungen

**Angebots-Detail:**
- Bild-Galerie
- Vollständige Beschreibung
- Benötigte Credits
- Einlösungs-Bedingungen
- Gültigkeit
- Standort mit Maps-Integration
- Öffnungszeiten
- Kontaktinformationen
- "Einlösen" oder "Credits fehlen noch"
- "Erinnere mich" Funktion

**Einlösungs-Prozess:**
1. Credits-Bestätigung
2. QR-Code generieren
3. Alphanumerischer Voucher-Code
4. Zeitlich limitierte Gültigkeit
5. Partner scannt QR-Code
6. Echtzeit-Validierung
7. Einmalige Nutzung
8. Partner-Bewertung

**Meine Vouchers/Wallet:**
- Aktive Vouchers
- Verwendete Vouchers
- Abgelaufene Vouchers
- QR-Code Anzeige
- In Wallet speichern
- Wegbeschreibung

#### Profil-Bereich

**Profil Hauptscreen:**
- Profilbild, Name, Nickname
- Level und XP
- Streak-Anzeige
- Credits-Kontostand

**Statistiken:**
- Gesamt Detox-Zeit
- Durchschnittliche Session-Länge
- Anzahl Sessions
- Erfolgsrate
- Diese Woche / Dieser Monat
- Grafische Darstellung

**Achievements:**
- Erreichte Achievements
- Noch nicht erreichte (locked)
- Fortschritt zu nächstem Achievement

**Persönliche Daten:**
- Name, E-Mail, Standort editierbar
- Interessenskategorien

**Einstellungen:**
- Benachrichtigungen
- Datenschutz
- Sprache
- Sounds & Vibration
- Berechtigungen
- Konto löschen

**Freunde:**
- Freunde einladen (Referral-Code)
- Freundesliste
- Vergleichs-Statistiken
- 500 Credits Belohnung pro eingeladenem Freund

**Support:**
- FAQ
- Tutorial erneut ansehen
- Support kontaktieren
- Feedback geben

#### Pro-Version Features

**Vorteile:**
- 50% Credit-Boost
- Exklusive Partner-Angebote
- Erweiterte Statistiken & Export
- Custom Timer Presets
- Priority Support
- Werbefrei
- Exklusive Achievements
- Streak-Schutz (1x pro Monat)
- Bonus-Challenges
- Früher Zugang zu neuen Features
- Partner-Rabatte
- Pro-Badge im Profil

**Preismodelle:**
- Monatlich: 4,99 € (jederzeit kündbar)
- Jährlich: 39,99 € (spare 33%, 2 Monate gratis)
- 30 Tage kostenlos testen

## 🎨 Design-System

### Farben
- **Primary:** #4CAF50 (Grün) - Hauptfarbe, Erfolg
- **Primary Dark:** #388E3C
- **Primary Light:** #81C784
- **Secondary:** #2196F3 (Blau) - Akzente
- **Accent:** #FF9800 (Orange) - Highlights
- **Danger:** #F44336 (Rot) - Warnung, Notfall
- **Warning:** #FFC107 (Gelb)
- **Success:** #4CAF50 (Grün)

### Typografie
- **Font:** System-Fonts (San Francisco iOS, Roboto Android)
- **Headlines:** 24-36px, Bold
- **Body:** 14-16px, Regular
- **Small:** 11-12px

### Komponenten
- **Border Radius:** 12-20px für Cards
- **Shadows:** Subtile Schatten für Depth
- **Spacing:** 8px Grid-System
- **Animations:** 0.3s ease-in-out

## 💻 Technische Implementierungs-Hinweise

### Authentifizierung
1. **Primär:** Passkeys mit FIDO2/WebAuthn (biometrisch)
2. **Alternative:** OAuth 2.0 mit OpenID Connect
   - Google Sign-In
   - Apple Sign-In
3. **Fallback:** E-Mail mit 2FA

### APIs und Berechtigungen

#### iOS
- Screen Time API für App-Blockierung
- UserNotifications Framework
- Local Authentication (Face ID / Touch ID)

#### Android
- Digital Wellbeing API
- NotificationManager
- BiometricPrompt API

### Credit-System
- **Basis:** 10 Credits pro Minute Offline-Zeit
- **Pro-Bonus:** 15 Credits pro Minute (50% Boost)
- **Streak-Bonus:** Zusätzliche Credits bei Milestones
- **Challenge-Bonus:** Variable Credits je Challenge

### QR-Code System
- Einmalige, zeitlich limitierte QR-Codes
- Sichere Token-Generierung (Backend)
- Echtzeit-Validierung
- Fraud-Prevention

### Datenbank-Struktur (Empfehlung)

**Users:**
- ID, Name, Email, Avatar
- Level, XP, Credits
- Streak, Total Detox Time
- Created At, Updated At

**Sessions:**
- ID, User ID
- Start Time, End Time, Duration
- Credits Earned, XP Earned
- Completed (Boolean)
- Emergency Break (Boolean)

**Achievements:**
- ID, User ID, Achievement Type
- Unlocked At

**Vouchers:**
- ID, User ID, Partner ID, Offer ID
- QR Code, Voucher Code
- Redeemed (Boolean), Redeemed At
- Valid Until

**Partners:**
- ID, Name, Logo, Description
- Category, Location
- Contact Info

**Offers:**
- ID, Partner ID
- Title, Description, Image
- Credits Required
- Terms, Valid Until

## 📊 Analytics & Tracking

Wichtige Events zu tracken:
- User Registration
- Session Start / Complete / Abort
- Achievement Unlock
- Level Up
- Credits Earned / Spent
- Offer Viewed / Redeemed
- Referral Used
- Pro Subscription

## 🔐 Sicherheit & Datenschutz

### DSGVO-Konform
- Explizite Einwilligung für Datenverarbeitung
- Recht auf Löschung implementieren
- Daten-Export Funktion
- Privacy Policy & Terms of Service

### Datensicherheit
- HTTPS für alle Kommunikation
- Sichere Token-Verwaltung
- Verschlüsselte Speicherung sensibler Daten
- Regelmäßige Security Audits

## 🚀 Deployment-Checkliste

### App Stores
- [ ] iOS: Apple Developer Account, App Store Connect
- [ ] Android: Google Play Developer Account
- [ ] App Icons (alle Größen)
- [ ] Screenshots für Store-Listings
- [ ] Marketing-Texte (DE/EN)
- [ ] Privacy Policy URL
- [ ] Support URL

### Backend
- [ ] API-Endpunkte dokumentieren
- [ ] Rate Limiting implementieren
- [ ] Monitoring & Logging
- [ ] Backup-Strategie
- [ ] Skalierbarkeit planen

### Testing
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] UI/UX Tests
- [ ] Performance Tests
- [ ] Security Tests
- [ ] Beta Testing mit Usern

## 🎯 MVP vs. Full Version

### MVP (Minimum Viable Product)
1. ✅ User Registration (Passkey + E-Mail)
2. ✅ Timer-Funktion mit App-Blockierung
3. ✅ Credit-System (Basis)
4. ✅ Store mit 5-10 Partner-Angeboten
5. ✅ QR-Code Einlösungs-System
6. ✅ Basic Profil & Statistiken
7. ✅ Push-Benachrichtigungen

### Full Version
- Alle Gamification-Features
- Leaderboards
- Freunde-System & Referrals
- Pro-Version mit Subscription
- Erweiterte Analytics
- Challenge-System
- 100+ Partner
- Social Sharing
- Advanced Statistiken

## 📝 Nächste Schritte für Entwickler

### Phase 1: Setup (Woche 1-2)
1. Projekt-Repository einrichten
2. Entwicklungsumgebung aufsetzen
3. CI/CD Pipeline konfigurieren
4. Backend-Architektur designen
5. Datenbank-Schema erstellen

### Phase 2: Core Features (Woche 3-8)
1. Authentifizierungs-System
2. Timer & App-Blockierung
3. Credit-System & Tracking
4. User Profile & Settings
5. Push-Benachrichtigungen

### Phase 3: Store & Partners (Woche 9-12)
1. Partner-Management System
2. Angebots-Katalog
3. QR-Code System
4. Voucher-Verwaltung
5. Partner-App/Dashboard

### Phase 4: Gamification (Woche 13-16)
1. Level-System
2. Achievements
3. Streak-Tracking
4. Challenges
5. Leaderboards

### Phase 5: Testing & Polish (Woche 17-20)
1. Beta Testing
2. Bug Fixes
3. Performance-Optimierung
4. UI/UX Refinement
5. Store-Submission

## 🤝 Partner-Integration

### Partner-Dashboard Features
- Angebote erstellen & verwalten
- Credit-Wert festlegen
- Gültigkeit & Limits setzen
- Einlösungs-Statistiken
- Abrechnungs-Übersicht

### Partner-App (QR-Scanner)
- QR-Code Scanner
- Manuelle Code-Eingabe
- Echtzeit-Validierung
- Einlösungs-Historie
- Push-Benachrichtigungen

## 📞 Support & Fragen

Für Fragen zur Implementierung oder zum Design:
- **E-Mail:** dev@romo-app.at (Beispiel)
- **Slack/Teams:** ROMO Developer Channel

## 📦 Datei-Struktur

```
/flbcoat/
├── index.html              # Haupt-HTML mit allen Screens
├── styles.css              # Komplettes Styling
├── script.js               # JavaScript für Interaktivität
├── ROMO_DOKUMENTATION.md   # Diese Dokumentation
└── README.md               # Original Repository README
```

## 🎬 Screen-Übersicht

Der Klickdummy enthält folgende Screens:

1. **screen-welcome** - Welcome Slides (4 Slides)
2. **screen-register-1** - Registrierung: Name
3. **screen-register-2** - Registrierung: Alter
4. **screen-register-3** - Registrierung: Interessen
5. **screen-register-4** - Registrierung: Ziele
6. **screen-register-5** - Registrierung: Account erstellen
7. **screen-permissions** - Berechtigungen anfordern
8. **screen-permissions-guide** - Berechtigungs-Anleitung
9. **screen-profile-complete** - Profil vervollständigen
10. **screen-tutorial-1 bis 5** - Tutorial Screens
11. **screen-first-mission** - Erste Mission
12. **screen-dashboard** - Haupt-Dashboard
13. **screen-timer-setup** - Timer einrichten
14. **screen-timer-active** - Timer läuft
15. **screen-timer-complete** - Timer abgeschlossen
16. **screen-store** - Store Hauptscreen
17. **screen-offer-detail** - Angebots-Detail
18. **screen-redeem-confirm** - Einlösungs-Bestätigung
19. **screen-voucher** - Voucher-Anzeige
20. **screen-my-vouchers** - Voucher-Übersicht
21. **screen-profile** - Profil Hauptscreen
22. **screen-achievements** - Achievements-Übersicht
23. **screen-pro** - Pro-Version Upgrade
24. **screen-leaderboard** - Leaderboard
25. **screen-friends** - Freunde & Referrals

## 📄 Lizenz

Dieser Klickdummy ist ausschließlich für interne Entwicklungs- und Präsentationszwecke.

---

**Version:** 1.0
**Erstellt:** November 2025
**Letztes Update:** November 2025

**Viel Erfolg bei der Entwicklung! 🚀**
