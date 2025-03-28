3. # ✨ BookClubApp Frontend (React + Vite)

Detta är frontend-delen av BookClubApp – en livlig och festlig bokklubbsapp byggd med React och Vite.
## 🚀 Kom igång
### 1. Klona repot
```bash
git clone https://github.com/ditt-användarnamn/bookclubapp-frontend.git
cd bookclubapp-frontend
2. Installera dependencies
npm install
3. Starta projektet
npm run dev
🔌 API-anslutning

Frontend är kopplad till backend som körs separat (Flask).
För att funktioner som login/register ska fungera måste du:

Se till att backend körs på http://localhost:5000
Justera fetch()- eller axios-URL:er om du kör backend på annan port

🎉 UI-stil

Appen har en glitterig och drömmig stil för att spegla bokklubbskänslan. 💫
Vi använder Tailwind CSS för styling. -Vi får ändra på till något häftigare om vi hinner? :D

🧪 Tips vid problem

❌ "Network Error" eller "Failed to fetch"
→ Kontrollera att backend körs parallellt på localhost:5000

❌ "CORS error"
→ Kontrollera att backend tillåter CORS-anrop från frontend (Flask-CORS)
