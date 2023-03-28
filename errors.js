exports.invalidPath = (req, res, next) => {
  res.status(404).send({ message: "End point does not exist" });
};
exports.errorHandler = (err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  res.status(status).send({ message });
};
