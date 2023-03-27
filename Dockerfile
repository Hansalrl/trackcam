# Set the base image to the official Python image
FROM python:3.8-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the default port for the application
EXPOSE 8000

# Set the command to start the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
