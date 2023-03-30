exports.invalidPath = (req, res, next) => {
 
  res.status(404).send({ message: "End point does not exist" });
  
};
exports.handlePSQL400s = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid ID" });
  } else {
    next(err);
  }
};
exports.errorHandler = (err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  res.status(status).send({ message });
  next(err)
};
exports.handle500 = (err, req, res, next) => {
   res.status(500).send({message: 'A Server Error has Occurred'})
 }