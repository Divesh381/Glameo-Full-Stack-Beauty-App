# Pull the official Python slim image
FROM python:3.10.12-slim

# Install PostgreSQL development libraries (needed for psycopg2)
RUN apt-get update && apt-get install -y libpq-dev

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .
COPY .env .env

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Command to run your app (adjust based on your app's entry point)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8004"]