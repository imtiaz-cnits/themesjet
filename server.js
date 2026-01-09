const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// FORCE PRODUCTION MODE
// This prevents the app from trying to compile files on the server (which causes the crash)
const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3002;

// Initialize Next.js
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    })
        .listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});