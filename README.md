# ChunaavAI: Civic Intelligence Platform 🇮🇳

**ChunaavAI** is a premium, multilingual, and deterministic civic intelligence platform designed to empower Indian citizens with verified election data, educational resources, and interactive tools. Built for high-stakes civic engagement, it prioritizes **Security, Accessibility, and Visual Excellence**.

---

## 🏛️ Vertical & Vision
**Vertical:** Civic Tech / Public Information Systems
**Goal:** To bridge the gap between complex electoral data and the common citizen by providing a zero-cost, localized, and highly accessible platform that guides users from registration to the polling booth.

---

## 🧠 Approach & Logic

### 1. Deterministic Architecture
Unlike standard AI chatbots that might hallucinate civic data, ChunaavAI uses a **deterministic keyword-matching engine**. 
- **Logic:** Matches user queries against a verified local knowledge base (`electionData.json`).
- **Benefit:** Zero cost (no API tokens), high speed, and 100% factual accuracy—crucial for election-related information.

### 2. Multi-Layer Localisation (i18n)
We implemented a custom, structured i18n system supporting **9 major Indian languages**.
- **English, Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, and Gujarati.**
- **Logic:** Every UI component, from sidebar labels to dynamic chatbot responses, reacts instantly to the language state without page reloads.

### 3. Visual-First Documentation
Complex document requirements are refactored into high-clarity subsections:
- **Registration Section:** Categorized by Identity, Address, and Age proofs.
- **Polling Day Section:** A checklist of valid IDs to ensure no voter is turned away.

---

## 🛠️ How the Solution Works

- **Frontend:** React 19 + Vite for extreme performance and near-instant load times.
- **Styling:** Vanilla CSS with custom design tokens for glassmorphism and a "Digital India" aesthetic.
- **Authentication:** Mandatory `AuthWall` using Firebase Auth (Google & Phone) ensures verified user access.
- **Data Visualization:** Recharts (Dual-Axis) displays turnout trends and state participation metrics.
- **Booth Locator:** Integrates Google Maps APIs to redirect users to their nearest electoral registration office based on local query parameters.

---

## 🔒 Security & Privacy

1. **Firebase App Check:** Protects backend services from abuse by ensuring traffic comes from valid app instances.
2. **Deterministic Responses:** Prevents AI "jailbreaking" or misinformation by using a closed-loop data source.
3. **Secure AuthWall:** Blocks all application access until the user is authenticated via Google or Phone.
4. **Environment Safety:** All Firebase credentials and API keys are managed through secure `.env` variables.

---

## ♿ Accessibility & Inclusivity

- **ARIA Compliance:** All interactive elements (buttons, inputs, dropdowns) use proper ARIA labels for screen readers.
- **Keyboard Navigation:** Fully navigable via Tab and Enter keys for motor-impaired users.
- **Responsive Design:** Fluid layouts optimized for low-end mobile devices and large desktop monitors.
- **Multilingual UI:** Ensures that language is not a barrier to democratic participation.

---

## ☁️ Google Services Integration

- **Firebase Auth:** Seamless Google One-Tap and Phone Authentication.
- **Firebase Analytics:** Real-time tracking of module engagement and language preferences.
- **Firebase Performance:** Proactive monitoring of app load times and responsiveness.
- **Google Maps:** Deep-linking for real-world booth localization.
- **Firebase Hosting:** Global CDN deployment for sub-second delivery across India.

---

## 📝 Assumptions Made

1. **Static Data:** For the hackathon version, election data (turnout, parties) is served via `electionData.json` to demonstrate zero-cost operation. In a production setting, this would be fetched from a Firestore real-time listener.
2. **Language Support:** Translations were curated to represent the most widely spoken regions in India to maximize immediate impact.

---

## 🚀 Deployment

1. **Build:** `npm run build`
2. **Deploy:** `firebase deploy`

---

*ChunaavAI is dedicated to the spirit of Indian Democracy. Every vote counts.*
