# TheBoilerplate

This project serves as a boilerplate for Django projects, set up with Docker, Postgres, and other useful configurations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- [Docker and Docker Compose](https://docs.docker.com/get-docker/) installed on your machine.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/user/TheBoilerplate.git
cd TheBoilerplate
```

### Rename Frontend Environment Sample File

Rename the `frontend/.env-sample` to `frontend/.env` to set up your frontend environment variables.

```bash
cp frontend/.env-sample frontend/.env
```

### Install Frontend Dependencies and Build

Run the following commands from the root directory to install dependencies and build the frontend project.

```bash
(cd frontend && yarn)
(cd frontend && yarn build)
```

### Build and Run Docker Containers

```bash
docker-compose up --build -d
```

### Create Django Database Tables

This will apply all the migrations and create the necessary database schema.

```bash
docker-compose exec backend python manage.py migrate
```

### Load Sample Data

Load the fixture data into the database.

```bash
docker-compose exec backend python manage.py loaddata datadump.json
```

### Create Superuser (Optional)

You might want to create a superuser account.

```bash
docker-compose exec backend python manage.py createsuperuser
```

### Access the Application

Now you can access the application on [http://0.0.0.0:3000](http://0.0.0.0:3000).

### Stop Docker Containers

When done, you can stop the Docker containers.

```bash
docker-compose down
```

---

## URLs

### Site Access

| Role     | URL                        | Credentials                    | Description          |
| -------- | -------------------------- | ------------------------------ | -------------------- |
| Backend  | http://0.0.0.0:8000/admin/ | usr: admin pwd: boilerplate123 | Django Admin Panel   |
| Frontend | http://0.0.0.0:3000        | N/A                            | Frontend Application |

### API Endpoints

| Resource | Language | URL                                  | Description          |
| -------- | -------- | ------------------------------------ | -------------------- |
| Root     | N/A      | http://0.0.0.0:8000/api/             | API Root             |
| Category | N/A      | http://0.0.0.0:8000/api/categories/  | Categories API       |
| Tags     | N/A      | http://0.0.0.0:8000/api/tags/        | Tags API             |
| Images   | N/A      | http://0.0.0.0:8000/api/images/      | Images API           |
| Pages    | English  | http://0.0.0.0:8000/api/en/pages/    | English Pages API    |
| Pages    | Turkish  | http://0.0.0.0:8000/api/tr/pages/    | Turkish Pages API    |
| Posts    | English  | http://0.0.0.0:8000/api/en/posts/    | English Posts API    |
| Posts    | Turkish  | http://0.0.0.0:8000/api/tr/posts/    | Turkish Posts API    |
| Homepage | English  | http://0.0.0.0:8000/api/en/homepage/ | English Homepage API |
| Homepage | Turkish  | http://0.0.0.0:8000/api/tr/homepage/ | Turkish Homepage API |

---

### Additional Resources

For detailed deployment instructions, please refer to the [Deployment Guide](./Deployment-Guide.md).
