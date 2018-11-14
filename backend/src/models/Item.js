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

  all() {
    let self = this;
    return new Promise(function(resolve, reject) {
      self._conn.query(
        "select * from items where user_id = ? order by purchased",
        self._user_id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
      self._conn.end();
    });
  }

  store() {
    let self = this;
    return new Promise(function(resolve, reject) {
      self._conn.query("insert into items set ?", self.get(), (err, result) => {
        if (err) {
          reject(err);
        } else {
          self.setId(result.insertId || "");
          resolve(result);
        }
      });
      self._conn.end();
    });
  }

  find(id) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self._conn.query(
        "select * from items where user_id = ? and id = ? order by purchased",
        [self._user_id, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
      self._conn.end();
    });
  }

  update(id) {
    let self = this;
    self.setId(id);
    return new Promise(function(resolve, reject) {
      self._conn.query(
        "update items set ? where id = ?",
        [self.get(), id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.affectedRows > 0) {
              resolve(result);
            }
            reject("Nenhum item foi atualizado!");
          }
        }
      );
      self._conn.end();
    });
  }

  delete(id) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self._conn.query("delete from items where id = ?", id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve(result.affectedRows);
          }
          reject("Nenhum item foi deletado!");
        }
      });
      self._conn.end();
    });
  }
}

module.exports = function() {
  return Item;
};
