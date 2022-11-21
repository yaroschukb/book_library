const { param, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

function objectIdValidationRules(obj = param("id"), p = "id") {
  let message = `Incorrect '${p}' parameter. Must be valid id.`;
  return obj
    .customSanitizer((value) => {
      try {
        return Array.isArray(value)
          ? value.map((el) => ObjectId(el))
          : ObjectId(value);
      } catch (err) {
        return "";
      }
    })
    .not()
    .isString()
    .withMessage(message);
}

function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json(errors);
}

module.exports = {
  objectIdValidationRules,
  validationMiddleware,
};
