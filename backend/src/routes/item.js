module.exports = app => {
  const ItemController = new app.controllers.ItemController();
  app.group("/api/v1", router => {
    router.group("/item", router => {
      router.get("/", ItemController.index);
      router.post("/", ItemController.store);
      router.get("/:id", ItemController.show);
      router.put("/:id", ItemController.update);
      router.delete("/:id", ItemController.destroy);
    });
  });
};
