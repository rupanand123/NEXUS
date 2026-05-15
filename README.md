# Nexus IT Solutions - Premier IT Services Platform

Nexus IT Solutions is a modern, high-performance full-stack web application designed for a premier IT services organization. It features a "Sophisticated Dark" aesthetic, real-time lead management, and a robust security architecture.

## 🚀 Tech Stack

### Frontend
- **React 19**: Leveraging the latest functional patterns and hooks.
- **TypeScript**: Ensuring end-to-end type safety.
- **Tailwind CSS 4.0**: Modern utility-first styling with high-performance CSS-variable based theming.
- **Motion (Framer Motion)**: Professional-grade animations for route transitions and micro-interactions.
- **Lucide React**: Clean, consistent iconography.

### Backend & Infrastructure
- **Node.js & Express**: Custom backend server for API routing and health monitoring.
- **Firebase Ecosystem**: 
  - **Firestore (NoSQL)**: Real-time database for inquiry management with hardened security rules.
  - **Firebase Authentication**: Secure Google OAuth integration for administrative access.
- **Vite**: Ultra-fast build tool and development server.
- **Esbuild**: High-speed bundling for production server-side code.

## 🛠️ Integrated APIs & Services

1. **Firebase JS SDK (v11+)**:
   - `initializeApp`: Core service initialization.
   - `getFirestore`: Real-time data synchronization and persistent storage for client inquiries.
   - `getAuth`: Identity management and secure session handling.
2. **Google Identity API**:
   - `signInWithPopup`: Seamless administrative login via Google accounts.
3. **Firestore Security Rules (v2)**:
   - Enterprise-grade Attribute-Based Access Control (ABAC) protecting sensitive client data.
   - Relational validation to ensure data integrity.
4. **Google Fonts API**:
   - Serving **Inter** (Global UI) and **Playfair Display** (Sophisticated Serif accents).

## 🏗️ Architecture Highlights

- **Full-Stack Integration**: Uses a custom `server.ts` to bridge Vite's SPA capabilities with a production-ready Express environment.
- **Admin Protocol**: A protected `AdminDashboard` component that leverages Firestore's `onSnapshot` for real-time lead tracking.
- **Security-First Design**: Implements advanced Firestore rules to prevent "Shadow Updates" and unauthorized data scraping.
- **Responsive "Sophisticated Dark" Theme**: A minimalist, high-contrast interface designed for maximum readability and a premium tech-forward feel.

## 📁 Key Directories

- `/src/components`: Modular UI components (Hero, Services, Contact, Admin).
- `/src/lib`: Infrastructure configuration (Firebase initialization, error handling).
- `/server.ts`: Entry point for the full-stack Express engine.
- `/firestore.rules`: Compiled security definitions for the cloud database.
- `/firebase-blueprint.json`: Data schema and relational map for the Firestore architecture.
