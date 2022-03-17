const express = require('express')
const app = express()
const port = 3000
const Web3 = require('web3');
const truffle_connect = require('./connection/contractConnection.js');
const bodyParser = require('body-parser');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config(); // Load .env file

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const services = ['authenticator', 'signer-service']
// services.forEach(s => app.use(express.static(s)))
app.use(express.static(__dirname))


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

  //truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://10.0.0.64:7545"));
  truffle_connect.web3 = new Web3(new HDWalletProvider(process.env.MNEMONIC,
      `https://rpc-mumbai.matic.today`))
  console.log("Express Listening at http://localhost:" + port);

});