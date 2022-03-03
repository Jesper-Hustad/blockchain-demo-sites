const vrs = s => ['0x' + s.substring((64*2)+2),'0x' + s.substring(2,66),'0x' + s.substring(66,(64*2)+2)]

async function diploma(){

    // const account = await getCurrentAccount();



    // // KOMMER FRA SERVER NTNU
    // const msgString = "Bachelor i ingeniørfag, Fakultet for informasjonsteknologi og elektroteknikk, NTNU"
    
    // // const msg = '0x' + keccak256(msgString).toString('hex')
    // // const ethResult = await window.ethereum.request({
    // // method: 'eth_sign',
    // // params: [account, msg],
    // // });
    
    
    // const contractResult = await window.contract.methods
    // .createCredentials(msgString, '0x1c', '0xa2c3cedaa1933cbff3d118201349ab90894a0b7a5a7d14c770e9e2980098e9d0' ,'0x6d8263b4cd6d1a9b19eab141000319686df414f371ff35fc95d4e413363401c3')
    // .send({ from: account });

    // console.log(ethResult, contractResult)

}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');
}

function updateStatus(status) {
    
    const statusEl = document.querySelector("#status")
    statusEl.innerHTML = status;
    console.log(status);
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

async function loadContract() {
    return await new window.web3.eth.Contract([
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "name": "Credentials",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "name": "createCredentials",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], '0x16441b648422b14F9c32e5E3FaFf619A5a4CEf67');
}



const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString))
console.log(urlParams);
updateStatus(JSON.stringify(urlParams));