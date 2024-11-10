const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
//const walletRouter = require('./walletRoutes');
//const expenseRouter = require('./expenseRoutes');

const ROUTES = {
  users: {
    prefix: "users",
    router: userRouter,
  },
};

// Register all routes
Object.entries(ROUTES).forEach(([name, { prefix, router: routeModule }]) => {
  router.use(`/${prefix}`, routeModule);
});

module.exports = router;
