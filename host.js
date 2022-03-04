const express = require('express')
const app = express()
const port = 3000

const services = ['authenticator', 'signer-service']
// services.forEach(s => app.use(express.static(s)))
app.use(express.static(__dirname))


app.listen(port, () => {
  console.log(`Site available at http://localhost:${port}/${services[0]}`)
})