var express = require('express'),
    mailer = require('nodemailer'),
    path = require('path'),
    bodyParser = require('body-parser'),
    CORS = require('cors'),
    swig = require('swig'),
    app = express();

app.use(CORS())
app.use(express.static(path.join(__dirname, 'build')));
app.engine('html', swig.renderFile);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/build');
app.set('view engine', 'html');

app.get('/', (req, res, next) => {
    res.render('index')
})
app.post('/contact', function (req, res, next) {

    const transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'moukadimalassani@gmail.com',
            pass: 'dragon24type'
        }
    })
    transporter.verify((err, sucess) => {
        if (err) {
            console.log('error')
        } else {
            console.log('all going well')
        }
    })
    const mail = {
        from: '',
        to: 'moukadimalassani@gmail.com',
        subject: req.body.objet,
        html: `<h2><center>Hey Salut <b><span> MADev</span></b> !</center> </h2> 
        <p>Je suis <b>${req.body.nom}</b> <br/> voici mon adresse ${req.body.email} <br> <br> En effet, ${req.body.message}</p>`
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) return res.json({ status: false })
        return res.json({ status: data })
    })

});

app.listen(3001);
console.log('App is running');