
# Resume Builder Application

A full-stack resume builder application using React with TypeScript for the frontend and FastAPI with PostgreSQL for the backend.

## System Requirements

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- pip (Python package manager)
- npm (Node package manager)

## Project Setup

### Backend Setup

1. **Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Backend Dependencies**
```bash
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install psycopg2-binary
pip install python-multipart
pip install python-jose[cryptography]
pip install passlib[bcrypt]
```

3. **Configure Database**
```sql
CREATE DATABASE resume_builder;
```

4. **Set Environment Variables**
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@localhost/resume_builder
SECRET_KEY=your-secret-key
ALGORITHM=HS256
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

1. **Start Backend Server**
```bash
# From the backend directory
uvicorn main:app --reload --port 8000
```

2. **Start Frontend Development Server**
```bash
# From the frontend directory
npm run dev
```

Access the application at `http://localhost:5173`

## API Documentation

Once the backend is running, access the API documentation at:
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

## Features

### Backend Features
- User authentication using JWT
- PostgreSQL database integration
- PDF generation using WeasyPrint
- File upload handling for profile pictures
- Rate limiting and security middleware
- Automated database migrations

### Frontend Features
- Real-time resume editing
- Multiple resume templates
- PDF export functionality
- Profile picture upload
- Automatic location detection
- Responsive design using Tailwind CSS

## Security Features

- Password hashing using bcrypt
- JWT authentication
- CORS configuration
- Rate limiting
- SQL injection protection
- XSS protection

## Error Handling

The application includes comprehensive error handling:

```python
# Backend error responses
{
    "error": "string",
    "detail": "string",
    "status_code": int
}
```

## Deployment

### Backend Deployment (Example using Ubuntu Server)

1. Install system dependencies
```bash
sudo apt update
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx
```

2. Configure PostgreSQL
```bash
sudo -u postgres psql
CREATE DATABASE resume_builder;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE resume_builder TO myuser;
```

3. Set up Gunicorn
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend Deployment

1. Build the frontend
```bash
npm run build
```

2. Deploy the built files to your web server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. Database Connection Issues
```bash
# Check PostgreSQL service status
sudo service postgresql status

# Verify database connection
psql -U username -d resume_builder
```

2. Backend Server Issues
```bash
# Check logs
tail -f backend.log

# Verify environment variables
echo $DATABASE_URL
```

3. Frontend Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- FastAPI for the backend framework
- React for the frontend framework
- PostgreSQL for the database
- Tailwind CSS for styling
- Shadcn UI for components
