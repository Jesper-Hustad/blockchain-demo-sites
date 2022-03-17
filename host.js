const express = require('express')

const app = express()
const port = 80


const Web3 = require('web3');
const truffle_connect = require('./verifier-backend/connection/contractConnection.js');
const bodyParser = require('body-parser');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config(); // Load .env file

const services = ['authenticator', 'signer-service']

// services.forEach(s => app.use(express.static(s)))
app.use(express.static(__dirname))


// parse application/json
app.use(bodyParser.json());

// AUTO REDIRECT helper function
app.get('/', (req, res) => {
  res.redirect('/authenticator');
});

app.get('/get', (req, res) => {
  console.log("Getting info");
  truffle_connect.getCredentials("0xa4A8203C9f5D1f3c45316976891564481277903e",function (answer){
    if(!Array.isArray(answer)){
      res.send(answer);
      return;
    }
    const obj = answer.map(i => i.returnValues).map(i => {return {"signer":i.signer, ...(JSON.parse(i.description))}});
    res.send(obj);
  })
});


app.listen(port, () => {
  truffle_connect.web3 = new Web3(new HDWalletProvider("simple bring suggest weasel benefit right pluck clown control ice confirm width",
      `https://rpc-mumbai.matic.today`))
  console.log(`Site available at http://localhost:${port}/${services[0]}`)
})

