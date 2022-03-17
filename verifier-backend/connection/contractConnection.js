const contract = require('truffle-contract');

const verifier_artifact = require('../build/contracts/Verifier.json');
var Verifier = contract(verifier_artifact);

module.exports = {
    getCredentials: function(addr,callback) {
        let self = this;

        Verifier.setProvider(self.web3.currentProvider);

        let verifier;
        Verifier.deployed().then(async function (instance) {
            verifier = instance;
            // TODO: ONLY FOR MVP. Fix amount of events for release
            return verifier.getPastEvents("Credentials", {
                filter: { from: addr },
                fromBlock: (await self.web3.eth.getBlockNumber() - 3499),
                toBlock: "latest"
            })
        }).then(function (value){
          callback(value.valueOf());
        }).catch(function (e){
            console.log(e);
            callback("Error 404");
        });
    },
}
