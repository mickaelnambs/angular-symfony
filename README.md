# Angular-Symfony Full-Stack Project

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Docker Compose
- Make
- Git

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mickaelnambs/angular-symfony.git
cd angular-symfony
```

### 2. Backend Setup (Symfony)

Navigate to the backend directory:
```bash
cd backend
```

Install and start the backend project:
```bash
make project-install
```

The API will be accessible at `http://localhost:8080/api`

### 3. Frontend Setup (Angular)

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install and start the frontend project:
```bash
make install
```

The Angular application will be accessible at `http://localhost:4200`

## Login Credentials

### Default Admin User
- **Email**: `admin@admin.fr`
- **Password**: `admin`