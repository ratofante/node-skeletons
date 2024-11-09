# Node Skeleton v1

This is a basic Node.js skeleton project using Express, Sequelize, and MySQL.

## Dependencies

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**

## Configuration

- Database configuration is stored in `config/config.js`.
- Environment variables are used to store sensitive data, such as database credentials.

## Project Structure

- **app.js**: Main application file.
- **models**: Database models defined using Sequelize.
- **migrations**: Database migrations defined using Sequelize.
- **seeders**: Sample data for seeding the database.
- **utils**: Utility functions for hashing passwords and other tasks.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with environment variables for database credentials and other sensitive data.
4. Run the application using `npm start`.

## Database Setup

1. Create a MySQL database with the credentials specified in `config/config.js`.
2. Run the migrations using `sequelize db:migrate`.
3. Seed the database with sample data using `sequelize db:seed:all`.

## API Endpoints

- **TBD**
