import './App.css';
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

function App() {

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = newKitFromWeb3(web3);

  return (
    <div className="App">
      <h1>Celo Social connect</h1>
    </div>
  );
}

export default App;
