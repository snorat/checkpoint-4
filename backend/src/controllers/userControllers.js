const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const models = require("../models");

// READ ALL USERS

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// READ USER BY ID

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// UPDATE AN USER

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;
  console.info("user: ", user);
  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({ message: "Utilisateur crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.user_id,
          email: req.user.email,
          id: req.user.user_id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("authToken", token);

        res.status(200).json({
          message: "Connexion réussie",
          id: req.user.user_id,
          email: req.user.email,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
        });
      } else {
        res.sendStatus(401);
      }
    });
};

const getProfile = (req, res) => {
  console.info("User ID from params:", req.params.id);
  models.user
    .getProfile(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        console.info("User not found");
        res.sendStatus(404);
      } else {
        console.info("User data sent:", rows[0]);
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  verifyPassword,
  getProfile,
};
