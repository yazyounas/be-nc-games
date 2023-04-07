# Project Name
### My Game APP

## Prerequisites
Node.js (version X or later)
PostgreSQL (version X or later)

## Installation

1. Clone the repository: git clone https://github.com/your-username/your-repo.git

2. Create a new public GitHub repository. Do not initialise the project with a readme, .gitignore or license.

3. Set the new repository URL as the remote origin: git remote set-url origin YOUR_NEW_REPO_URL_HERE

4. Rename the main branch to "main": git branch -M main

5. Push your code to the new repository: git push -u origin main

6. Install dependencies: npm install

7. Install additional dependencies: npm install express supertest

## Usage

1. Create two .env files: .env.test and .env.development

2. In each file, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names)

3. Run npm install again (don't install specific packages yet)

4. Familiarize yourself with the project structure

5. Export data from each data folder to the index file with the following keys: categoryData, reviewData, userData, commentData

6. To connect to the databases locally, add the necessary environment variables to each .env file.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes: git checkout -b your-branch-name
3. Make your changes and commit them: git commit -m "Your commit message"
4. Push your changes to your fork: git push origin your-branch-name
5. Submit a pull request from your fork to the main repository

## License

This project is licensed under the MIT License.

## Contact
 
 Please contact me if you have any questions or feedback.