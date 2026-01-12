from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_PORT: int
    DATABASE_PASSWORD: str 
    DATABASE_USER: str
    DATABASE_HOST: str
    DATABASE_NAME: str 
    DEBUG: bool
    JWT_ALGO : str 
    JWT_SECRET : str 
    REFRESH_TOKEN_SECRET : str
    REFRESH_TOKEN_EXPIRY_MINUTES : str
    ACCESS_TOKEN_EXPIRY_MINUTES : str

    ENVIRONMENT : str

    # MONGODB_HOST : str
    # MONGODB_PORT : int
    # MONGODB_USER : str
    # COLLECTION_USER : str

    #
    CUSTOMERNAME_MAX_LENGTH_ERROR:int
    CUSTOMERNAME_MIN_LENGTH_ERROR:int
    MOBILE_NO_MAX_LENGTH_ERROR:int
    MOBILE_NO_MIN_LENGTH_ERROR:int
    PASSWORD_MAX_LENGTH_ERROR:int
    PASSWORD_MIN_LENGTH_ERROR:int
    BEAUTICIAN_NAME_MAX_LENGTH:int
    BEAUTICIAN_NAME_MIN_LENGTH:int
    USER_ID_NAME_MAX_LENGTH:int
    USER_ID_NAME_MIN_LENGTH:int
    
    class Config:
        env_file = './.env'

settings = Settings()