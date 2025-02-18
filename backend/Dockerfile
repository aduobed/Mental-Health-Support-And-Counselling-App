# Use an official python runtime as a parent image
FROM python:3.13-slim

#Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in the requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory files into the container  at /app
COPY . .

# Make port 80 available to the outside world outside this container
EXPOSE 80

# Run uvicorn when the container starts
CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" ]