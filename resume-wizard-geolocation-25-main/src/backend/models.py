from backend.database import Base
from sqlalchemy import Column, Integer, String, JSON

class Resume(Base):
    __tablename__ = "resumes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(JSON, nullable=False)
    education = Column(JSON, nullable=False)
    work_experience = Column(JSON, nullable=False)
    skills = Column(JSON, nullable=False)
    projects = Column(JSON, nullable=False)
    template_choice = Column(String, nullable=False)
