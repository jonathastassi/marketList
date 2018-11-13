module.exports = app => {
  const UserController = new app.controllers.UserController();
  app.group("/api/v1", router => {
    router.group("/user", router => {
      router.post("/register", UserController.register);
      router.post("/login", UserController.login);
    });
  });
};
