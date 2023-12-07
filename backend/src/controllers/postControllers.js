const models = require("../models");

// READ ALL POST

const browse = (req, res) => {
  models.post
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.post
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

const add = (req, res) => {
  const post = req.body;
  console.info("post: ", post);
  // TODO validations (length, format...)

  models.post
    .insert(post)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({ message: "Post crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

// SELECTALL
const select = (req, res) => {
  const { post } = req.params;

  models.post.selectAllPost(post).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const addImage = (req, res) => {
  const post = req.body;
  const { files } = req;
  const image1 = files.image_1[0].filename;

  models.post.insert(post).then(([result]) => {
    console.info(result);
    const postId = result.insertId;
    models.post
      .insertImage(image1, postId)
      .then(([result2]) => {
        console.info(result2);
        res.status(200).send("Créée avec succés");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
// upload image

const checkUpload = (req, res) => {
  res.status(200).send("fichier téléchargé");
};

const readPostbyUser = (req, res) => {
  const { userId } = req.params;
  models.post.findAllPostByUser(userId).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const deletePost = (req, res) => {
  const { userId, announceId } = req.params;
  models.post
    .deletePost(userId, announceId)
    .then(() => {
      res.status(200).json({ message: "post supprimée des favoris" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

module.exports = {
  browse,
  read,
  add,
  addImage,
  select,
  checkUpload,
  readPostbyUser,
  deletePost,
};
