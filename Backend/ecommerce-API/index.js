
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const AddressRoutes = require('./routes/AddressRoutes');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(upload.none());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// (async () => {
//   await sequelize.authenticate();
// })();

//Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/addresses', AddressRoutes);


//Cors
app.use(cors());

//Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});