const express = require("express");
const router = express.Router();
const UserModel = require("./users-model");

const mdw = require("../auth/auth-middleware");

// `sinirli` middleware'ını `auth-middleware.js` dan require edin. Buna ihtiyacınız olacak!

/**
  [GET] /api/users

  Bu uç nokta SINIRLIDIR: sadece kullanıcı girişi yapmış kullanıcılar
  ulaşabilir.

  response:
  status: 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response giriş yapılamadıysa:
  status: 401
  {
    "message": "Geçemezsiniz!"
  }
 */

router.get("/", mdw.sinirli, async (req, res, next) => {
  try {
    const users = await UserModel.bul();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.
module.exports = router;
