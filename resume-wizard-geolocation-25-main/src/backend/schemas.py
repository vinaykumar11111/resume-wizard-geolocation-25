from pydantic import BaseModel
from typing import List, Dict

class ResumeSchema(BaseModel):
    name: str
    email: str
    phone: str
    address: Dict[str, str]
    education: List[Dict[str, str]]
    work_experience: List[Dict[str, str]]
    skills: List[str]
    projects: List[Dict[str, str]]
    template_choice: str
