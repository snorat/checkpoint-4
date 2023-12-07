const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashedPassword) values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set   firstname = ?, lastname= ?, email= ?  where user_id = ?`,
      [user.firstname, user.lastname, user.email, user.user_id]
    );
  }

  searchByEmail(email) {
    return this.database.query(`SELECT * FROM user WHERE email = ?`, [email]);
  }

  getProfile(user) {
    return this.database.query(
      `SELECT u.user_id, u.firstname, u.lastname, u.email, u.hashedPassword, u.registration_date, 
      p.post_id, p.content, p.created_at, p.created_time, 
      i.image_id, i.image_1
    FROM user u
    JOIN post p ON u.user_id = p.user_id 
    JOIN images i ON p.post_id = i.post_id
    WHERE u.user_id = ?;
  `,
      [user]
    );
  }
}

module.exports = UserManager;
