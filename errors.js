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

exports.handlePSQL404 = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ message: "ID not found" });
  } else {
    next(err);
  }
};

exports.handleSQL400 = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ message: "Missing required field" });
  } else {
    next(err);
  }
};

exports.errorHandler = (err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  if (status && message) {
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "A Server Error has Occurred" });
};
