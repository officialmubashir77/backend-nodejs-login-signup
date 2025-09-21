// console.log("Hello, World!");

// for(let i = 0 ; i < 10 ; i++){
//   console.log("Hello, World!");
// }

// var catMe = require("cat-me");
// console.log(catMe());

const http = require("http");

const server = http.createServer(( req , res ) => {
    console.log(req.url);
    if(req.url === "/"){
        res.end("This is the home page");
    }
    else if(req.url === "/about"){
        res.end("This is the about page");
    }
    else if(req.url === "/contact"){
        res.end("This is the contact page");
    }
    
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});