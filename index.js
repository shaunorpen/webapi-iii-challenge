const server = require('./server');

server.listen(process.env.PORT || 5000, () => {
    console.log("Server listening on port " + (process.env.PORT || 5000));
});
