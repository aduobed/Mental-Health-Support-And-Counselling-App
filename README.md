# Mental-Health-Support-And-Counselling-App
A mental health support and counseling application

# Get libraries from pipenv to requirements.txt
``` pipenv requirements --exclude-markers > requirements.txt```

# Backend
docker build -t mhsca-backend .
docker run -d -p 80:80 mhsca-backend

# Frontend
docker build -t mhsca-frontend .
docker run -d -p 3000:80 mhsca-frontend