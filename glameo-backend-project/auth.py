from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from fastapi import Depends,HTTPException,status,Request
from config import settings
from datetime import timedelta,datetime
import api_response_message,api_response_codes


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/v1/login")


def createAccessToken(data,  expiry: int):
    '''
    utility function for creating auth token 
    '''
    payload = data.copy()
    expire_in = datetime.utcnow() + timedelta(minutes=expiry)
    payload.update({"exp": expire_in})
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGO)
    return token 

def createRefreshToken(data,expiry:int):
    '''
    utility function for returning refresh token 
    '''
    payload = data.copy()
    expire_in = datetime.utcnow()  + timedelta(minutes=expiry)
    payload.update({"exp" : expire_in})
    refreshToken = jwt.encode(
        payload,settings.REFRESH_TOKEN_SECRET,algorithm=settings.JWT_ALGO
    )
    return refreshToken


def getCurrentUser(request:Request,data:str=Depends(oauth2_scheme),refreshToken=False):
    '''
    utility function for getting current user
    '''
    authHeader = request.headers.get("Authorization")

    if not authHeader or not authHeader.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Missing or Invalid Authorization Header",
        )
    token = authHeader.split(" ")[1]
    print(f'===========>>>>>token {token}')
    if not token:        
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not Authenticatted",
        headers={"WWW-Authenticate": "Bearer"},
        )
    payload = jwt.decode(token=token,key=settings.JWT_SECRET,algorithms=settings.JWT_ALGO)
    return payload.get('sub')
