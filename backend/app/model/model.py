from pydantic import BaseModel, Field
from typing import Optional

class UserModel(BaseModel):
  username: str
  email: str
  first_name: str
  last_name: str
  password: str
  phone_number: Optional[str]