from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def greet():
  return {"message": "welcome to the project"}