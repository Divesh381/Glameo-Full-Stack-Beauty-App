import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from config import settings
from database import engine
from users.models import Base as customerAndBeauticianModel
from users.router import userRouter
from services.router import servicesRouter

app = FastAPI(
    openapi_url="/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc")

#Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3003"],  #Allow frontend URL
    allow_credentials=True,
    allow_methods=["*"],  #Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  #Allow all headers
)

# User models
customerAndBeauticianModel.metadata.create_all(engine)

#User router
app.include_router(userRouter)
app.include_router(servicesRouter)

if __name__ == '__main__': 
    if settings.ENVIRONMENT == 'local' or settings.ENVIRONMENT == 'dev':
        uvicorn.run("main:app", host="0.0.0.0", port=8004, log_level="info", reload=True)