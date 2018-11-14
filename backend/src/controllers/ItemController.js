class ItemController {
  index(req, res) {
    let app = req.app;
    let item = new app.models.Item(app.database.connection(), req.user_id);

    item
      .all()
      .then(result => {
        res.status(201).json({
          count: result.length,
          data: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Ocorreu um erro ao exibir os itens! | ${err}`
        });
      });
  }
  store(req, res) {
    if (!req.body.name) {
      res.status(500).json({ message: "Preencha os dados corretamente!" });
    }

    let app = req.app;
    let item = new app.models.Item(app.database.connection(), req.user_id);
    item.setName(req.body.name);
    item.setDescription(req.body.description);
    item.setPrice(req.body.price);
    item.setPurchased(0);
    item.setPicture(req.file.path);

    item
      .store()
      .then(result => {
        let itemInsert = item.get();
        app.get("io").emit("list-refresh", true);
        res.status(201).json({
          message: "Novo item cadastrado com sucesso!",
          data: itemInsert
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Ocorreu um erro ao criar o novo item! | ${err}`
        });
      });
  }
  show(req, res) {
    let app = req.app;
    let item = new app.models.Item(app.database.connection(), req.user_id);

    let id = req.params.id;

    item
      .find(id)
      .then(result => {
        if (result.length > 0) {
          res.status(201).json({
            data: result
          });
        } else {
          res.status(500).json({
            message: `Não foi possível retornar o item ${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: `Ocorreu um erro ao retornar o item ${id}! | ${err}`
        });
      });
  }
  update(req, res) {
    if (!req.body.name) {
      res.status(500).json({ message: "Preencha os dados corretamente!" });
    }

    let app = req.app;
    let item = new app.models.Item(app.database.connection(), req.user_id);
    item.setName(req.body.name);
    item.setDescription(req.body.description);
    item.setPrice(req.body.price);
    item.setPurchased(req.body.purchased);
    item.setPurchaseDate(req.body.purchase_date);
    item.setPicture(req.file.path);

    item
      .update(req.params.id)
      .then(result => {
        let itemUpdate = item.get();
        app.get("io").emit("list-refresh", true);
        res.status(201).json({
          message: "Item atualizado com sucesso!",
          data: itemUpdate
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Ocorreu um erro ao atualizar o item! | ${err}`
        });
      });
  }
  destroy(req, res) {
    let app = req.app;
    let item = new app.models.Item(app.database.connection(), req.user_id);

    let id = req.params.id;

    item
      .delete(id)
      .then(result => {
        if (result > 0) {
          app.get("io").emit("list-refresh", true);
          res.status(201).json({
            status: true
          });
        } else {
          res.status(500).json({
            status: false,
            message: `Não foi possível retornar o item ${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: false,
          message: `Ocorreu um erro ao retornar o item ${id}! | ${err}`
        });
      });
  }
}

module.exports = function(app) {
  return ItemController;
};
