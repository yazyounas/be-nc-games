
exports.invalidPath= ((req, res, next) =>   {
    res.status(404).send({message: 'End point does not exist'})
});

