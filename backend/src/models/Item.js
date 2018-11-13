class Item {
  constructor(conn, user_id) {
    this._conn = conn;
    this._user_id = user_id;
  }

  get() {
    return {
      id: this.id,
      user_id: this._user_id,
      name: this.name,
      description: this.description,
      price: this.price,
      purchased: this.purchased,
      purchase_date: this.purchase_date,
      picture: this.picture
    };
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
  }

  getPrice() {
    return this.price;
  }
  setPrice(price) {
    this.price = price;
  }

  getPurchased() {
    return this.purchased;
  }
  setPurchased(purchased) {
    this.purchased = purchased;
  }

  getPurchaseDate() {
    return this.purchase_date;
  }
  setPurchaseDate(purchase_date) {
    this.purchase_date = purchase_date;
  }

  getPicture() {
    return this.picture;
  }
  setPicture(picture) {
    this.picture = picture;
  }

  fill(i) {
    (this.id = i.id),
      (this.name = i.name),
      (this.price = i.price),
      (this.description = i.description),
      (this.purchased = i.purchased),
      (this.purchase_date = i.purchase_date),
      (this.picture = i.picture);
  }

  all() {}

  store() {}

  find(id) {}

  update(id) {}

  delete() {}

  //   store() {
  //     let self = this;
  //     return new Promise(function(resolve, reject) {
  //       self._conn.query(
  //         "insert into users set ?",
  //         self.get(true),
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             self.setId(result.insertId || "");
  //             resolve(result);
  //           }
  //         }
  //       );
  //       self._conn.end();
  //     });
  //   }

  //   login() {
  //     let self = this;
  //     return new Promise(function(resolve, reject) {
  //       self._conn.query(
  //         "select * from users where email = ?",
  //         self.getEmail(),
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           } else if (!result || result.length <= 0) {
  //             reject("Usuário não encontrado!");
  //           } else {
  //             let u = result[0];
  //             if (bcrypt.compareSync(self.getPassword(), u.password)) {
  //               self.fill(u);
  //               resolve({ data: self.get() });
  //             } else {
  //               reject("Senha Inválida!");
  //             }
  //           }
  //         }
  //       );
  //       self._conn.end();
  //     });
  //   }
}

module.exports = function() {
  return Item;
};
