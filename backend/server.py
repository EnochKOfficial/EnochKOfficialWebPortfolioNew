from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# -------------------- Models --------------------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class Social(BaseModel):
    label: str
    href: str

class Profile(BaseModel):
    name: str
    tagline: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    socials: Optional[List[Social]] = []

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: Optional[str] = None
    blurb: Optional[str] = None
    details: Optional[str] = None
    tags: Optional[List[str]] = []

class WritingItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class Writing(BaseModel):
    worksInProgress: List[WritingItem] = []

class EducationCurrent(BaseModel):
    institution: str
    standard: Optional[str] = None
    year: Optional[str] = None
    notes: Optional[str] = None

class Education(BaseModel):
    current: Optional[EducationCurrent] = None

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# -------------------- Routes --------------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# status checks (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Profile
@api_router.get("/profile", response_model=Optional[Profile])
async def get_profile():
    doc = await db.profile.find_one({})
    if not doc:
        return None
    doc.pop("_id", None)
    return Profile(**doc)

# Projects
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    docs = await db.projects.find().to_list(1000)
    return [Project(**{k: v for k, v in d.items() if k != "_id"}) for d in docs]

# Writing
@api_router.get("/writing", response_model=Writing)
async def get_writing():
    doc = await db.writing.find_one({})
    if not doc:
        return Writing(worksInProgress=[])
    doc.pop("_id", None)
    return Writing(**doc)

# Education
@api_router.get("/education", response_model=Education)
async def get_education():
    doc = await db.education.find_one({})
    if not doc:
        return Education(current=None)
    doc.pop("_id", None)
    return Education(**doc)

# Contact messages (DB copy after Formspree)
@api_router.post("/contact-messages", status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    obj = ContactMessage(**payload.dict())
    await db.contact_messages.insert_one(obj.dict())
    return {"id": obj.id}

@api_router.get("/contact-messages", response_model=List[ContactMessage])
async def list_contact_messages():
    docs = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
    return [ContactMessage(**{k: v for k, v in d.items() if k != "_id"}) for d in docs]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()