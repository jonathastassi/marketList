const multer = require("multer");
const path = require("path");

let upload = multer({
  dest: "uploads/",
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  })
});

module.exports = app => {
  const ItemController = new app.controllers.ItemController();
  app.group("/api/v1", router => {
    router.group("/item", router => {
      router.get("/", ItemController.index);
      router.post("/", upload.single("picture"), ItemController.store);
      router.get("/:id", ItemController.show);
      router.put("/:id", upload.single("picture"), ItemController.update);
      router.delete("/:id", ItemController.destroy);
    });
  });
};
