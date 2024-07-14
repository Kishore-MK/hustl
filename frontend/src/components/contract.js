import {
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal,
    Address,
  } from "@stellar/stellar-sdk";
  import { userSignTransaction } from "./freighter";
  

  const addressToScval = (account)=>new Address(account).toScVal();

  let rpcUrl = "https://soroban-testnet.stellar.org";
  
  let contractAddress =
    "CAJBGPTLMJ4VFTETMY5VPSA2C6IR4XK4S2EHU6O3GR5LFQIUWJSPBWOP";
  
  let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  };
  
  async function contractInt(caller, functName, values) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const sourceAccount = await provider.getAccount(caller);
    const contract = new Contract(contractAddress);
    let buildTx;
  
    if (values == null) {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30)
        .build();
    } else if (Array.isArray(values)) {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30)
        .build();
    } else {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, values))
        .setTimeout(30)
        .build();
    
      }

      
      
    let _buildTx = await provider.prepareTransaction(buildTx);
  
    let prepareTx = _buildTx.toXDR(); // pre-encoding (converting it to XDR format)
  
    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
  
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
  
    try {
      let sendTx = await provider.sendTransaction(tx).catch(function (err) {
        console.error("Catch-1", err);
        return err;
      });
      if (sendTx.errorResult) {
        throw new Error("Unable to submit transaction");
      }
      if (sendTx.status === "PENDING") {
        let txResponse = await provider.getTransaction(sendTx.hash);
        //   we will continously checking the transaction status until it gets successfull added to the blockchain ledger or it gets rejected
        while (txResponse.status === "NOT_FOUND") {
          txResponse = await provider.getTransaction(sendTx.hash);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (txResponse.status === "SUCCESS") {
          let result = txResponse.returnValue;
          return result;
        }
      }
    } catch (err) {
      console.log("Catch-2", err);
      return;
    }
  }
  
  
  // function to interact with it's respective smart contract functions:
  
  // Working fine
  async function createUser(caller) {
    console.log(caller);
    let address=addressToScval(caller)  
    // try {
      const user = await contractInt(caller, "createUser", address);
      let createdUser = (user?._value[0]?._attributes?.val?._value?._value?._value.toString());
      console.log(user);
      console.log(createdUser)
      return createdUser;
    // } catch (error) {
    //   console.log("Account already connected");
    // }
  }
  
  
  // Working fine 
  async function upVote(caller, addr) {
    let address = addr;
    let values = address;
  
    try {
      const upvoted=await contractInt(caller, "upVote", values);
      let result = Number(upvoted?._value[1]?._attributes?.val?._value);
      console.log(upvoted);
    } catch (error) {
      console.log("Try again!!");
    }
  }
  
  async function downVote(caller, addr) {
    let address = addr;
    let values = address;
  
    try {
      const downvoted=await contractInt(caller, "downVote", values);
      let result = Number(downvoted?._value[2]?._attributes?.val?._value);
      console.log(downvoted);
      return result;
    } catch (error) {
      console.log("Try again!!");
    }
  }
  
  async function viewUser(caller, addr) {
    let address = addr;
    let values = address;
  
    // try {
      const user=await contractInt(caller, "viewUser", values);
      let createdUser = Number(user?._value[0]?._atrributes?.val?._value?._value?._value);
      console.log(createdUser);
      return createdUser;
    // } catch (error) {
    //   console.log("Try again!!");
    // }
  }
  
 
  
  
  
  export {
    createUser,
    upVote,
    downVote,
    viewUser
  };