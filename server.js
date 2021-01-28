var connect = require('connect');
var serveStatic = require('serve-static');
const open = require('open');


connect()
    .use(serveStatic(__dirname))
    .listen(8080, () => {
        (async () => {


            // Opens the URL in the default browser.
            await open('http://localhost:8080/index.html');


        })();
    })

