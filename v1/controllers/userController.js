const {
  getUsers,
  getUserById,
  createUser,
  UserServiceError,
} = require("../services/userServices");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getUser(req, res) {
    try {
      const user = await getUserById(req.params.id);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
  async createUser(req, res) {
    console.log(req.body);
    try {
      const result = await createUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof UserServiceError) {
        return res.status(error.statusCode).json({
          status: "error",
          type: error.type,
          message: error.message,
          ...(error.errors.length && {
            errors: error.errors,
          }),
        });
      }

      console.error("Unexpected error in createUser:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        message: "An unexpected error occurred",
      });
    }
  }
}

module.exports = new UserController();
