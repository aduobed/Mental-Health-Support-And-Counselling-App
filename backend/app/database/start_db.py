from app.database import db_models
from app.database.database import engine, SessionLocal

db_models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
