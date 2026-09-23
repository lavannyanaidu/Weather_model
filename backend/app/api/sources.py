from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.domain import Source
from app.schemas.domain import SourceSchema

router = APIRouter(prefix="/sources", tags=["Sources"])

@router.get("", response_model=List[SourceSchema])
def get_sources(db: Session = Depends(get_db)):
    sources = db.query(Source).all()
    return [SourceSchema.from_orm(s) for s in sources]
