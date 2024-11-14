
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const AddressRoutes = require('./routes/AddressRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const OfferRoutes = require('./routes/OfferRoutes');
const ReviewRoutes = require('./routes/ReviewRoutes');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

app.use(cors({
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'], // Permitir cualquier método HTTP
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos encabezados
}));

app.use(express.json());
app.use(upload.none());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/addresses', AddressRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/offers', OfferRoutes);
app.use('/api/reviews', ReviewRoutes);

//Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});