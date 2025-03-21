BookClub App – Frontend

Detta är frontend-delen av BookClub-appen, byggd med React. Appen innehåller sex sidor: Home, Books, Reviews, Profile, Login och Register. Applikationen använder React Router för navigering samt en gemensam lila header med logotypen "BOOK CLUB".

Innehåll

Beskrivning
Funktionalitet
Mappstruktur
Installation
Körning av applikationen
Bygg och distribution
Versionshantering
Kontakt
Beskrivning

BookClub Frontend är en del av ett fullstack-projekt som hanterar bokklubbens användargränssnitt. Här kan användare:

Se en välkomstsida (Home) med exempel på bokinformation.
Visa en lista över alla böcker (Books).
Läsa och skriva recensioner (Reviews).
Visa sin personliga profil (Profile).
Logga in (Login) och registrera sig (Register).
Appen är designad med en enhetlig grafisk profil – en lila header med vit text och navigationslänkar.

Funktionalitet

Routing:
Appen använder React Router för att navigera mellan sidorna utan sidomladdning.
Header:
Alla sidor visar en gemensam header med titeln "BOOK CLUB" och länkar till de olika sidorna.
Responsiv design:
Appen är byggd med en responsiv layout som anpassar sig efter olika skärmstorlekar (se src/styles/main.css).
Mappstruktur

Exempel på mappstruktur:

BookClubApp-Frontend/
├── package.json
├── package-lock.json
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   └── Header.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── BooksPage.js
│   │   ├── ReviewsPage.js
│   │   ├── ProfilePage.js
│   │   ├── LoginPage.js
│   │   └── RegisterPage.js
│   └── styles/
│       └── main.css
└── README.md
Installation

Kloning av repo:
Klona repo:t med följande kommando:

git clone https://github.com/AlmaHul/BookClubApp-Frontend.git
Navigera in i projektmappen:
cd BookClubApp-Frontend
Installera npm-beroenden:
Se till att du har Node.js installerat och kör sedan:

npm install
Detta installerar React, React DOM, React Router Dom och övriga beroenden enligt package.json.
Körning av applikationen

För att starta utvecklingsservern, kör:

npm start
Efter att kommandot körts kommer applikationen att öppnas i webbläsaren på http://localhost:3000.
Om du använder en basename (t.ex. vid GitHub Pages) kan URL:en vara annorlunda, se Bygg och distribution.

Bygg och distribution

För att skapa en produktionsbyggnad kör:

npm run build
Detta skapar en build/-mapp med optimerade filer som du kan distribuera på en webbserver eller GitHub Pages.

Om du deployar via GitHub Pages, se till att du har rätt basename i din Router i src/App.js. Exempel:

<Router basename="/BookClubApp-Frontend">
  {/* ... */}
</Router>
Versionshantering

Detta projekt använder Git för versionshantering. Följ dessa riktlinjer:

Huvudbranch: main (eller dev om ni använder det som utvecklingsbranch).
Feature-brancher: Skapa en ny branch för varje ny funktion eller buggfix (t.ex. feature/add-header).
Pull Requests: Alla ändringar ska pushas via feature-brancher och PR:as mot main/dev. Minst en annan gruppmedlem ska granska PR:n innan merge.
Commit-meddelanden: Använd imperativ form, t.ex. "Add header component", "Fix navigation bug".
Kontakt
