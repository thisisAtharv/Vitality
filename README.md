# 🧬 Vitality – Personalized Health Intelligence Platform

> 🏆 **Awarded "Best Project" - Sem 6**

**Vitality** is an intelligent healthcare system that uses machine learning to analyze blood biomarkers and predict potential metabolic health risks. The platform addresses the lack of personalized, clinical-data-driven healthcare by providing actionable diet and lifestyle recommendations. 

It combines a **React glassmorphism frontend**, a **Flask/SQLite backend**, an **AI-driven OCR microservice**, and a **Multi-Output Random Forest Classifier** to eliminate manual data entry and generate highly specific, downloadable health protocols.

---

## ✨ Features

### 🔐 Secure Onboarding & State Management
- **Secure Access:** Powered by **Firebase Authentication** (Google Sign-In).
- **Data Decoupling:** Sensitive medical history and physical parameters are securely persisted in a local **SQLite database**, completely decoupled from the authentication layer.

### 🤖 AI-Driven Clinical OCR
Vitality eliminates tedious manual entry using an asynchronous microservice pipeline:
- **n8n Workflows:** Acts as the webhook receiver and PDF processor.
- **Groq LLM API:** Performs strict JSON entity extraction to pull exact biomarkers (Fasting Glucose, HbA1c, Vitamin D, etc.) from messy, unstructured lab reports.
- **Instant Sync:** The React UI instantly auto-fills sliders based on the AI extraction.

### 🧠 Intelligence Engine & Report Generation (Core)
- **Metabolic Risk Prediction:** Powered by a custom **Multi-Output Random Forest Classifier** (`model.pkl`), the backend analyzes blood anomalies to predict specific metabolic risks.
- **Multi-Tag Classification:** Simultaneously generates distinct, medically-aware Diet tags and Exercise tags tailored to the user's age, gender, and deficiencies.
- **Downloadable PDF Reports:** Compiles the user's clinical data and predicted lifestyle protocols into a clean, exportable PDF document for personal tracking or doctor visits.

### 🛡️ User Control & Privacy
- **Live Notifications:** Uses Python `smtplib` for real-time email alerts.
- **GDPR-Style Privacy:** A strict one-click "Delete Data" protocol that permanently wipes a user's medical history from the database.

---

## 🛠️ Technology Stack

| Domain | Tech Used |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS, Shadcn UI |
| **Backend** | Python, Flask, SQLite3, smtplib |
| **Authentication** | Firebase Authentication (Google Sign-In) |
| **Machine Learning** | Scikit-learn (Multi-Output Random Forest Classifier), Pandas |
| **AI / Microservice** | n8n (Workflow Automation), Groq API (Llama 3) |

---

## 🏗️ System Architecture

1.  **Frontend:** React UI communicates with the Flask backend via REST APIs and handles live state.
2.  **Auth:** Firebase handles secure Google authentication and token management.
3.  **AI Microservice:** n8n and Groq API process uploaded pathology reports into structured JSON parameters.
4.  **ML Backend:** The Flask server feeds the clinical parameters into the Random Forest model to classify personalized diet/exercise tags.
5.  **Database:** SQLite securely stores user profiles, clinical parameters, and generated health plans.

---

## 📸 Screenshots

### 🖥️ The Core UI & Input
| **Dashboard** | **AI-OCR Input Wizard** |
| :---: | :---: |
| ![Dashboard](assets/screenshots/dashboard.png) | ![Clinical OCR](assets/screenshots/userinputpage.png) |

### 🧠 The ML Intelligence
| **Health Analysis Results** | **Generated Diet & Workout PDF** |
| :---: | :---: |
| ![Analysis](assets/screenshots/useranalysis.png) | ![Health Plan](assets/screenshots/dietworkoutplanpdf.png) |

### 🛡️ User Tracking & Control
| **History Log** | **Settings & Privacy** |
| :---: | :---: |
| ![History](assets/screenshots/historypage.png) | ![Settings](assets/screenshots/settingspage.png) |

### ⚙️ The Backend Architecture
| **n8n AI Extraction Workflow** | **Firebase Auth Integration** |
| :---: | :---: |
| ![n8n Workflow](assets/screenshots/n8nautomationgmailnotification.png) | ![Firebase](assets/screenshots/firebaseauth.png) |

---

## 📁 Project Structure
```text
Vitality/
├── backend/                       # Flask Backend & Machine Learning Services
│   ├── static/                    # Backend static storage (e.g., uploaded user avatars)
│   ├── app.py                     # Main Flask server, API endpoints, and email services
│   ├── classes.txt                # ML model labels and classification mapping
│   ├── model.pkl                  # Large ML predictive model (ignored from Git)
│   ├── requirements.txt           # Python dependencies (Flask, Pandas, etc.)
│   ├── test_email.py              # Sandbox script for testing SMTP notifications
│   ├── vitality.db                # SQLite user database (ignored from Git)
│   └── .env                       # Backend environment variables / API Keys (ignored)
│
├── frontend/                      # React Frontend Application (Vite)
│   ├── public/                    # Public static assets
│   ├── src/                       # Frontend source code
│   │   ├── assets/                # Image illustrations and SVGs
│   │   ├── components/            # Reusable UI elements (InputWizard, Sidebar, etc.)
│   │   ├── components/ui/         # Shadcn/Radix UI base components
│   │   ├── contexts/              # Global React state (AuthContext, HealthDataContext)
│   │   ├── hooks/                 # Custom React hooks (e.g., use-toast, use-mobile)
│   │   ├── lib/                   # Utility functions
│   │   ├── pages/                 # Full application views (Dashboard, Profile, etc.)
│   │   ├── App.jsx                # Main application routing
│   │   ├── firebase.js            # Firebase Auth client configuration
│   │   ├── i18n.js                # Multi-language internationalization setup
│   │   ├── index.css              # Global styles, Tailwind config, and themes
│   │   └── main.jsx               # React DOM entry point
│   │
│   ├── .env                       # Frontend environment variables (ignored)
│   ├── eslint.config.js           # Linting configuration
│   ├── index.html                 # Main HTML template
│   ├── package.json               # Node.js dependencies and run scripts
│   └── vite.config.js             # Vite build and server configuration
│
├── .gitignore                     # Centralized Git ignore rules for the platform
├── LICENSE                        # Open-source license file
└── README.md                      # Project documentation and setup guide
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **Python** (3.9 or higher)
* **n8n** installed globally (`npm install -g n8n`)
* **Firebase Project** (for Auth credentials)
* **Groq API Key** (for LLM extraction)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/thisisAtharv/Vitality.git
    cd Vitality
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```

3.  **Backend Setup**
    *Note: The `model.pkl` Random Forest model must be generated locally or acquired, as it is ignored via Git.*
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```

4.  **Environment Setup**
    This project uses separate credentials for the frontend and backend.

    **Frontend Environment Variables (`frontend/.env`)**
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

    **Backend Environment Variables (`backend/.env`)**
    ```env
    MAIL_APP_PASSWORD=your_gmail_app_password
    SECRET_KEY=your_flask_secret_key
    GROQ_API_KEY=your_groq_api_key
    ```

5.  **Run the Application (Requires 3 Terminals)**

    **Terminal 1: Frontend**
    ```bash
    cd frontend
    npm run dev
    ```

    **Terminal 2: Backend**
    
    ```bash
    cd backend
    python app.py
    ```

    **Terminal 3: AI Microservice (n8n)**
    ```bash
    npx n8n
    ```
    *Open `http://localhost:5678`, import your workflow, add your Groq API key to the HTTP node, and set the workflow to **Active**.*

---

## 🧠 Learning Outcomes
* Training and deploying a **Multi-Output Random Forest Classifier** for multi-tag prediction.
* Architecting a decoupled **microservice backend** with Flask and n8n.
* Integrating **Large Language Models (Groq/Llama 3)** for structured JSON data extraction.
* Building complex, responsive **React Glassmorphism** UIs using Shadcn.

---

## 🔮 Future Enhancements
* ☁️ **Cloud Database Migration:** Move from local SQLite to PostgreSQL (Neon/Supabase) for deployment.
* 📦 **Cloud Storage:** Migrate local avatar/image uploads to Firebase Storage.
* 🐍 **Native Backend OCR:** Transition the n8n pipeline into a native Python Flask endpoint for easier cloud hosting.

---

## 📝 License
This project is licensed under the MIT License.
