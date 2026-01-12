from uuid import UUID


def validateUUID(validId: str) -> bool:
    '''
    Function to validate UUID
    '''
    try:
        UUID(validId.strip())
        return {
            'status': True, 
            'message': "Valid UUID",
            'code': "400"
        }
    except ValueError as error:

        return {
            'status': False,
            'message': str(error),
            'code': "400"
        }