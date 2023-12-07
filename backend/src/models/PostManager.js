const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  selectAllPost(post) {
    return this.database.query(
      `SELECT u.firstname, p.post_id, p.content, p.created_at, p.created_time, i.image_1,
      LEFT(u.firstname, 1) AS first_letter
    FROM post p
    JOIN user u ON u.user_id = p.user_id
    LEFT JOIN images i ON i.post_id = p.post_id
    ORDER BY CONCAT(p.created_at, ' ', p.created_time) DESC`,
      [post]
    );
  }

  insert(post) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, content, created_at, created_time) VALUES (?, ?, CURRENT_DATE(), CURRENT_TIME())`,
      [post.user_id, post.content]
    );
  }
  //   update(post) {
  //     return this.database.query(
  //       `update ${this.table} set  content = ? , where post_id = ?`,
  //       [post.content]
  //     );
  //   }

  insertImage(image1, id) {
    return this.database.query(
      `INSERT INTO images (image_1, post_id) VALUES (?, ?)`,
      [image1, id]
    );
  }

  findAllPostByUser(userId) {
    return this.database.query(
      `SELECT u.firstname, p.post_id, p.content, p.created_at, p.created_time, i.image_1,
    LEFT(u.firstname, 1) AS first_letter
    FROM post p
    JOIN user u ON u.user_id = p.user_id
    LEFT JOIN images i ON i.post_id = p.post_id
    WHERE p.user_id = ?
    ORDER BY CONCAT(p.created_at, ' ', p.created_time) DESC`,
      [userId]
    );
  }

  deletePost(userId, announceId) {
    return this.database.query(
      `DELETE FROM post WHERE user_id = ? AND post_id = ?`,
      [userId, announceId]
    );
  }
}

module.exports = PostManager;
