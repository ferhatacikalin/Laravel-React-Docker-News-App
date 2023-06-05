

## Usage
1. **Install Docker:**  Make sure you have Docker installed on your machine. You can download and install Docker from the [official website](https://www.docker.com/get-started) . 
2. **Clone the repository:**  Clone the repository to your local machine by running the following command:

```bash

git clone <repository_url>
```



Replace `<repository_url>` with the actual URL of the repository. 
3. ** file:**  Create a `.env` file by copying the provided `.env.example` file. Use the following command:

```bash

cp .env.example .env
``` 
4. **Update the environment variables:**  Open the `.env` file and update the required fields with the appropriate values. 
5. **Run the initialization script:**  Navigate to the project's root directory and run the `init.sh` script. Or you can run the commands step by step. Use the following command:

```bash

./init.sh
```



This script will handle the necessary setup steps, such as installing dependencies and starting the Docker containers. 

6. **Access the project:**  After the initialization process is complete, you should be able to access the project by opening a web browser and visiting the provided URL (usually `http://localhost`, depending on the configuration).

