# Workout Tracker
Welcome to my workout tracker! This is a personal project designed to help you track and organize your workouts effectively. It combines my love for health and programming skills to create an application that simplifies the process of recording and monitoring any workout sessions. Whether you're a fitness enthusiast or just starting your fitness journey, the Workout Tracker is here to assist you.

## Features
The Workout Tracker offers several key features to help manage fitness routines:

1. Workout Logging: Track and record your workout sessions effortlessly with the Workout Logger. Choose from a vast library of 1300+ exercises, including a wide range of exercises for different muscle groups. Log your sets, reps, and weights used to keep a detailed record of your progress. Stay motivated by seeing your improvements over time and celebrate your fitness achievements.

2. Custom Weight Selection: Personalize your experience by selecting your preferred weight measurement system. Whether you prefer kilograms or pounds, the Workout Tracker allows you to seamlessly switch between the two, ensuring your workouts are tailored to your specific needs.

3. Visual Exercises: Get a comprehensive understanding of each exercise with the help of visual cues. Every exercise in the Workout Tracker is accompanied by a standard how-to-perform video, ensuring that even new users can confidently execute the exercises correctly. Watch the videos to learn proper form and technique, maximizing the effectiveness and safety of your workouts.


## Technologies Used
The Workout Tracker utilizes the following technologies:

- **Backend**: Python with Django framework for server-side development.
- **Frontend**: JavaScript with React framework for building the user interface.
- **Database**: SQLite for local development, with the flexibility to use other databases supported by Django (such as PostgreSQL or MySQL) for production environments.

## Future Enhancements
The Workout Tracker is an ongoing project with potential enhancements in the future. Some possible features to consider for future development include:

*BMI Tracker*: Track your body mass index (BMI) to monitor changes in your body composition. The BMI calculator provides an estimate of your overall body fat based on your height and weight.

*Weight Tracker*: Monitor your weight fluctuations and visualize your progress over time. Use the weight tracker to set goals and stay on top of your weight management journey.

*Big 3 Lifts Trackers*: Keep a detailed record of your performance in the three fundamental strength exercises: squat, bench press, and deadlift. Track your personal bests, analyze your progress, and identify areas for improvement.

*Recommended Workouts*: Get suggestions for workouts based on specific muscle groups or other criteria. Discover new exercises and training routines tailored to your fitness goals.

*Mobile Application**: Develop a mobile version of the Workout Tracker to provide seamless access to your workout data on the go.


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

2. Run the

 following command in a terminal:

   ```shell
   npm install 
   npm start
   ```

   This will **install** the necessary dependencies and **start** the development server.