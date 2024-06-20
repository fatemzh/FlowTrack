import jsonServer from 'json-server';
import bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();
  if (user) {
    res.jsonp({ token: user.token, user });
  } else {
    res.status(401).jsonp({ error: 'Invalid email or password' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
