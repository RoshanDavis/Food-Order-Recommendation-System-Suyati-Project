# Use an official Python runtime as the base image
FROM python:3.8

# Set environment variables for Django
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE BE.settings

# Set the working directory in the container
WORKDIR /app/backend/BE

# Copy and install backend dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy all files from the current directory to the container
COPY . .

# Start the backend application
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["python", "BE/manage.py", "runserver", "0.0.0.0:8000"]