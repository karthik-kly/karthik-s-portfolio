# Karthik V — MERN Portfolio

MongoDB · Express · React · Node.js

---

## HOW TO RUN ON MAC

### Step 1 — Install MongoDB on Mac
Open Terminal and run:
```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```
Verify MongoDB is running:
```
mongosh
```
You should see a > prompt. Type `exit` to quit.

### Step 2 — Install Node.js (if not already)
Download from https://nodejs.org → LTS version

### Step 3 — Install all packages
Open Terminal in the project folder:
```
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Step 4 — The .env file is already set up ✅
server/.env already contains:
```
MONGO_URI=mongodb://127.0.0.1:27017/karthik_portfolio
PORT=5000
```

### Step 5 — Run everything
```
npm run dev
```

Open browser: http://localhost:5173

---

## VERIFY IT WORKS

1. Check server:     http://localhost:5000/api/health
2. Fill contact form on the website
3. See saved messages: http://localhost:5000/api/contact
4. Or in terminal:
   mongosh
   use karthik_portfolio
   db.contacts.find()

---

## PROJECT STRUCTURE

```
karthik-mern/
├── package.json          ← root: runs client + server together
├── server/
│   ├── .env              ← MongoDB URI (already configured)
│   ├── index.js          ← Express app entry point
│   ├── models/
│   │   ├── Contact.js    ← MongoDB schema for messages
│   │   └── Visitor.js    ← MongoDB schema for visitor count
│   ├── routes/
│   │   ├── contact.js    ← POST /api/contact, GET /api/contact
│   │   └── visitor.js
│   └── controllers/
└── client/               ← React + Vite frontend
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       ├── Hero.jsx      ← Letter-by-letter name animation
    │       ├── About.jsx
    │       ├── Skills.jsx
    │       ├── Projects.jsx
    │       ├── Contact.jsx   ← Form → POST /api/contact → MongoDB
    │       ├── Navbar.jsx
    │       └── Footer.jsx
    └── vite.config.js    ← Proxies /api to port 5000
```
