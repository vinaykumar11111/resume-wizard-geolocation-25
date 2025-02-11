# Resume Generator Application with Geolocation Tracking

## Overview
The Resume Generator Application is a full-stack web application that allows users to input their details via a form, generate a resume in PDF format, and store the data in a backend database. The application integrates an IP geolocation API to automatically fetch and fill in the user's city, region, and country.

## Features

- **Dynamic Resume Form**: Users can enter personal details, work experience, skills, and projects.
- **Geolocation Tracking**: Automatically detects and fills in the user's city, region, and country.
- **Resume Templates**: Users can choose from multiple resume templates.
- **PDF Resume Generation**: Converts the resume into a downloadable PDF using WeasyPrint.
- **Database Storage**: Saves user resume details in PostgreSQL/MySQL/MongoDB.
- **RESTful API**: Built with FastAPI, providing endpoints for form submission, PDF generation, and geolocation fetching.
- **User Authentication**: Secure login and signup using JWT authentication.
- **Profile Picture Upload**: Allows users to upload profile pictures.
- **Security Features**: Implements rate limiting, CORS, and SQL injection protection.

## Tech Stack

### Frontend:
- React with TypeScript
- Tailwind CSS / Bootstrap
- Fetch API for backend communication

### Backend:
- FastAPI (Python)
- PostgreSQL / MySQL / MongoDB (Choose one)
- WeasyPrint (For PDF Generation)
- IP Geolocation API (e.g., IPStack, IPinfo, ip-api)
- JWT authentication with bcrypt

## System Requirements
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+ (or MySQL/MongoDB)
- pip (Python package manager)
- npm (Node package manager)

## Installation Guide

### Backend Setup

1. **Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Backend Dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure Database**
```sql
CREATE DATABASE resume_generator;
```

4. **Set Environment Variables**
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@localhost/resume_generator
SECRET_KEY=your-secret-key
ALGORITHM=HS256
GEOLOCATION_API_KEY=your-ip-api-key
```

5. **Run Database Migrations**
```bash
alembic upgrade head
```

### Frontend Setup

1. **Install Frontend Dependencies**
```bash
npm install
```

2. **Configure Environment**
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

**Deployed Application:** [Resume Wizard with Geolocation](https://resume-wizard-geolocation-25.vercel.app/)

1. **Start Backend Server**
```bash
uvicorn main:app --reload --port 8000
```

2. **Start Frontend Development Server**
```bash
npm run dev
```

Access the application at `http://localhost:5173`

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Key API Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/resumes - Get user's resumes
POST /api/resumes - Create new resume
GET /api/resumes/{id} - Get specific resume
PUT /api/resumes/{id} - Update resume
DELETE /api/resumes/{id} - Delete resume
```

## Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes Table
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment Guide

### Backend Deployment (Render/Ubuntu Server)

1. **Install system dependencies**
```bash
sudo apt update
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx
```

2. **Configure PostgreSQL**
```bash
sudo -u postgres psql
CREATE DATABASE resume_generator;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE resume_generator TO myuser;
```

3. **Deploy with Gunicorn**
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend Deployment (Netlify/Vercel)

1. **Build the frontend**
```bash
npm run build
```

2. **Deploy the built files**

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
```bash
sudo service postgresql status
psql -U username -d resume_generator
```

2. **Backend Server Issues**
```bash
tail -f backend.log
echo $DATABASE_URL
```

3. **Frontend Build Issues**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Future Enhancements
- More resume templates
- Resume editing feature
- AI-powered resume suggestions
- Advanced analytics for resume performance

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Added feature"`
4. Push to GitHub & create a Pull Request

## Contact
✉️ **Vinay Kumar Reddy ** 
📌 **GitHub**: [https://github.com/vinaykumar11111](https://github.com/vinaykumar11111)  
📌 **LinkedIn**: [https://www.linkedin.com/in/vinayreddyseelam/](https://www.linkedin.com/in/vinayreddyseelam/)

