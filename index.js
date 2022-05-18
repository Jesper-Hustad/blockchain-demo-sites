const express = require('express')
const path = require('path')
const Web3 = require('web3')
const bodyParser = require('body-parser')
require('dotenv').config();

// load ENV
const port = process.env.PORT || 3000
const mnemonic = "simple bring suggest weasel benefit right pluck clown control ice confirm width"
const rpcUrl =  'https://matic-mumbai.chainstacklabs.com'

// load truffle wallet and contracts
const truffle_connect = require('./src/connection/contractConnection.js')
const HDWalletProvider = require("@truffle/hdwallet-provider")
truffle_connect.web3 = new Web3(new HDWalletProvider(mnemonic,rpcUrl))

const app = express()
app.use(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.json())

app.get('/', (req, res) => res.redirect('/home'))

app.get('/getCredentials/:id?', async (req, res) => res.send(await truffle_connect.getCredentials(req.params.id)))

app.listen(port, '0.0.0.0', () => console.log(`Site available at http://localhost:${port}/`))
