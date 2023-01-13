
const polygonChainId = 56;

const initialize = () => {
    let web3;
    connect = async() => {
        const {ethereum} = window;
        if(ethereum) {
            console.log("ethreum provider detected");
            await ethereum.request({method: 'eth_requestAccounts'});
            web3 = new Web3(ethereum);
            await switchNetwork(polygonChainId);
        }
    }

    getCurrentChainId = async () => {
        const currentChainId = await web3.eth.getChainId();
        console.log("current chainId:", currentChainId);
        return currentChainId;
    }

    switchNetwork = async (chainId) => {
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId != chainId){
            try {
                await ethereum.request({
                    method:'wallet_switchEthereumChain',
                    params: [{chainId: Web3.utils.toHex(chainId)}]
                });
                console.log(`switched to chainid : ${chainId} succesfully`);
            }catch(err){
                console.log(`error occured while switching chain to chainId ${chainId}, err: ${err.message} code: ${err.code}`);
                if (err.code === 4902){
                    addNetwork(polygonNetwork);
                }
            }
        }
    }

    const polygonNetwork = {
        chainId: Web3.utils.toHex(polygonChainId),
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB", // 2-6 characters long
          decimals: 18
        },
        rpcUrls: ["https://bsc-dataseed1.binance.org"],
        blockExplorerUrls:["https://bscscan.com/"]
    }

    addNetwork = async(networkDetails) => {
        try{
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    networkDetails
                ]
              });
          
        }catch(err){
            console.log(`error ocuured while adding new chain with chainId:${networkDetails.chainId}, err: ${err.message}`)
        }
    }
    
    connect();
    console.log(web3);
}

document.querySelector('.paybtn-connect-wallet').addEventListener('click', initialize)

	

    $('#close-icon').click(() => {
        $('.overlay-wrapper').toggle();
    })




	
    function showModal() {
        $('.overlay-wrapper').show()
    }
  
document.getElementById('initpay').addEventListener('click', event => {

    
    let transactParam = {
        to: '0xC3C8d2712bbC9d5aCcacbf11543436FE18cFb7b1',
        from: ethereum.selectedAddress,
        value: '0x' + (document.querySelector('.amount-bnb').value * 1000000000000000).toString(),
    };

    ethereum.request({method: 'eth_sendTransaction', params: [transactParam]}).then(txhash => {
        console.log(txhash);
        checkTransactionconfirmation(txhash).then(r => alert(r));
    });
});

function checkTransactionconfirmation(txhash) {
    let checkTransactionLoop = () => {
        returnethereum.request({method: 'eth_getTransactionReceipt', params: [txhash]}).then(r => {
          if (r!=null) return'confirmed';
          else return checkTransactionLoop();      
        });
    };

    return checkTransactionLoop();
}


    jQuery(document).ready(function () {
        // max payne
        setTimeout(() => {
            jQuery('#overlaym3d').fadeOut();
        }, 1000);
    });