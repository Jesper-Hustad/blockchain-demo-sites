# Blockchain self sovereign identity demo

This is a demo of self sovereign identity using blockchain.  
You can create some credentials at an issuer (university) and verify them (hiring website).  
The demo uses a testnet (Matic mumbai) which is built with Etherium.  
Smart contacts are used to verify the credentials and store them on chain.  
The backend uses truffle for deploying and interacting with the blockchain.


## Try it yourself
You can try the demo out yourself by clicking this [link](https://blockchain-mvp.herokuapp.com/).  



## Getting started
To run the demo locally clone the repo, cd into directory, and run these commands:
```cmd
npm install
npm run dev
```

You may have to change the RPC url in the .env file if it's no longer working.