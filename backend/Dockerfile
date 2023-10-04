# Use an official Python runtime as the base image
FROM python:3.8-slim

# Set environment variables
# Ensure Python output is sent straight to terminal without buffering
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /backend

# Install system dependencies
# Update the package list, install essential libraries for the project, 
# clean up to reduce the image size
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    libc-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# Copy requirements file to the working directory, 
# upgrade pip and install project dependencies
COPY requirements.txt /backend/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the current directory contents into the container at /backend
COPY . /backend/

# Run Gunicorn instead of the development server
# Gunicorn is a WSGI HTTP Server for UNIX to serve the application
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
