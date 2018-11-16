class UserController {
  register(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(500).send({ message: "Preencha os dados corretamente!" });
    }

    let app = req.app;
    let user = new app.models.User(app.database.connection());
    user.setName(req.body.name);
    user.setEmail(req.body.email);
    user.setPassword(req.body.password);

    user
      .store()
      .then(result => {
        let userInsert = user.get();
        res.status(201).json({
          message: "Novo usuário criado com sucesso!",
          data: userInsert
        });
      })
      .catch(err => {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(500).send({
            message: `Ocorreu um erro ao criar a conta de usuário! | E-mail já utilizado`
          });
        } else {
          res.status(500).json({
            message: `Ocorreu um erro ao criar a conta de usuário! | ${err}`
          });
        }
      });
  }

  login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(500).json({ message: "Preencha os dados corretamente!" });
    }

    let app = req.app;
    let user = new app.models.User(app.database.connection());
    user.setEmail(req.body.email);
    user.setPassword(req.body.password);

    user
      .login()
      .then(result => {
        const payload = { user: result.data.id };
        const jwt = app.get("jwt");
        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: 60 * 60 * 24
        });

        res.status(201).json({ data: result.data, token: token });
      })
      .catch(err => {
        res.status(500).json({ message: `Não foi possível entrar! | ${err}` });
      });
  }
}

module.exports = function(app) {
  return UserController;
};
