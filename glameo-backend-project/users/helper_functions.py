import re
import sys
from sqlalchemy import exists
from config import settings
from passlib.hash import bcrypt 
from users import api_response,api_response_codes
import random, string
from sqlalchemy.orm import Session 
from .models import Beautician, Customer
from .schema import CreateUserSchema
from utility import validateUUID
from re import fullmatch

def createPassword():
    '''
    regix to validate password
    Password length between 8 and 16 characters
    At least one uppercase letter
    At least one lowercase letter
    At least one digit
    At least one special character (such as !@#$%^&*)
    '''
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"

    while True:
        password = ''.join(random.choices(string.ascii_letters + string.digits + string.punctuation, k=random.randint(8, 16)))
        if re.match(pattern, password):
            return password
        
def validatePassword(password:str):
    '''
    regix to validate password
    Password length between 8 and 16 characters
    At least one uppercase letter
    At least one lowercase letter
    At least one digit
    At least one special character (such as !@#$%^&*)
    '''
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
    return bool(re.match(pattern, password))


def validEmail(email):
    '''
    '''
    # regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$'
    if fullmatch(regex,email):
        return True 
    else:
        return False 


def changePasswordValidation(data:dict,currentUser:str,db:Session):
    '''
    VALIDATING UPDATED PASSWORD
    '''
    #checking if user has provided password or not
    password = data.get('password',None)
    if not password or str(password).isspace() or len(str(password).strip()) == 0:
            return {
                "status" : False,
                "message" : api_response.PASSWORD_NOT_PROVIDED_FOR_UPDATE,
                "code" : api_response_codes.PASSWORD_NOT_PROVIDED_CODE
            }
    try:
        isExistedUser=db.query(exists().where(Customer.id == currentUser)).scalar()
        if isExistedUser:
           #for customer
            user = db.query(Customer.password).filter(Customer.id == currentUser).first()
        else:
           #for beautician 
           user=db.query(Beautician.password).filter(Beautician.id == currentUser).first()
    except Exception as error:
        #if debug is allowed send plan error
            return {
            'status' : False,
            'message' : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
            'code' : api_response_codes.INTERNAL_SERVER_ERROR
        }
    if not user:
        return {
            "status" : False,
            "message" : api_response.USER_NOT_FOUND,
            "code" : api_response_codes.USER_NOT_FOUND_CODE
        }
    
    #check the validation for the password
    validatePasswordResponse = validatePassword(password)
    if not validatePasswordResponse:
        return {
            "status" : False,
            "message" : api_response.PASSWORD_REGIX_ERROR,
            "code" : api_response_codes.PASSWORD_REGIX_ERROR
        }
    #checking if user hass given updated password as the current password
    if bcrypt.verify(str(password).strip(),user.password):
        
        return {
                "status" : False,
                "message" : api_response.UPDATED_PASSWORD_ERROR,
                "code" : api_response_codes.UPDATED_PASSWORD_ERROR_CODE
            }

    return{
            'status':True,
            "message" : api_response.PASSWORD_SUCCESSFULLY_CHANGED,
            "code": api_response_codes.PASSWORD_SUCCESSFULLY_CHANGED_CODE
        }

def validateCustomerUserAddSchema(data:dict,db:Session):
    '''
    VALIDATING CUSTOMER USER ADD SCHEMA
    '''
    validatedData={}
    try:
        if data.get('customerId'):
            customerId=str(data.get('customerId')).strip()
            validateUuidResult=validateUUID(customerId)
            if not validateUuidResult.get('status'):
                return {
                    "status":False,
                    "message":api_response.INVALID_CUSTOMER_ID,
                    "code":api_response_codes.INVALID_CUSTOMER_ID
                }
            customerDetails=db.query(exists().where(Customer.id==customerId)).scalar()
            if not customerDetails:
                return {
                    "status":False,
                    "message":api_response.INVALID_CUSTOMER_ID,
                    "code":api_response_codes.INVALID_CUSTOMER_ID
                }
        validatedData.update(customerId=str(data.get('customerId',None)).strip())
        
        if not data.get("name") or str(data.get('name')).isspace():
            return{
                "status":False,
                "message":api_response.CUSTOMERNAME_IS_REQUIRED,
                "code":api_response_codes.CUSTOMERNAME_IS_REQUIRED
            }
        else:
            name = str(data.get('name')).strip()
            if len(name)>settings.CUSTOMERNAME_MAX_LENGTH_ERROR:
                return{
                    "status":False,
                    "message":api_response.CUSTOMERNAME_MAX_LENGTH_ERROR,
                    "code":api_response_codes.CUSTOMERNAME_MAX_LENGTH_ERROR
                }
            if len(name)<settings.CUSTOMERNAME_MIN_LENGTH_ERROR:
                return {
                    "status":False,
                    "message":api_response.CUSTOMERNAME_MIN_LENGTH_ERROR,
                    "code":api_response_codes.CUSTOMERNAME_MIN_LENGTH_ERROR
                }

        validatedData.update(name=str(data.get('name',None)).strip())
        if not data.get('email') or str(data.get('email')).isspace():
            return{
                "status":False,
                "message":api_response.EMAIL_IS_REQUIRED,
                "code":api_response_codes.EMAIL_IS_REQUIRED
                }
        else:
            email=str(data.get('email')).strip()
            if email:
               if not validEmail(str(data.get('email')).strip()):
                    return {
                        "status" : False,
                        "message" : api_response.EMAIL_NOT_VALID,
                        "code" : api_response_codes.EMAIL_NOT_VALID
                 }
            if not data.get('customerId'):
                isExistsEmail=db.query(exists().where(Customer.email==email)).scalar()
                if isExistsEmail:
                    return {
                        "status":False,
                        "message":api_response.EMAIL_ALREADY_EXISTS,
                        "code":api_response_codes.EMAIL_ALREADY_EXISTS
                        }
            
            
        validatedData.update(email=str(data.get('email',None)).strip())
        
        if data.get('mobileNo'):
            mobileNo = str(data.get('mobileNo')).strip()
            if len(mobileNo)>settings.MOBILE_NO_MAX_LENGTH_ERROR:
                return{
                    "status":False,
                    "message":api_response.MOBILE_NO_MAX_LENGTH_ERROR,
                    "code":api_response_codes.MOBILE_NO_MAX_LENGTH_ERROR
                    }
            if len(mobileNo)<settings.MOBILE_NO_MIN_LENGTH_ERROR:
                return {
                    "status":False,
                    "message":api_response.MOBILE_NO_MIN_LENGTH_ERROR,
                    "code":api_response_codes.MOBILE_NO_MIN_LENGTH_ERROR
                    }
            if not mobileNo.isdigit():
                return {
                    "status":False,
                    "message":api_response.MOBILE_NO_NOT_DIGIT,
                    "code":api_response_codes.MOBILE_NO_NOT_DIGIT
                    }
        validatedData.update(mobileNo=str(data.get('mobileNo',None)).strip())
        if not data.get('password') or str(data.get('password')).isspace():
            return {
                    "status":False,
                    "message":api_response.PASSWORD_NOT_PROVIDED,
                    "code":api_response_codes.PASSWORD_NOT_PROVIDED
                    }
        else:
            password = str(data.get('password')).strip()
            if len(password)>settings.PASSWORD_MAX_LENGTH_ERROR:
                return{
                    "status":False,
                    "message":api_response.PASSWORD_MAX_LENGTH_ERROR,
                    "code":api_response_codes.PASSWORD_MAX_LENGTH_ERROR
                    }
            if len(password)<settings.PASSWORD_MIN_LENGTH_ERROR:
                return {
                    "status":False,
                    "message":api_response.PASSWORD_MIN_LENGTH_ERROR,
                    "code":api_response_codes.PASSWORD_MIN_LENGTH_ERROR
                    }
            #check the validation for the password
            validatePasswordResponse = validatePassword(password)
            if not validatePasswordResponse:
                return {
                    "status" : False,
                    "message" : api_response.PASSWORD_REGIX_ERROR,
                    "code" : api_response_codes.PASSWORD_REGIX_ERROR
                }
           
        validatedData.update(rawPassword=str(data.get('password',None)).strip())
        validatedData.update(password=bcrypt.hash(data.get('password')))
        
 
    except Exception as error:
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
        "status":True,
        "message" :api_response.USER_ADDED_SUCCESSFUL,
        "code" : api_response_codes.USER_ADDED_SUCCESSFUL,
        "data":validatedData
    }
def validateBeauticianUserSchema(data:dict,db:Session):
    '''
    create user for beautician 
    '''
    validatedData = {}
    try:
        if data.get('beauticianId'):
            beauticianId=str(data.get('beauticianId')).strip()
            validateUuidResult=validateUUID(beauticianId)
            if not validateUuidResult.get('status'):
                return {
                    "status":False,
                    "message":api_response.INVALID_BEAUTICIAN_ID,
                    "code":api_response_codes.INVALID_BEAUTICIAN_ID
                }
            beauticianDetails=db.query(exists().where(Beautician.id==beauticianId)).scalar()
            if not beauticianDetails:
                return {
                    "status":False,
                    "message":api_response.INVALID_BEAUTICIAN_ID_DOES_NOT_EXIST,
                    "code":api_response_codes.INVALID_BEAUTICIAN_ID_DOES_NOT_EXIST
                }
        validatedData.update(beauticianId=str(data.get('beauticianId',None)).strip())

        if not data.get("name") or str(data.get('name')).isspace():
            return{
                "status":False,
                "message":api_response.NAME_IS_REQUIRED,
                "code":api_response_codes.NAME_IS_REQUIRED
            }
        else:
            name = str(data.get('name')).strip()
            if len(name)>settings.BEAUTICIAN_NAME_MAX_LENGTH:
                return{
                    "status":False,
                    "message":api_response.BEAUTICIAN_NAME_MAX_LENGTH_ERROR,
                    "code":api_response_codes.BEAUTICIAN_NAME_MAX_LENGTH_ERROR
                }
            if len(name)<settings.BEAUTICIAN_NAME_MIN_LENGTH:
                return {
                    "status":False,
                    "message":api_response.BEAUTICIAN_NAME_MIN_LENGTH_ERROR,
                    "code":api_response_codes.BEAUTICIAN_NAME_MIN_LENGTH_ERROR
                }
        validatedData.update(name=str(data.get('name',"")).strip())
        
        if not data.get("userLoginId") or str(data.get('userLoginId')).isspace():
            return {
                "status":False,
                "message":api_response.USER_ID_NAME_NOT_PROVIDED,
                "code":api_response_codes.USER_ID_NAME_NOT_PROVIDED
                }
        else:
            userLoginId=str(data.get('userLoginId')).strip()
            if len(userLoginId)>settings.USER_ID_NAME_MAX_LENGTH:
                return{
                    "status":False,
                    "message":api_response.USER_ID_NAME_MAX_LENGTH_ERROR,
                    "code":api_response_codes.USER_ID_NAME_MAX_LENGTH_ERROR
                    }
            if len(userLoginId)<settings.USER_ID_NAME_MIN_LENGTH:
                return {
                    "status":False,
                    "message":api_response.USER_ID_NAME_MIN_LENGTH_ERROR,
                    "code":api_response_codes.USER_ID_NAME_MIN_LENGTH_ERROR
                    }
        validatedData.update(userLoginId=str(data.get('userLoginId')).strip())
            
        if not data.get('email') or str(data.get('email')).isspace():
            return{
                "status":False,
                "message":api_response.EMAIL_IS_REQUIRED,
                "code":api_response_codes.EMAIL_IS_REQUIRED
                }
        else:
            email=str(data.get('email')).strip()
            if email:
               if not validEmail(str(data.get('email')).strip()):
                    return {
                        "status" : False,
                        "message" : api_response.EMAIL_NOT_VALID,
                        "code" : api_response_codes.EMAIL_NOT_VALID
                     }
            if not data.get('beauticianId'):
                isExistsEmail=db.query(exists().where(Beautician.email==email)).scalar()
                if isExistsEmail:
                    return {
                        "status":False,
                        "message":api_response.EMAIL_ALREADY_EXISTS,
                        "code":api_response_codes.EMAIL_ALREADY_EXISTS
                        }
        validatedData.update(email=str(data.get('email',"")).strip())

        if data.get('mobileNo'):
            mobileNo = str(data.get('mobileNo')).strip()
            if len(mobileNo)>settings.MOBILE_NO_MAX_LENGTH_ERROR:
                return{
                    "status":False,
                    "message":api_response.MOBILE_NO_MAX_LENGTH_ERROR,
                    "code":api_response_codes.MOBILE_NO_MAX_LENGTH_ERROR
                    }
            if len(mobileNo)<settings.MOBILE_NO_MIN_LENGTH_ERROR:
                return {
                    "status":False,
                    "message":api_response.MOBILE_NO_MIN_LENGTH_ERROR,
                    "code":api_response_codes.MOBILE_NO_MIN_LENGTH_ERROR
                    }
            if not mobileNo.isdigit():
                return {
                    "status":False,
                    "message":api_response.MOBILE_NO_NOT_DIGIT,
                    "code":api_response_codes.MOBILE_NO_NOT_DIGIT
                    }
        validatedData.update(mobileNo=str(data.get('mobileNo',None)).strip())
        if not data.get('password') or str(data.get('password')).isspace():
            return {
                    "status":False,
                    "message":api_response.PASSWORD_NOT_PROVIDED,
                    "code":api_response_codes.PASSWORD_NOT_PROVIDED
                    }
        else:
            password = str(data.get('password')).strip()
            if len(password)>settings.PASSWORD_MAX_LENGTH_ERROR:
                return{
                    "status":False,
                    "message":api_response.PASSWORD_MAX_LENGTH_ERROR,
                    "code":api_response_codes.PASSWORD_MAX_LENGTH_ERROR
                    }
            if len(password)<settings.PASSWORD_MIN_LENGTH_ERROR:
                return {
                    "status":False,
                    "message":api_response.PASSWORD_MIN_LENGTH_ERROR,
                    "code":api_response_codes.PASSWORD_MIN_LENGTH_ERROR
                    }
            #check the validation for the password
            validatePasswordResponse = validatePassword(password)
            if not validatePasswordResponse:
                return {
                    "status" : False,
                    "message" : api_response.PASSWORD_REGIX_ERROR,
                    "code" : api_response_codes.PASSWORD_REGIX_ERROR
                }
        validatedData.update(rawPassword=str(data.get('password',"")).strip())
        validatedData.update(password=bcrypt.hash(data.get('password')))
            
        if not data.get("aadhaarNo") or str(data.get('aadhaarNo')).isspace():
            return {
                "status":False,
                "message":api_response.AADHAAR_NOT_PROVIDED,
                "code":api_response_codes.AADHAAR_NOT_PROVIDED
            }
        else:
            aadhaarNo=str(data.get('aadhaarNo')).strip()
        validatedData.update(aadhaarNo=str(data.get('aadhaarNo')).strip())

        if not data.get("specialization") or str(data.get('specialization')).isspace():
            return {
                "status":False,
                "message":api_response.SPECIALIZATION_NOT_PROVIDED,
                "code":api_response_codes.SPECIALIZATION_NOT_PROVIDED
            }
        else:
            specialization=str(data.get('specialization')).strip()
        validatedData.update(specialization=str(data.get('specialization')).strip())

        if not data.get("experience") or str(data.get('experience')).isspace():
            return {
                "status":False,
                "message":api_response.EXPERIENCE_NOT_PROVIDED,
                "code":api_response_codes.EXPERIENCE_NOT_PROVIDED
            }
        else:
            experience=str(data.get('experience')).strip()
        validatedData.update(experience=str(data.get('experience')).strip())


    except Exception as error:
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
        "status":True,
        "message" :api_response.USER_ADDED_SUCCESSFUL,
        "code" : api_response_codes.USER_ADDED_SUCCESSFUL,
        "data":validatedData
    }


def validateLoginCustomerAndBeauticiansData(data:dict,db:Session):
    '''
    validate for customer and Beauticians
    '''
    validateData={}
    try:
        isUserIdIsEmail:bool = False
        # assigning userId to a variable
        userLoginId:str = (data.get('userLoginId',None))
        # checking userId
        if not userLoginId or userLoginId.isspace():
            return {
                "status" : False,
                "message" : api_response.LOGIN_ID_OR_EMAIL_ID_NOT_PROVIDED,
                "code" : api_response_codes.LOGIN_ID_OR_EMAIL_ID_NOT_PROVIDED
            }
        if validEmail(userLoginId.strip()):
            # checking whether userId is email or not
            isUserIdIsEmail=True

            #### assigning password to a variable
        password:str = (data.get('password',None))
        ## checking password
        if not password or password.isspace():
            return {
                "status" : False,
                "message" : api_response.PASSWORD_NOT_PROVIDED_FOR_LOGIN,
                "code" : api_response_codes.PASSWORD_NOT_PROVIDED_FOR_LOGIN
            }
        ##making communication with database, so keeping code inside try-except
        try:
            if isUserIdIsEmail:
                # checking with emailId
                userData = db.query(Customer).filter(Customer.email==userLoginId.lower()) 
            else:
                # checking with loginId
                userData = db.query(Beautician).filter(Beautician.userLoginId == userLoginId)
        except Exception as errors:
            print(f'Error occured in validating image data: {errors} | line: {sys.exc_info()[2].tb_lineno}')
            return {
                "status" : False,
                "message" : str(errors) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
        if not userData.first():
            return {
                "status" : False,
                "message" : api_response.INVALID_CREDENTIALS,
                "code" : api_response_codes.INVALID_CREDENTIALS
            }
        
        if not bcrypt.verify(password,userData.first().password):
            return {
                "status" : False,
                "message" : api_response.INVALID_CREDENTIALS,
                "code" : api_response_codes.INVALID_CREDENTIALS
            }
        
    except Exception as error:
        print(f'Error occured in validating image data: {error} | line: {sys.exc_info()[2].tb_lineno}')
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    try:
        userType=userData.first().userType
        userId=userData.first().id

        validateData.update(userType=userType)
        validateData.update(userId=userId)

    except Exception as errror:
        print(f'Error occured in validating image data: {error} | line: {sys.exc_info()[2].tb_lineno}')
        pass

    return {
        "status" : True ,
        "message" : api_response.LOGIN_SUCCESSFUL,
        "code":api_response_codes.LOGIN_SUCCESSFUL,
        "userData":userData,
        "data" : validateData

    }
def validateBeauticiansUserId(data:dict,db:Session):
    '''
    This function is used to validate beautician user id
    '''
    try:
        beauticianId=data.get('userId')
        if not beauticianId or str(beauticianId).strip():
            return {
                "status" : False,
                "message" : api_response.USER_ID_IS_REQUIRED,
                "code" : api_response_codes.USER_ID_IS_REQUIRED
                }
        else:
           beauticianData=db.query(exists().where(Beautician.id==beauticianId)).scalar()
           if not beauticianData:
               return {
                   "status" : False,
                   "message" : api_response.USER_ID_DOES_NOT_EXIST,
                   "code" : api_response_codes.USER_ID_DOES_NOT_EXIST
                   }
           
    except Exception as error:
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
        "status" : True,
        "message" : api_response.VALIDATE_SUCCESSFUL,
        "code" : api_response_codes.VALIDATE_SUCCESSFUL
        }

def validateCustomerUserId(data:dict,db:Session):
    '''
    This function is used to validate beautician user id
    '''
    try:
        customerId=data.get('userId')
        if not customerId or str(customerId).strip():
            return {
                "status" : False,
                "message" : api_response.USER_ID_IS_REQUIRED,
                "code" : api_response_codes.USER_ID_IS_REQUIRED
                }
        else:
           customerData=db.query(exists().where(Customer.id==customerId)).scalar()
           if not customerData:
               return {
                   "status" : False,
                   "message" : api_response.USER_ID_DOES_NOT_EXIST,
                   "code" : api_response_codes.USER_ID_DOES_NOT_EXIST
                   }
           
    except Exception as error:
        return {
                "status" : False,
                "message" : str(error) if settings.DEBUG else api_response.INTERNAL_SERVER_ERROR,
                "code" : api_response_codes.INTERNAL_SERVER_ERROR
            }
    
    return {
        "status" : True,
        "message" : api_response.VALIDATE_SUCCESSFUL,
        "code" : api_response_codes.VALIDATE_SUCCESSFUL
        }