const $ = (s) => document.querySelector(s)

const sleep = ms => new Promise(r => setTimeout(r, ms));

const vrs = s => ['0x' + s.substring((64*2)+2),'0x' + s.substring(2,66),'0x' + s.substring(66,(64*2)+2)]

async function diploma(){

      const queryString = window.location.search;
      const urlParams = Object.fromEntries(new URLSearchParams(queryString))
  
      const NTNU_PUBLIC_ADDRESS = '0x639995536426000546395BF162c3f59cF81B30d6'

      const NTNU_PRIVATE_KEY = 'f7a34185b2a5f923c421edd0aef206c286cb16103952743b734567e05577f2e3'

      let message = urlParams + ": " + urlParams.content + " (" + urlParams.desc + ")"

      const target = await getCurrentAccount();  
      // let target = "0xE28B62a1796442C6a21940aCA90F0b6644a4D8C0"
  
      const contractData = await window.main(message, NTNU_PRIVATE_KEY, target)

      signContract(contractData)
}

async function signContract(data){
  const acc = await getCurrentAccount(); 
  
  show()
  const contractResult = await window.contract.methods.createCredentials(...data).send({from: acc});
  hide()


  resultScreen(contractResult)
  console.log(contractResult)
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
    // updateStatus('Ready!');
}

// function updateStatus(status) {
    
//     const statusEl = document.querySelector("#status")
//     statusEl.innerHTML = status;
//     console.log(status);
// }

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
      ], '0xd74BAc34Cf6A04274Fcd370040a001E22D557C40');
}


function show () {
  document.getElementById("account-body").style="position: absolute;"
  document.getElementById("spinner").classList.add("show");
}
function hide () {
  document.getElementById("account-body").style=""
  document.getElementById("spinner").classList.remove("show");
}

load()



let svgDoc = document.getElementById("certificate");
svgDoc.addEventListener("load", async function(){


  const queryString = window.location.search;
  const urlParams = Object.fromEntries(new URLSearchParams(queryString))
  

  console.log(urlParams, window.location.search)


  const name = urlParams.name
  const desc = urlParams.desc
  const content = urlParams.content
  // console.log(urlParams);
  // updateStatus(JSON.stringify(urlParams));

  svgDoc = svgDoc.getSVGDocument()

  show()
  // await sleep(700)
  svgDoc.getElementById('data-description').innerHTML = desc;

  // style if big text
  if(desc.includes("computer")) svgDoc.getElementById('data-description').style= "font-size: 28px !important;" 
  await sleep(300)
  svgDoc.getElementById('data-date').innerHTML = "   " + new Date(Date.now()).toLocaleString().split(',')[0];
  await sleep(50)
  svgDoc.getElementById('data-name').innerHTML = name;
  $("#code-name").innerHTML = `(${name})`
  $("#code-content").innerHTML = `${content} <i>(${desc})</i>`; 
  // BIDATA,IDI,NTNU <i>(Bachelor i ingeniørfag, data)</i>
  await sleep(300)
  hide()

  
  
  
})

// window.onload = async function() {
//   show()
//   await sleep(1200)
//   hide()
// };

async function upload(){
  diploma()
  // resultScreen({
  //   "blockHash": "0x8c3c1f0b4e87b9b31ca18432a7f9837411c3e5e0b8e72b1f1acf2d1bbc350e81",
  //   "blockNumber": 25555662,
  //   "contractAddress": null,
  //   "cumulativeGasUsed": 5649586,
  //   "effectiveGasPrice": "0x5969371f",
  //   "gasUsed" : 33948,
  //   "transactionHash": "0xc76072cf31feab819ebaae18b48c33ecd58ec29c67cb201413b044c0431fa908"
  // })
}

async function resultScreen(contractResult){
  const url = 'https://polygonscan.com/tx/' + contractResult.blockHash
  const blockNumber = contractResult.blockNumber
  const gas = contractResult.gasUsed

  document.getElementById('polygonscan-link').setAttribute('href',url)

  document.getElementById('success-pre').innerHTML = 
  `event certificate = {
    "transaction" : ${contractResult.blockHash}
    "blockNumber" : ${blockNumber}
    "gasUsed" : ${gas}
    "statusCode" : 200
  }`

  show()
  await sleep(100)
  document.getElementById("upload-content").style="display: none;"
  await sleep(200)
  document.getElementById("sucess-card").style=""
  document.getElementById("fancy-logo").style="" 
  hide()
}


