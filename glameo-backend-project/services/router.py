from fastapi import APIRouter,Depends,status,Request,Response
from auth import getCurrentUser
from database import get_db
from sqlalchemy.orm import Session 

servicesRouter = APIRouter(
    prefix='/glameo/services',
    tags=['Customer-Beautician-services']
)
@servicesRouter.post('/create-product',status_code=status.HTTP_201_CREATED)
def createServicesRouter(response:Response,db:Session=Depends(get_db),currentUser:str = Depends(getCurrentUser)):
    '''
    ROUTER TO ADD NEW USERS
    '''
    return True
