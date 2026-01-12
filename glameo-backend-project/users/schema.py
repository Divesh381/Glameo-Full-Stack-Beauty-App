from pydantic import BaseModel,Field
from typing import Optional,List
from typing import Any, Optional, Dict


class LoginSchema(BaseModel):
    '''
    schema for login 
    '''
    '''
    inside models there is a separate field with the name userId,
    here userId is mapped with userLoginId
    '''
    userLoginId : str = Field(None,nullable = True )
    password : str = Field(None,nullable = True)
    

class GetAccessTokenSchema(BaseModel):
    '''
    schema for getting access token from refresh token 
    '''
    refreshToken : Optional[str] = Field(
        None,nullable = True 
    )


class ChangePasswordSchema(BaseModel):
    '''
    schema for changing password 
    '''
    password : Optional[str] = Field(
        None,nullable = True
    )

class CreateUserSchema(BaseModel):
    '''
    schema for creating user
    '''
    customerId:Optional[str]=Field(None,nullable = True)
    name:str=Field(None,nullable = True)
    email:str= Field(None,nullable = True)
    password:str= Field(None,nullable = True)
    mobileNo:str=Field(None,nullable = True)

class CreateUserBeauticianSchema(BaseModel):
    '''
    schema for creating user
    '''
    beauticianId:Optional[str]=Field(None,nullable = True)
    name:str=Field(None,nullable = True)
    email:str= Field(None,nullable = True)
    userLoginId: Optional[str] =Field(None,nullable = True)
    password:str= Field(None,nullable = True)
    mobileNo:str=Field(None,nullable = True)
    aadhaarNo:str=Field(None,nullable = True)
    specialization:str=Field(None,nullable = True)
    experience:str=Field(None,nullable = True)

class userListSchema(BaseModel):
    '''
    schema for listing user based on tenant 
    '''
    sortingOrder : str = Field(
        None, nullable = True
    )
    search : bool = Field(None,nullable = True)
    searchValue : Optional[str] = Field(None,nullable = True)

class UsersDeleteSchema(BaseModel):
    '''
    schema for listing user based on tenant
    '''
    userId : str = Field(
        None, nullable = True)