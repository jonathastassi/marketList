const bcrypt = require('bcrypt');

class User {
    constructor(conn) {
        this._conn = conn;
    }

    get(withPass = false) {
        if (withPass) {
            return {
                'id': this.id,
                'name': this.name,
                'email': this.email,
                'password': bcrypt.hashSync(this.password,10),
            }
        }
        
        return {
            'id': this.id,
            'name': this.name,
            'email': this.email,
        }
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

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }

    fill(u) {
        this.id = u.id;
        this.name = u.name;
        this.email = u.email;
    }

    store() {
        let self = this;
        return new Promise(function(resolve, reject) {
            self._conn.query('insert into users set ?', self.get(true), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    self.setId(result.insertId || "")
                    resolve(result);
                }
            })
            self._conn.end();        
        })
    }

    login() {
        let self = this;
        return new Promise(function(resolve, reject) {
            self._conn.query('select * from users where email = ?', self.getEmail(), (err, result) => {
                if (err) {
                    reject(err);
                }
                else if(!result || result.length <= 0) {
                    reject("Usuário não encontrado!");
                }
                else {
                    let u = result[0];        
                    if(bcrypt.compareSync(self.getPassword(), u.password)) {
                        self.fill(u);
                        resolve({'data': self.get()});
                    } else {
                        reject("Senha Inválida!");
                    }                    
                }
            })
            self._conn.end();        
        })
    }

}

module.exports = function() {
    return User;
}