

const $ = (s) => document.querySelector(s)


const sleep = ms => new Promise(r => setTimeout(r, ms));

const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString))

//buttons
const loginButton = document.querySelector('#loggin-button');

//fields
const showAccount = document.querySelector('.showAccount');
const signerfield = document.querySelector("#signer")
const targetfield = document.querySelector("#target")
const certificatefield = document.querySelector("#certificate")

//cards
const diplomaCard = document.querySelector("#studies-card")

loginButton.addEventListener('click', () => {
    getAccount();
});

console.log(urlParams);


async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
    loggedinn()
}


async function loggedinn(){
    let c = await fetch('http://localhost:3000/get');
    let d = (await c.json())[0];
    console.log(d)
    signerfield.innerText = d.signer
    targetfield.innerText = d.target
    certificatefield.innerText = d.certificate

    show()
    await sleep(100)
    loginButton.style="display: none;"
    await sleep(500)
    $(".card").style=""
    diplomaCard.style=""
    hide()
}

function show () {
  // document.getElementById("account-body").style="position: absolute;"
  document.getElementById("spinner").classList.add("show");
}
function hide () {
  // document.getElementById("account-body").style=""
  document.getElementById("spinner").classList.remove("show");
}
