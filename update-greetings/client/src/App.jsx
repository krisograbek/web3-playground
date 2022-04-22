import './App.css';
import Web3 from 'web3';
// import Contract from 'web3-eth-contract'
import { contractAbi, contractAddress } from './utils/constants';
import { useEffect, useState } from 'react';

// I had to downgrade react scripts to 4.0.3 from 5.0.1
// to import web 3. It is because of the webpack versions
// There is another workaround to this issue by installing
// many packages and creating own config
// https://github.com/ChainSafe/web3.js#web3-and-create-react-app


// using web3 and metamask
// const web3 = new Web3(window.ethereum)
// const greeterContract = new web3.eth.Contract(contractAbi, contractAddress);

// using local node
const web3 = new Web3("ws://localhost:8545")
const greeterContract = new web3.eth.Contract(contractAbi, contractAddress);


const App = () => {
  const [newGreetings, setNewGreetings] = useState("");
  const [greetings, setGreetings] = useState("")

  // console.log(web3)
  useEffect(() => async () => {
    const greetMsg = await greetMe()
    setGreetings(greetMsg);
  }, [])


  const greetMe = async () => {
    const greetMsg = await greeterContract.methods.greet().call()
    return greetMsg;
  }

  const updateGreets = async () => {
    // if i want to console log
    const greetMsg = await greeterContract.methods.setGreeting(newGreetings).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' })
    console.log(greetMsg)
    setGreetings(await greetMe())
    // await greeterContract.methods.setGreeting(newGreetings).send()
  }

  return (
    <div className="App">
      <button onClick={() => greetMe()}>
        Greet me!
      </button>
      <br />
      <input placeholder="New greetings" type="text" value={newGreetings} onChange={(e) => setNewGreetings(e.target.value)} />
      <button onClick={() => updateGreets()}>
        Update Greetings
      </button>
      <h3>Current Greetings: {greetings}</h3>
    </div>
  );
}

export default App;
