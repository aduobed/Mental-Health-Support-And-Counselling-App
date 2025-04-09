import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

# Connection string for MySQL database
MYSQL_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(MYSQL_DATABASE_URL)


# engine = create_engine("mysql+pymysql://user:password@127.0.0.1:3309/testdb")

SessionLocal = sessionmaker(
    bind=engine, autoflush=False, expire_on_commit=False)

Base = declarative_base()
