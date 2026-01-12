from fastapi import APIRouter,Depends,status,Request,Response
from auth import getCurrentUser
from database import get_db
from .api import changePassword, createOrUpdateUserForBeauticianApi, createOrUpdateUserForCustomerApi, deleteCustomerUsersApi, deletelistBeauticiansUsersApi, generatePassword, getAccessTokenFromRefreshTokenApi, listBeauticiansUserApi, listCustomerUserApi,loginCustomerAndBeauticiansApi, loginOtpCustomerAndBeauticiansApi, logoutApi
from .schema import ChangePasswordSchema, CreateUserBeauticianSchema, CreateUserSchema, GetAccessTokenSchema, LoginSchema, UsersDeleteSchema, userListSchema
from sqlalchemy.orm import Session 

userRouter = APIRouter(
    prefix='/glameo/user',
    tags=['Customer-Beautician-user']
)

@userRouter.post('/create-user-customer',status_code=status.HTTP_201_CREATED)
def addUserForCustomerRouter(register:CreateUserSchema,response:Response,db:Session=Depends(get_db),currentUser:str = Depends(getCurrentUser)):
    '''
    ROUTER TO ADD NEW USERS
    '''
    return createOrUpdateUserForCustomerApi(register,db,response,currentUser)

@userRouter.post('/create-user-beautician',status_code=status.HTTP_201_CREATED)
def addUserForBeauticianRouter(register:CreateUserBeauticianSchema,response:Response,db:Session=Depends(get_db),currentUser:str = Depends(getCurrentUser)):
    '''
    ROUTER TO ADD NEW USERS
    '''
    return createOrUpdateUserForBeauticianApi(register,db,response,currentUser)

@userRouter.post('/login-otp',status_code=status.HTTP_201_CREATED)
def loginOtpCustomerAndBeauticiansRouter(login:LoginSchema,response:Response,request:Request,db:Session=Depends(get_db)):
    '''
    router for login 
    '''
    return loginOtpCustomerAndBeauticiansApi(
        login,response,request,db
        )

@userRouter.post('/login',status_code=status.HTTP_200_OK)
def loginCustomerAndBeauticiansRouter(login:LoginSchema,response:Response,request:Request,db:Session=Depends(get_db)):
    '''
    router for login 
    '''
    data = login.json() 
    print("Received Request Data:", data) 
    return loginCustomerAndBeauticiansApi(
        login,response,request,db
        )

@userRouter.post('/list-user-customer',status_code=status.HTTP_200_OK)
def listCustomerUserRouter(userList:userListSchema,request:Request,response:Response,currentUser:str=Depends(getCurrentUser),db:Session=Depends(get_db)):
    '''
    ROUTER FOR GETTING THE LIST OF USER 
    '''
    params = request.query_params
    page = params.get('page', None)
    size = params.get('size', None)

    # Check if page and size are provided and valid digits
    page = int(page) if page and page.isdigit() else None
    size = int(size) if size and size.isdigit() else None

    return listCustomerUserApi(currentUser, userList, response, db, limit=size, page=page)

@userRouter.post('/list-user-beautician',status_code=status.HTTP_200_OK)
def listBeauticiansUserRouter(userList:userListSchema,request:Request,response:Response,currentUser:str=Depends(getCurrentUser),db:Session=Depends(get_db)):
    '''
    ROUTER FOR GETTING THE LIST OF USER 
    '''
  
    params = request.query_params
    page = params.get('page', None)
    size = params.get('size', None)

    # Check if page and size are provided and valid digits
    page = int(page) if page and page.isdigit() else None
    size = int(size) if size and size.isdigit() else None

    return listBeauticiansUserApi(currentUser, userList, response, db, limit=size, page=page)
@userRouter.post('/logout',status_code=status.HTTP_200_OK)
def logOutRouter(logout:GetAccessTokenSchema,response:Response,db:Session=Depends(get_db),currentUser:str=Depends(getCurrentUser)):
    '''
    router for logout
    '''
    return logoutApi(
        logout,response,db    
    )

@userRouter.patch("/change-password",status_code=status.HTTP_200_OK)
def changePasswordRouter(passwordChange:ChangePasswordSchema,response:Response,db:Session=Depends(get_db),currentUser:str=Depends(getCurrentUser)):
    '''
    Router for Changing Password
    '''
    return changePassword(passwordChange,response,db,currentUser)

@userRouter.get("/generate-password",status_code=status.HTTP_200_OK)
def generatePasswordRouter(request:Request,response:Response,currentUser:str=Depends(getCurrentUser),db:Session=Depends(get_db)):
    '''
    Router to Generate Random Password
    '''
    return generatePassword(request,response)
@userRouter.post('/refresh',status_code=status.HTTP_200_OK)
def getAccessTokenFromRefreshToken(request:GetAccessTokenSchema,response:Response,db:Session=Depends(get_db),currentUser:str=Depends(getCurrentUser)):
    '''
    router to get access token from refresh token 
    '''
    return getAccessTokenFromRefreshTokenApi(
        request,response,db,currentUser
    )
@userRouter.delete('/delete-user-customer',status_code=status.HTTP_200_OK)
async def deleteCustomerUserRouter(deleteUser:UsersDeleteSchema,response:Response,currentUser:str=Depends(getCurrentUser),db:Session=Depends(get_db)):
    '''
    ROUTER FOR DELETING/REMOVING USER 
    '''
    return await deleteCustomerUsersApi(deleteUser,response,db,currentUser)

@userRouter.delete('/delete-user-beauticians',status_code=status.HTTP_200_OK)
def deleteBeauticiansUserRouter(deleteUser:UsersDeleteSchema,response:Response,currentUser:str=Depends(getCurrentUser),db:Session=Depends(get_db)):
    '''
    ROUTER FOR DELETING/REMOVING USER 
    '''
    return deletelistBeauticiansUsersApi(deleteUser,response,db,currentUser)