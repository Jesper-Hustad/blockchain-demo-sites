const $ = (s) => document.querySelector(s)


const sleep = ms => new Promise(r => setTimeout(r, ms));

const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString))
console.log(urlParams);

// alert("whadudp")

async function signIn() {
    //
    // show()
    // await sleep(100)
    // document.getElementById("studies-card").style="display: none;"
    // await sleep(500)
    // document.getElementById("studies-card").style=""
    //
    // await sleep(80)
    //
    // // Display completed studies
    // $("#study-title").innerText =       studies[study_pos].title
    // $("#study-sub").innerText =         studies[study_pos].sub
    // $("#study-description").innerText = studies[study_pos].description
    // $("#study-diploma").style = ""
    //
    // await sleep(150)
    //
    // // display name
    // nameInput = document.getElementById("usr").value
    // document.getElementById("header-user-text").innerText = nameInput
    // await sleep(80)
    // document.getElementById("label-user-text").innerText = nameInput
    // document.getElementById("usr").value = ""
    // hide()
    if (window.ethereum) {
        if(!window.ethereum.isConnected()){
            ethereum.request({method: "eth_requestAccounts"})
                .then(login())
                .catch((err) => console.error(err.message));
            ethereum.on("chainChanged", () => window.location.reload());

        }else{
            alert("logged inn. Redirecting....")
        }
    }
}
function login() {
    ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
            console.log(`using Account ${accounts[0]}`);
            alert("logged inn. Redirecting....")
        } else {
            console.error("0 accounts.");
        }
    })
}

function show () {
  // document.getElementById("account-body").style="position: absolute;"
  document.getElementById("spinner").classList.add("show");
}
function hide () {
  // document.getElementById("account-body").style=""
  document.getElementById("spinner").classList.remove("show");
}


// 

function redirect(){
  const paramObj = {
    "name" : document.getElementById("header-user-text").innerText,
    "desc" : studies[study_pos].title,
    "content" : studies[study_pos].content,
  }
  const params = new URLSearchParams(paramObj).toString();
  window.location.href = "/signer-service?" + params;
}
