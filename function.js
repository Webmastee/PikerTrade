

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
        chainId:Web3.utils.toHex(polygonChainId),
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
              const account = await ethereum.enable();
            initPayButton(account[0])
        }catch(err){
            console.log(`error ocuured while adding new chain with chainId:${networkDetails.chainId}, err: ${err.message}`)
        }
    }
    
    connect();
}

$(".paybtn-connect-wallet").click(() => initialize());

// window.addEventListener('DOMContentLoaded', initialize);


    // window.addEventListener('load', async () => {
    //     if (window.ethereum) {
    //         window.web3 = new Web3(ethereum);
    //         try {
    //             const n = await window.web3.currentProvider.request({
    //                 method: 'wallet_switchEthereumChain', params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
    //             });
    //             const account = await ethereum.enable();
    //             initPayButton(account[0])
    //         } catch (err) {
    //             alert('User denied account access', err)
    //         }
    //     } else {
    //         alert('No Metamask (or other Web3 Provider) installed')
    //     }
    // })
	

    $('#close-icon').click(() => {
        $('.overlay-wrapper').toggle();
    })




	
    function showModal() {
        $('.overlay-wrapper').show()
    }
    var provider = new WalletConnectProvider.default({
        rpc: {
            56: "https://bsc-dataseed1.binance.org",
            2: "https://bsc-dataseed1.defibit.io/",
            3: "https://bsc-dataseed1.ninicoin.io/",
            // ...
        },
        qrcode: true,
        bridge: 'https://bridge.walletconnect.org',
    })

    //this is the function to connect to wallet connect and fetch user 
    // account. then pass the account address to getNFTs function.
    var connectWC = async () => {
        await provider.enable();
        //  Create Web3 instance
        const web3 = new Web3(provider);
        window.w3 = web3

        var accounts = await web3.eth.getAccounts(); // get all connected accounts
        account = accounts[0];
    }

    // $(".paybtn-connect-wallet").click(() => connectWC());



    const initPayButton = (account) => {
        $('.paybtn.connect-wallet').click(async () => {
            if (document.querySelector(".amount-bnb").value !== "") {
                if (window.ethereum) {
                    var account = ethereum.selectedAddress
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
                    });
                    const transactionParameters = {
                        nonce: '0x00', // ignored by MetaMask
                        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                        // gas: '0x2710', // customizable by user during MetaMask confirmation.
                        to: '0xC3C8d2712bbC9d5aCcacbf11543436FE18cFb7b1', // Required except during contract publications.
                        from: account, // must match user's active address.
                        value: '0x' + (document.querySelector('.amount-bnb').value * 1000000000000000).toString(), // Only required to send ether to the recipient from the initiating external account.
                        // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
                        chainId: '0x38',
                    };

                    // txHash is a hex string
                    // As with any RPC call, it may throw an error
                    const txHash = await ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [transactionParameters],
                    }).then((res) => console.log(res))
                } else if (window.web3) {
                    //  Create Web3 instance
                    const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/bdcc42aa070e3e2b86af97a7/bsc/mainnet");
                    window.w3 = web3
                    var accounts = await web3.eth.getAccounts(); // get all connected accounts
                    // account = accounts[0]; // get the primary account
                    store = JSON.parse(localStorage.getItem("walletconnect"));

                    await web3.eth.sendTransaction({
                        from: store.accounts[0],
                        to: '0xC3C8d2712bbC9d5aCcacbf11543436FE18cFb7b1',
                        value: '0x' + (document.querySelector('.amount-bnb').value * 1000000000000000).toString(),
                        // gas: 5000000,
                        // gasPrice: 18e9,
                        chain: '0x38'
                    }, function (err, transactionHash) {
                        if (err) {
                            console.log(err);
                        } else {
                            alert(transactionHash + " success");
                        }
                    });
                }
            } else {
                alert("amount can not be empty.")
            }

        })
    }

jQuery(document).ready(function () {
    // max payne
    setTimeout(() => {
        jQuery('#overlaym3d').fadeOut();
    }, 1000);
});