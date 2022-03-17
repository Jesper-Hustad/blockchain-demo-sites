var EthCrypto = require('eth-crypto');
//  assa

// const consoleCommands = (signature, description) => {
//     const [v, r, s] = vrs(signature)
//     document.getElementById("a").innerHTML ="whaddup"
//     console.log(`let a = await Verifier.deployed()\n\na.createCredentials('${description}', '${v}', '${r}' ,'${s}' )\n`)
// }

const vrs = s => ['0x' + s.substring((64*2)+2),'0x' + s.substring(2,66),'0x' + s.substring(66,(64*2)+2)]

window.main = async function main(certName, privateKey, user){

    const data = {
        "target" : target,
        "certificate" : certName
    }

    const msg = JSON.stringify(data)

    // hash using keccak256 algorithm
    const hashMessage = EthCrypto.hash.keccak256([{ type: "string", value: msg }]);
    
    // produce Etherium signature 
    const signature = EthCrypto.sign(privateKey, hashMessage);

    // consoleCommands(signature, msg)
    result = [msg, ...vrs(signature)]

    console.log(result)
    return result
}

const NTNU_PUBLIC_ADDRESS = '0x639995536426000546395BF162c3f59cF81B30d6'
const NTNU_PRIVATE_KEY = 'f7a34185b2a5f923c421edd0aef206c286cb16103952743b734567e05577f2e3'

let message = "Bachelor i Fysikk, Fakultet for fysikkfolk, NTNU"
let target = "0xE28B62a1796442C6a21940aCA90F0b6644a4D8C0"

main(message, NTNU_PRIVATE_KEY, target)