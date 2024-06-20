const jsonServer = require('json-server');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

// Custom route for login
server.post('/login', (req, res) => {
  console.log('Received login request');
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);
  const user = router.db.get('loginUsers').find({ email, password }).value();
  if (user) {
    console.log('Login successful:', user);
    res.jsonp({ token: user.token, user });
  } else {
    console.log('Login failed: Invalid email or password');
    res.status(401).jsonp({ error: 'Invalid email or password' });
  }
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
