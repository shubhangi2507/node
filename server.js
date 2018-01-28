const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs')
app.use((req, res,next) =>{
  var now = new Date().toString();
  var log =`${now}: ${req.method}, ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n',(err) =>{ if(err)
    {console.log('unable to log it in the files');}
  });
  next();
});

// app.use((req,res,next)=> {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getcurrentyear', () =>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text) =>{
  return text.toUpperCase();
});



app.get('/',(req,res) =>{
  res.render('home.hbs',{
    pagetitle:'home page',
    message:'welcome to my first web page'

  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pagetitle: 'About page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errormessage: 'unable to connect to the net server'});
});


app.listen(port,() => {console.log(`port is set up on ${port}`);});
