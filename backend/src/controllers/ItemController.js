class ItemController {
  index(req, res) {
    // let item = new app.models.Item(app.database.connection(), app.user_id);
    // retornar todos os registros all
  }
  store(req, res) {
    // salva um novo registro store
  }
  show(req, res) {
    // retornar um registro por id find
  }
  update(req, res) {
    // atualiza um registro por id update
  }
  destroy(req, res) {
    // destory um registro por id delete
  }
}

module.exports = function(app) {
  return ItemController;
};
