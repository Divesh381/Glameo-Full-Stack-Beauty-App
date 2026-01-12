from datetime import datetime
import sys
from typing import Optional
from fastapi import HTTPException, Request, Response,status
from sqlalchemy import asc, desc, exists
from auth import createAccessToken, createRefreshToken, getCurrentUser
from .helper_functions import changePasswordValidation, createPassword, validateBeauticianUserSchema, validateBeauticiansUserId, validateCustomerUserAddSchema, validateCustomerUserId, validateLoginCustomerAndBeauticiansData
from .models import Beautician, RefreshTokens
from .schema import ChangePasswordSchema, CreateUserBeauticianSchema, CreateUserSchema, GetAccessTokenSchema, LoginSchema, UsersDeleteSchema, userListSchema
from sqlalchemy.orm import Session 
from config import settings
from jose import jwt
from passlib.hash import bcrypt 
from users import api_response,api_response_codes
from .models import Customer

def createOrUpdateUserForCustomerApi(register:CreateUserSchema,db:Session,response:Response,currentUser:str):
    '''
    API FOR REGISTERING NEW USER 
    '''
    data = register.dict()
    isUpdated=False
    try:
        validationResult = validateCustomerUserAddSchema(data,db)
        if not validationResult.get('status'):
            response.status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR if validationResult.get('code') == "500" else status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : validationResult.get('message'),
                "code" : validationResult.get('code')
            }
        validData:dict=validationResult.get('data')
        customerId=validationResult.get('data').get('customerId')
    except Exception as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    try:

        if customerId:
            isExistsCustomersDetails=db.query(Customer).filter(Customer.id==customerId)
            if isExistsCustomersDetails.first():
                isUpdated=True
                #Update user
                validData.update(updatedAt=datetime.utcnow())
                validData.update(createdAt=datetime.utcnow())
                id=validData.pop('customerId')
                validData.update(id=id)
                isExistsCustomersDetails.update(validData)
                db.commit()
        else:
            validData.update(userType="customer")
            validData.update(updatedAt=datetime.utcnow()) 
            id=validData.pop('customerId')
            #Create User
            newUser=Customer(**validData)
            db.add(newUser)
            db.commit()
            db.refresh(newUser)
            
    except Exception as error:
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
            "status" : True,
            "message" :api_response.USER_ADDED_SUCCESSFUL if not isUpdated else api_response.USER_UPDATED_SUCCESSFUL,
            "code" : api_response_codes.USER_ADDED_SUCCESSFUL if not isUpdated else api_response.USER_UPDATED_SUCCESSFUL,
        }
def createOrUpdateUserForBeauticianApi(beauticianData:CreateUserBeauticianSchema,db:Session,response:Response,currentUser:str):
    '''
    create user for beauticians
    '''
    data=beauticianData.dict()
    isUpdated=False
    try:
        validationResult = validateBeauticianUserSchema(data,db)
        if not validationResult.get('status'):
            response.status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR if validationResult.get('code') == "500" else status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : validationResult.get('message'),
                "code" : validationResult.get('code')
            }
        validData:dict=validationResult.get('data')
        beauticianId=validData.get('beauticianId')
    except Exception as error:
        return {
            "status" : False,
            "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    try:
        if beauticianId:
            isExistsCustomersDetails=db.query(Beautician).filter(Beautician.id==beauticianId)
            if isExistsCustomersDetails.first():
                isUpdated=True
                #Update user
                validData.update(rating="0")
                id=validData.pop('beauticianId')
                validData.update(id=id)
                validData.update(updatedAt=datetime.utcnow())
                validData.update(createdAt=datetime.utcnow())
                isExistsCustomersDetails.update(validData)
                db.commit()
        else:
            id=validData.pop('beauticianId')
            validData.update(userType="beautician")
            validData.update(rating="0")
            validData.update(updatedAt=datetime.utcnow()) 
            #Create User
            newUser=Beautician(**validData)
            db.add(newUser)
            db.commit()
            db.refresh(newUser)
    except Exception as error:
        return {
            "status" : False,
            "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
     
    return {
             "status" : True,
            "message" :api_response.USER_ADDED_SUCCESSFUL if not isUpdated else api_response.USER_UPDATED_SUCCESSFUL,
            "code" : api_response_codes.USER_ADDED_SUCCESSFUL if not isUpdated else api_response.USER_UPDATED_SUCCESSFUL,
        }

def loginCustomerAndBeauticiansApi(login:LoginSchema,response:Response,request:Request,db:Session):
    '''
    API FOR LOGIN 
    '''
    data=login.dict()
    try:
        validationResult = validateLoginCustomerAndBeauticiansData(data,db)
        if not validationResult.get('status'):
            response.status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR if validationResult.get('code') == "500" else status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : validationResult.get('message'),
                "code" : validationResult.get('code')
            }
        userData = validationResult.get('userData')
        userId=validationResult.get('data').get('userId')
        userType=validationResult.get('data').get('userType')

    except Exception as error:
        print(f'Error occured in validating image data: {error} | line: {sys.exc_info()[2].tb_lineno}')
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    accessToken = createAccessToken({'sub': str(userId),'userType':str(userType)},int(settings.ACCESS_TOKEN_EXPIRY_MINUTES))
    ####refresh
    refreshToken = createRefreshToken({'sub': str(userId)},int(settings.REFRESH_TOKEN_EXPIRY_MINUTES))
    ##saving refreshToken
    token = RefreshTokens()
    token.refreshToken = refreshToken
    try:
        db.add(token)
        db.commit()
        db.refresh(token)
    except Exception as errors:
        print(f'Error occured in validating image data: {error} | line: {sys.exc_info()[2].tb_lineno}')
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "status" : False,
            "message" : str(errors) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            "code" : api_response_codes.INTERNAL_SERVER_ERROR
        }
    
    return {
        "status" : True,
        "message" : api_response.LOGIN_SUCCESSFUL,
        "code":api_response_codes.LOGIN_SUCCESSFUL,
        "data":{
            "userId":userData.first().id,
            "name":userData.first().name,
            "email":userData.first().email,
            'userType':userData.first().userType,
            "accessToken":accessToken,
            "refreshToken":refreshToken
        }
    }
def loginOtpCustomerAndBeauticiansApi(login:LoginSchema,response:Response,request:Request,db:Session):
    '''
    Login with OTP for customer and beauticians
    '''
    try:
        pass
    except Exception as errors:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "status" : False,
            "message" : str(errors) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            "code" : api_response_codes.INTERNAL_SERVER_ERROR
        }
    
    return {
        "status" : True,
        "message" : api_response.LOGIN_SUCCESSFUL,
        "code":api_response_codes.LOGIN_SUCCESSFUL
    }
    


def getAccessTokenFromRefreshTokenApi(request:GetAccessTokenSchema,response:Response,db:Session,currentUser:str):
    '''
    API FOR GETTING ACCESS TOKEN FROM REFRESH TOKEN
    '''
    data = request.dict()
    try:
        if not data.get('refreshToken') or str(data.get('refreshToken')).isspace():
            response.status_code =  status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : api_response.REFRESH_TOKEN_REQUIRED,
                "code" : api_response_codes.REFRESH_TOKEN_REQUIRED
            }
        
        refreshToken  = str(data.get('refreshToken')).strip()
        try:
            payload = jwt.decode(refreshToken,settings.REFRESH_TOKEN_SECRET,algorithms=[settings.JWT_ALGO])
            userId = payload.get('sub')
            isExistedUser=db.query(exists().where(Customer.id == userId)).scalar()
            if not isExistedUser:
                userType = db.query(Beautician).filter(Beautician.id == userId).first().userType
            else:
                userType = db.query(Customer).filter(Customer.id == userId).first().userType

        except Exception as error:
            raise  HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not Authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

        
        accessToken = createAccessToken({'sub': userId,'userType':userType},settings.ACCESS_TOKEN_EXPIRY_MINUTES)

    except Exception as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
        "status" : True,
        "message" : api_response.ACCESS_TOKEN_GRANTED,
        "code": api_response_codes.ACCESS_TOKEN_GRANTED,
        "accessToken" : accessToken
    }

def logoutApi(logout:GetAccessTokenSchema,response:Response,db:Session):
    '''
    API FOR LOGOUT 
    '''
    data = logout.dict()
    if not data.get('refreshToken') or str(data.get('refreshToken')).isspace() or len(str(data.get('refreshToken')).strip()) == 0:
        return {
            "status" : False,
            "message" : api_response.REFRESH_TOKEN_REQUIRED,
            "code" : api_response_codes.REFRESH_TOKEN_REQUIRED
        }
    try:
        refreshToken = db.query(RefreshTokens).filter(RefreshTokens.refreshToken == str(data.get('refreshToken')).strip())
    except Exception as errors:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                "status" : False,
                "message" : str(errors) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
        
    if not refreshToken.first():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status" : False,
            'message' : api_response.LOGOUT_FAILED,
            "code" : api_response_codes.LOGOUT_FAILED 
        }
    try:
        refreshToken.delete(synchronize_session=False)
        db.commit()
    except Exception as errors:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                "status" : False,
                "message" : str(errors) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
            'status' : True,
            "message" : api_response.LOGOUT_SUCCESSFUL,
            "code": api_response_codes.LOGOUT_SUCCESSFUL
    }

def changePassword(passwordChange:ChangePasswordSchema,response:Response,db:Session,currentUser:str):
    '''
    API for Changing password
    '''
    data=passwordChange.dict()
    passwordValidationStatus=changePasswordValidation(data,currentUser,db)
    if not passwordValidationStatus.get('status'):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status" : False,
            "message" : passwordValidationStatus.get('message'),
            "code" : passwordValidationStatus.get('code')
        }
    #Get the current User
    try:
        isExistsUser=db.query(exists().where(Customer.id ==currentUser)).scalar()
        if isExistsUser:
            #for customer 
            user = db.query(Customer.password,Customer.rawPassword).filter(Customer.id == currentUser).first()
        else:
           #for beautician 
           user = db.query(Beautician.password,Beautician.rawPassword).filter(Beautician.id == currentUser).first()

        user.password=bcrypt.hash(data.get('password'))
        user.rawPassword = str(data.get('password'))
        db.commit()

    except Exception as error:
         #if debug is allowed send the exact error, else don't send exact error, will be a security breach
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
                'status' : False,
                'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                'code' : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
            "status" : True,
            "message" : api_response.PASSWORD_SUCCESSFULLY_CHANGED,
            "code": api_response_codes.PASSWORD_SUCCESSFULLY_CHANGED_CODE
    }

    
def generatePassword(request:Request,response:Response):
    '''
    API FOR GENERATING RANDOM PASSWORD 
    '''
    try:
        randPassword = createPassword()      
        return {
            'status' : True,
            'message' : api_response.PASSWORD_GENERATED_SUCCESSFULLY,
            "code" : api_response_codes.PASSWORD_SUCCESSFULLY_GENERATED,
            "data": {
                "password": randPassword
            } 
        }
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
        'status' : False,
        'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
        "code" : api_response_codes.INTERNAL_SERVER_ERROR,
        }
    
def listCustomerUserApi(currentUser:str,listUserData:userListSchema,response:Response,db:Session,limit:Optional[int] = None,page:Optional[int] = None):
    '''
    API FOR LISTING USER 
    '''
    data=listUserData.dict()
    listUser=[]
    #sortingOrder is mandatory
    if not data.get('sortingOrder') or len(str(data.get('sortingOrder')).strip()) == 0:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            'status' : False,
            'message' : api_response.SORTING_ORDER_REQUIRED,
            "code" : api_response_codes.SORTING_ORDER_REQUIRED
        }
    else:
        #sorting can be either ascending or descending
        sortingPossibilities = ['asc','dsc']
        if not str(data.get('sortingOrder')).strip().lower() in sortingPossibilities:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {
                'status' : True,
                'message' : api_response.INVALID_SORTING_ORDER,
                "code" : api_response_codes.INVALID_SORTING_ORDER
            }
    if limit is not None and page is not None:
        skip = (page - 1) * limit
    else:
        skip = None
    try:
        customerUserQuery = db.query(Customer)
        # Apply search filter if provided
        if data.get('search') and data.get('searchValue'):
            searchValue = str(data.get('searchValue')).strip().lower()
            customerUserQuery = customerUserQuery.filter(
                (Customer.name.ilike(f"%{searchValue}%")) | 
                (Customer.email.ilike(f"%{searchValue}%")) |
                (Customer.mobileNo.ilike(f"%{searchValue}%"))
            )
         # Sorting the query
        if data.get('sortingOrder').lower() == 'asc':
            customerUserQuery = customerUserQuery.order_by(asc(Customer.updatedAt))
        else:
            customerUserQuery = customerUserQuery.order_by(desc(Customer.updatedAt))
        
        # Apply pagination
        if limit is not None:
            customerUserQuery = customerUserQuery.offset(skip).limit(limit)
        # Execute query
        ListOfUserData = customerUserQuery.all()
        for user in ListOfUserData:
            dic={}
            dic['id'] =user.id 
            dic['name'] =user.name
            dic['email'] =user.email 
            dic['mobileNo'] =user.mobileNo 
            dic['userType'] =user.userType 
            dic['createdAt'] =user.createdAt
            dic['updatedAt'] =user.updatedAt
            listUser.append(dic)

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
        'status' : False,
        'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
        "code" : api_response_codes.INTERNAL_SERVER_ERROR,
        }
    
    return{
        'status' : True,
        'message' : api_response.USER_LIST_SUCCESSFULLY,
        "code" : api_response_codes.USER_LIST_SUCCESSFULLY,
        "data": listUser
    }

def listBeauticiansUserApi(currentUser:str,listUserData:userListSchema,response:Response,db:Session,limit:Optional[int] = None,page:Optional[int] = None):
    '''
    API FOR LISTING USER 
    '''
    data=listUserData.dict()
    listUser=[]
    #sortingOrder is mandatory
    if not data.get('sortingOrder') or len(str(data.get('sortingOrder')).strip()) == 0:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            'status' : False,
            'message' : api_response.SORTING_ORDER_REQUIRED,
            "code" : api_response_codes.SORTING_ORDER_REQUIRED
        }
    else:
        #sorting can be either ascending or descending
        sortingPossibilities = ['asc','dsc']
        if not str(data.get('sortingOrder')).strip().lower() in sortingPossibilities:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {
                'status' : True,
                'message' : api_response.INVALID_SORTING_ORDER,
                "code" : api_response_codes.INVALID_SORTING_ORDER
            }
    if limit is not None and page is not None:
        skip = (page - 1) * limit
    else:
        skip = None
    try:
        beauticianUserQuery = db.query(Beautician)
        # Apply search filter if provided
        if data.get('search') and data.get('searchValue'):
            searchValue = str(data.get('searchValue')).strip().lower()
            beauticianUserQuery = beauticianUserQuery.filter(
                (Beautician.name.ilike(f"%{searchValue}%")) | 
                (Beautician.email.ilike(f"%{searchValue}%")) |
                (Beautician.specialization.ilike(f"%{searchValue}%")) |
                (Beautician.experience.ilike(f"%{searchValue}%")) |
                (Beautician.mobileNo.ilike(f"%{searchValue}%"))
            )
         # Sorting the query
        if data.get('sortingOrder').lower() == 'asc':
            beauticianUserQuery = beauticianUserQuery.order_by(asc(Beautician.updatedAt))
        else:
            beauticianUserQuery = beauticianUserQuery.order_by(desc(Beautician.updatedAt))
        
        # Apply pagination
        if limit is not None:
            beauticianUserQuery = beauticianUserQuery.offset(skip).limit(limit)
        # Execute query
        ListOfUserData = beauticianUserQuery.all()
        for user in ListOfUserData:
            dic={}
            dic['id'] =user.id 
            dic['name'] =user.name
            dic['email'] =user.email 
            dic['aadhaarNo'] =user.aadhaarNo
            dic['userLoginId'] =user.userLoginId
            dic['specialization'] =user.specialization
            dic['experience'] =user.experience
            dic['rating'] =user.rating if user.rating else str(0)
            dic['mobileNo'] =user.mobileNo 
            dic['userType'] =user.userType 
            dic['createdAt'] =user.createdAt
            dic['updatedAt'] =user.updatedAt
            listUser.append(dic)

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
        'status' : False,
        'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
        "code" : api_response_codes.INTERNAL_SERVER_ERROR,
        }
    
    return{
        'status' : True,
        'message' : api_response.USER_LIST_SUCCESSFULLY,
        "code" : api_response_codes.USER_LIST_SUCCESSFULLY,
        "data": listUser
    }

def deleteCustomerUsersApi(deleteUsers:UsersDeleteSchema,response:Response,db:Session,currentUser:str):
    '''
    API FOR DELETING USER 
    '''
    data=deleteUsers.dict()
    try:
        validateResult=validateCustomerUserId(data,db)
        if not validateResult.get('status'):
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : validateResult.get('message'),
                "code" : validateResult.get('code')
            }
        customerId=data.get('userId')
        db.query(Customer).filter(Customer.id==customerId).delete()
        db.commit()
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
        'status' : False,
        'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
        "code" : api_response_codes.INTERNAL_SERVER_ERROR,
        }
    
    return {
        "status" :True,
        "message" : api_response.USER_DELETED_SUCCESSFULLY,
        "code" : api_response_codes.USER_DELETED_SUCCESSFULLY
    }
def deletelistBeauticiansUsersApi(deleteUsers:UsersDeleteSchema,response:Response,db:Session,currentUser:str):
    '''
    API FOR DELETING USER 
    '''
    data=deleteUsers.dict()
    try:
        validateResult=validateBeauticiansUserId(data,db)
        if not validateResult.get('status'):
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {
                "status" : False,
                "message" : validateResult.get('message'),
                "code" : validateResult.get('code')
            }
        beauticianId=data.get('userId')
        db.query(Beautician).filter(Beautician.id==beauticianId).delete()
        db.commit()
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            'status' : False,
            'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            "code" : api_response_codes.INTERNAL_SERVER_ERROR,
           }
    
    return {
        "status" :True,
        "message" : api_response.USER_DELETED_SUCCESSFULLY,
        "code" : api_response_codes.USER_DELETED_SUCCESSFULLY
    }
    
