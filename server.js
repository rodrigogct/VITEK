const path = require('path');
const engines = require('consolidate');
const express = require('express');
const app = express();
const sendEmail = require('./utils/sendEmail')

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views')
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/vitek', (req, res) => {
    res.render('vitek');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/steel', (req, res) => {
  res.render('steel');
});

app.get('/sent', (req, res) => {
  res.render('sent');
});


app.post('/sendemail', (req, res) => {
    const { fullname, email, message } = req.body;

    const from = "proyectos@alvitek.com.mx";
    const to = "proyectos@alvitek.com.mx";
  
    const subject = "Solicitud de contacto VITEK";
  
    const output = `
      <p>Nuevo mensaje pendiente</p>
      <h3>Detalles de contacto del cliente:</h3>
      <ul>
        <li>Nombre completo: ${fullname}</li>
        <li>Correo: ${email}</li>
        <li>Mensaje: ${message}</li>
      </ul>
    `;

    sendEmail(to, from, subject, output);
    console.log(req.body);
    res.redirect('/sent');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))