from sqlalchemy import Column, DateTime, ForeignKey, String, func
from database import Base
from sqlalchemy.dialects.postgresql import UUID
from uuid import  uuid4
from sqlalchemy.orm import relationship


class Beautician(Base):
    __tablename__ = "beauticiansTable"

    id = Column(UUID(as_uuid=True),primary_key=True,index=True,default=uuid4,nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    userLoginId = Column(String, nullable=True)
    mobileNo = Column(String, unique=True, index=True, nullable=True)
    aadhaarNo = Column(String, unique=True, index=True, nullable=False)
    rawPassword = Column(String, nullable=True)
    password = Column(String, nullable=False)
    userType = Column(String, nullable=False)
    specialization = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    rating = Column(String, nullable=True)
    otp = Column(String, nullable=True)
    otpEdxpiresAt =  Column(DateTime(timezone=True), nullable=True)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship with addresses (One-to-Many)
    addresses = relationship("Address", back_populates="beautician", cascade="all, delete-orphan")
    # services = relationship("BeauticianService", back_populates="beautician", cascade="all, delete-orphan")



class Customer(Base):
    __tablename__ = "customersTables"
    
    id = Column(UUID(as_uuid=True),primary_key=True,index=True,default=uuid4,nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    password = Column(String, nullable=True)
    rawPassword = Column(String, nullable=True)
    mobileNo = Column(String, unique=True, index=True, nullable=True)
    userType = Column(String, nullable=False)
    otp = Column(String, nullable=True)
    otpExpiresAt =  Column(DateTime(timezone=True), nullable=True)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship with addresses (One-to-Many)
    addresses = relationship("Address", back_populates="customer", cascade="all, delete-orphan")


class Address(Base):
    __tablename__ = "addressesTables"

    id = Column(UUID(as_uuid=True),primary_key=True,index=True,default=uuid4,nullable=False)
    userId = Column(UUID, nullable=False)  
    customerId = Column(UUID(as_uuid=True), ForeignKey("customersTables.id", ondelete="CASCADE"), nullable=True)
    beauticianId = Column(UUID(as_uuid=True), ForeignKey("beauticiansTable.id", ondelete="CASCADE"), nullable=True)
    flatNo = Column(String, nullable=True)
    apartmentName = Column(String, nullable=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    pinCode = Column(String, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    customer = relationship("Customer", back_populates="addresses")
    beautician = relationship("Beautician", back_populates="addresses")


class RefreshTokens(Base):
    '''
    table for storing Refresh Token
    '''
    __tablename__ = "RefreshTokenTable"
    tokenId = Column(UUID(as_uuid=True),primary_key=True,nullable=False,index=True,default=uuid4)
    refreshToken = Column(String,nullable=False)
