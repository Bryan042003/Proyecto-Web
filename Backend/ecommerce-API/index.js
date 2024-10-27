
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(upload.none());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Sync database
// sequelize.sync({alter:true})
// .then(()=>{
//   console.log("Modelos sincronizados con la base de datos");
// })
// .catch((error)=>{
//   console.log("Error al sincronizar los modelos con la base de datos", error);

// })

//Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

//Cors
app.use(cors());

//Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});