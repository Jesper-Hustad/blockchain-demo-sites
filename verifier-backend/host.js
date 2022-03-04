const express = require('express')
const app = express()
const port = 3000
const Web3 = require('web3');
const truffle_connect = require('./connection/contractConnection.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const services = ['authenticator', 'signer-service']
// services.forEach(s => app.use(express.static(s)))
app.use(express.static(__dirname))


app.get('/get', (req, res) => {
  console.log("Getting info");
  truffle_connect.getCredentials("0xE28B62a1796442C6a21940aCA90F0b6644a4D8C0",function (answer){

    const obj = answer.map(i => i.returnValues).map(i => {return {"signer":i.signer, ...(JSON.parse(i.description))}});
    // console.log(obj);
    // const json = JSON.parse(obj[0].description);
    res.send(obj);
  })
});


app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://10.0.0.64:7545"));

  console.log("Express Listening at http://localhost:" + port);

});