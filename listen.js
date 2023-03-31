const app =require('./app.js')

app.listen(9090,(err) => {
    if(err) {
        throw err;
    }
    console.log("server is listening")
})