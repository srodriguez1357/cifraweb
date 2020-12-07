const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const upload = multer({dest: './textos'});
const dir2 = 'textos';
const dir4 = 'cifradirijillos';
const dir5 = 'decifradirijillos';
const Cryptr = require('cryptr');

app.get('/',(req, res) =>{
    res.render('index.ejs', {root: __dirname});
  });

app.post('/subidos', (root,res)=>{
    fs.readdir(dir2, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            console.log(file);         
        });
        res.send(files);
  });
  });

app.post('/enviar', upload.single('archivo'), (req, res) =>
{
    res.send('Archivo subido exitosamente');
});
  

app.post('/cifradirijillo', (req, res)=>{
    const cryptr = new Cryptr('technique');
    const encryptedString = cryptr.encrypt('./textos/confidencial.txt');
    console.log(encryptedString); 
    const decryptedString = cryptr.decrypt(encryptedString);
    console.log(decryptedString); 
    fs.writeFile('./cifradirijillos/zecreto.txt', encryptedString, 'ascii', function(err) { 
      if (err) {
        console.log(err);
      } else {
        res.send('El archivo ha sido cifrado');
      }
    });
  });
  
  app.post('/decifradirijillo', (req,res)=>{
    const cryptr = new Cryptr('technique');
    let info = fs.readFileSync('./textos/confidencial.txt');
    const encryptedString = cryptr.encrypt(info);
    console.log(encryptedString); 
    const decryptedString = cryptr.decrypt(encryptedString);
    console.log(decryptedString); 
    fs.writeFile('./decifradirijillos/yanozecreto.txt', decryptedString, 'ascii', function(err) { 
      if (err) {
        console.log(err);
      } else {
        res.send('El archivo ha sido decifrado');
      }
    });
  });
  app.post('/cifradillos', (root,res)=>{
    fs.readdir(dir4, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            console.log(file);         
        });
        res.send(files);
  });
  });
  
  app.post('/decifradillos', (root,res)=>{
    fs.readdir(dir5, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            console.log(file);         
        });
        res.send(files);
  });
  });
const port = 9000;
app.listen(port, () => {
  console.log(`App is running on PORT: ${port}.`);
});