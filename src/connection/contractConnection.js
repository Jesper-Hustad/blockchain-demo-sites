const artifact = require('../build/contracts/Verifier.json');
const verifierContract = require('truffle-contract')(artifact);

module.exports = { 
    getCredentials: async function(address = " "){

        const self = this

        const section = {
            filter: { from: address },
            // TODO: fix 3500 block limit
            fromBlock: (await self.web3.eth.getBlockNumber() - 3499), 
            toBlock: "latest"
        }

        verifierContract.setProvider(self.web3.currentProvider);
        const contract = await verifierContract.deployed()
        let events =  await contract.getPastEvents("Credentials", section).valueOf()

        if(!Array.isArray(events)) return events

        return events.map(i => i.returnValues).map(i => {
            return { "signer" : i.signer, ...(JSON.parse(i.description)) }
        })
    }
}