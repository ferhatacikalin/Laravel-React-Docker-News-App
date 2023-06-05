## News Aggregator Website
This project is a news aggregator website with user authentication, article search and filtering, personalized news feed, mobile-responsive design, built using Laravel and React.js, and Dockerized for easy deployment.

![e](https://github.com/ferhatacikalin/Laravel-React-Docker-News-App/assets/8081807/82a56553-52f0-4db2-80a4-ab6662f32dac)

<img width="1705" alt="Screenshot 2023-06-05 at 23 10 13" src="https://github.com/ferhatacikalin/Laravel-React-Docker-News-App/assets/8081807/c084b1bf-aeac-4ca3-9659-0bc1885f14c1">

<img width="1705" alt="Screenshot 2023-06-05 at 23 11 35" src="https://github.com/ferhatacikalin/Laravel-React-Docker-News-App/assets/8081807/d4391d4c-3a46-4f09-8839-e6dd87f0f4f7">

<img width="1705" alt="Screenshot 2023-06-05 at 22 47 58" src="https://github.com/ferhatacikalin/Laravel-React-Docker-News-App/assets/8081807/f265441a-5cf3-4133-9f5c-4dc80dea7f07">

## Usage
1. **Install Docker:**  Make sure you have Docker installed on your machine. You can download and install Docker from the [official website](https://www.docker.com/get-started) . 
2. **Clone the repository:**  Clone the repository to your local machine by running the following command:

```bash

git clone <repository_url>
```



Replace `<repository_url>` with the actual URL of the repository. 

3. Create a `.env` file by copying the provided `.env.example` file. Use the following command:

```bash

cp .env.example .env
``` 
4. **Update the environment variables:**  Open the `.env` file and update the required fields with the appropriate values. 
5. **Run the initialization script:**  Navigate to the project's root directory and run the `init.sh` script. Or you can run the commands step by step. Each command has a description inside script. Use the following command:

```bash

./init.sh
```



This script will handle the necessary setup steps, such as installing dependencies and starting the Docker containers. 

6. **Access the project:**  After the initialization process is complete, you should be able to access the project by opening a web browser and visiting the provided URL (usually `http://localhost`, depending on the configuration).

## News Sources
Three news sources were utilized in the project: News API, Guardian API, and New York Times API. These sources provided access to a wide range of up-to-date news articles across various categories.

## Project Structure
A cron job is a scheduled task that runs daily and fetches news from specific sources, storing them in a database. It then displays the news to the user based on their interests. You can find this command in the "console/commands" folder. The classes that combine the news sources can be accessed in the "App\News" folder. This application uses Laravel as the backend framework and React as the frontend framework, with Vite used as the asset bundling tool.

## Dockerization
The provided Docker Compose file defines a basic configuration for an application stack. It includes services for a web server (Nginx), a database (MySQL), a backend (PHP), and a client user interface. The file specifies the container images, container names, restart policies, port mappings, volumes, dependencies, and networks for each service. It allows the different components of the application to work together in a containerized environment.

## Other Laravel Projects
[laravel-react-todo-app](https://github.com/ferhatacikalin/laravel-react-todo-app)
