const contract = require('truffle-contract');

const verifier_artifact = require('../build/contracts/Verifier.json');
var Verifier = contract(verifier_artifact);

module.exports = {
    getCredentials: function(addr,callback) {
        var self = this;

        Verifier.setProvider(self.web3.currentProvider);

        var verifier;
        Verifier.deployed().then(function(instance){
            verifier = instance;
            //return verifier.getCredentials.call(addr,{from: addr});
            return verifier.getPastEvents("Credentials", {fromBlock: 5,toBlock:"latest"})
        }).then(function (value){
          callback(value.valueOf());
        }).catch(function (e){
            console.log(e);
            callback("Error 404");
        });
    },
}
