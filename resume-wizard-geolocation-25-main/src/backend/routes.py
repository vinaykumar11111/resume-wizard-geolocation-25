from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from backend.database import get_db
from backend.models import Resume
from backend.schemas import ResumeSchema
from backend.pdf_generator import generate_pdf

router = APIRouter()

IPSTACK_API_KEY = "your_ipstack_api_key"

@router.get("/fetch-location")
def get_location():
    ip_api_url = f"http://api.ipstack.com/check?access_key={IPSTACK_API_KEY}"
    response = requests.get(ip_api_url).json()
    return {"city": response["city"], "region": response["region_name"], "country": response["country_name"]}

@router.post("/submit-resume")
def submit_resume(resume: ResumeSchema, db: Session = Depends(get_db)):
    db_resume = Resume(**resume.dict())
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    pdf_url = generate_pdf(resume.dict(), db_resume.id)
    return {"message": "Resume stored successfully!", "pdf_url": pdf_url}

@router.get("/generate-pdf/{resume_id}")
def download_pdf(resume_id: int):
    return {"pdf_link": f"http://localhost:8000/static/resume_{resume_id}.pdf"}
