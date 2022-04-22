import './App.css';
import Web3 from 'web3';
// import Contract from 'web3-eth-contract'
import { contractAbi, contractAddress } from './utils/constants';
import { useState } from 'react';

// I had to downgrade react scripts to 4.0.3 from 5.0.1
// to import web 3. It is because of the webpack versions
// There is another workaround to this issue by installing
// many packages and creating own config
// https://github.com/ChainSafe/web3.js#web3-and-create-react-app

const web3 = new Web3(window.ethereum)
const greeterContract = new web3.eth.Contract(contractAbi, contractAddress);

const App = () => {
  const [newGreetings, setNewGreetings] = useState("");

  // console.log(window.ethereum)

  const greetMe = async () => {
    const greetMsg = await greeterContract.methods.greet().call()
    console.log(greetMsg)
  }

  const updateGreets = async () => {
    const greetMsg = await greeterContract.methods.setGreeting(newGreetings).send({ from: window.ethereum.selectedAddress })
    console.log(greetMsg)
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
    </div>
  );
}

export default App;
