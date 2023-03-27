const { fetchCategories } = require("../models/fetchCategories.model");

exports.getCategories = (req, res) => {
    //console.log('here')
  fetchCategories().then(({ rows }) => {
    res.status(200).send({ categories : rows });
  })
  .catch((err) => {
    console.log('made it')
    next(err)
  })
};
