from pydantic import BaseModel, Field

class UserLoginModel(BaseModel):
    username: str = Field(min_length=4, description="Username should contain less than four(4) characters", example="JohnDoe")
    password: str = Field(min_length=6, description="Password must contain alphanumeric letters", example="password")