const { User } = require("../models/index");

/**
 * Custom error class for user services.
 * @param {string} message - The error message.
 * @param {string} type - The type of error.
 * @param {number} statusCode - The HTTP status code.
 * @param {Array<Object>} [errors] - An array of error objects with "field" and "message" properties.
 *
 */
class UserServiceError extends Error {
  constructor(message, type, statusCode, errors = []) {
    super(message);
    this.name = "UserServiceError";
    this.type = type;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
};

/**
 * Fetches a user by their ID.
 *
 * @param {number} id The user ID.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object with the following properties:
 * - status {string}: The status of the request.
 * - data {Object}: The user data, without the password.
 *
 * @throws {UserServiceError}
 * - If the user ID is invalid.
 * - If the user is not found.
 * - If a database connection error occurs.
 * - If an internal server error occurs.
 */
const getUserById = async (id) => {
  if (!id || typeof id !== "string" || isNaN(parseInt(id))) {
    throw new UserServiceError("Invalid user ID", "INVALID_INPUT_ERROR", 400, {
      message: "User ID must be a number",
    });
  }

  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
        include: ["name", "username", "email", "createdAt"],
      },
    });

    if (!user) {
      throw new UserServiceError(
        "User not found",
        "RESOURCE_NOT_FOUND_ERROR",
        404,
        {
          message: `User with id ${id} not found`,
        }
      );
    }

    return {
      status: "sucess",
      data: user,
    };
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);

    if (error instanceof UserServiceError) {
      throw error;
    }

    // Handle specific Sequelize errors
    if (error.name === "SequelizeConnectionError") {
      throw new UserServiceError(
        "Database connection error",
        "DATABASE_ERROR",
        503,
        { message: "Unable to connect to the database" }
      );
    }

    throw new UserServiceError("Internal server error", "SERVER_ERROR", 500, {
      originalError: error,
    });
  }
};

/**
 * Creates a new user.
 *
 * @param {Object} params User data.
 * @param {string} params.name User name.
 * @param {string} params.username Username.
 * @param {string} params.email Email.
 * @param {string} params.password Password.
 *
 * @returns {Promise<Object>} Created user without password.
 *
 * @throws {UserServiceError}
 * - If any of the required fields are missing.
 * - If any of the required fields are invalid.
 * - If the username or email already exists.
 */
const createUser = async (params) => {
  try {
    const requiredFields = ["name", "username", "email", "password"];
    const missingFields = requiredFields.filter((field) => !params[field]);
    if (missingFields.length > 0) {
      throw new UserServiceError(
        "Missing required fields",
        "VALIDATION_ERROR",
        400,
        missingFields.map((field) => ({
          field,
          message: `${field} is required`,
        }))
      );
    }

    const user = await User.create(params);

    const { password, ...userWithoutPassword } = user.get({ plain: true });

    return {
      status: "success",
      data: userWithoutPassword,
    };
  } catch (error) {
    if (error instanceof UserServiceError) {
      throw error;
    }

    if (error.name === "SequelizeValidationError") {
      throw new UserServiceError(
        "Validation error",
        "VALIDATION_ERROR",
        400,
        error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        }))
      );
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new UserServiceError(
        "Duplicate entry",
        "VALIDATION_ERROR",
        400,
        error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        }))
      );
    }

    throw new UserServiceError("Internal server error", "SERVER_ERROR", 500);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  UserServiceError,
};
