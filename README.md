# Workout Tracker

Hey there! I'm Gyan, a recent BSc Biotechnology student trying to improve my skills in programming using JavaScript and Python. As a fitness enthusiast, I've always found it challenging to effectively track and organize my workouts. That's why I took on the task of creating a Workout Tracker as a personal project and to improve my programming skills.

The goal of this Workout Tracker is to simplify the process of recording and monitoring workout sessions. Combining my programming skills with my passion for fitness, I embarked on this project to develop an application that would help me easily keep track of my workouts in a efficient way.

Possible components to add:
BMI tracker
Weight tracker, big 3 lifts trackers (with graphs)
Page to show recommended workouts based on muscle groups (or something else?)

Now, let's dive into setting up the Workout Tracker! We have two components to set up separately: the backend and the frontend. Don't worry—I'll guide you through the steps for each one. Let's get started!

## Backend Setup

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

## Frontend Setup

To set up the local development environment for the frontend, follow these steps:

1. **Navigate** to the `workout/frontend` directory.

2. Run the following command in a terminal:

   ```shell
   npm install 
   npm start
   ```

   This will **install** the necessary dependencies and **start** the development server.