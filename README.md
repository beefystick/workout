# Workout App (Backend)

This README provides instructions for setting up and running the backend of the Workout app.

## Local Development

To set up the local development environment for the backend, follow these steps:

1. **Navigate** to the `workout/backend` directory.

2. Create and **activate** a virtual environment:

   - **Mac OS / Linux**
   
     ```shell
     python3 -m venv env
     source env/bin/activate   
     ```
   
   - **Windows**
   
     ```shell
     virtualenv --python=/usr/bin/python3.10 venv 
     venv\Scripts\activate    
     ```

3. Run the following commands in a terminal:

   ```shell
   pip install -r requirements.txt
   python3 manage.py migrate
   python3 manage.py createsuperuser
   python3 manage.py runserver
   ```

   This will **install** the required dependencies, **perform** necessary database migrations, **create** a superuser, and **start** the Django development server.

# Workouts App (Frontend)

This README provides instructions for setting up and running the frontend of the Workouts app.

## Local Development

To set up the local development environment for the frontend, follow these steps:

1. **Navigate** to the `workout/frontend` directory.

2. Run the following command in a terminal:

   ```shell
   npm install 
   npm start
   ```

   This will **install** the necessary dependencies and **start** the development server.