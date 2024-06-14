import React, { useState, useEffect } from 'react';
import Auction from './components/Auction';

function App() {
  const [nillion, setNillion] = useState(null);
  const [nillionClient, setNillionClient] = useState(null);

  // Asynchronously Import JavaScript Client package
  useEffect(() => {
    const importNillion = async () => {
      const nillionPackage = await import('@nillion/nillion-client-js-browser');
      setNillion(nillionPackage);
    };
    importNillion();
  }, []);

  // Initialize NillionClient, connecting to Nillion Network
  useEffect(() => {
    const initializeNillionClient = async () => {
      try {
        if (nillion) {
          await nillion.default();
          const node_key = nillion.NodeKey.from_base58(
            process.env.REACT_APP_NILLION_NODEKEY_TEXT_PARTY_1
          );
          const user_key = nillion.UserKey.from_base58(
            process.env.REACT_APP_NILLION_USERKEY_TEXT_PARTY_1
          );
          const bootnodes_web = [process.env.REACT_APP_NILLION_WEBSOCKETS];
          const paymentsConfig = {
            rpc_endpoint: process.env.REACT_APP_NILLION_BLOCKCHAIN_RPC_ENDPOINT,
            smart_contract_addresses: {
              blinding_factors_manager:
                process.env.REACT_APP_NILLION_BLINDING_FACTORS_MANAGER_SC_ADDRESS,
              payments: process.env.REACT_APP_NILLION_PAYMENTS_SC_ADDRESS,
            },
            signer: {
              wallet: {
                chain_id: parseInt(process.env.REACT_APP_NILLION_CHAIN_ID || 0),
                private_key: process.env.REACT_APP_NILLION_WALLET_PRIVATE_KEY,
              },
            },
          };
          // create new instance of NillionClient
          const client = new nillion.NillionClient(
            user_key,
            node_key,
            bootnodes_web,
            paymentsConfig
          );
          // set state access to nillionClient
          setNillionClient(client);
        }
      } catch (error) {
        console.error("Error initializing Nillion client:", error);
      }
    };
  
    // initialize client if it doesn't exist yet
    if (nillion && !nillionClient) {
      initializeNillionClient();
    }
  }, [nillion, nillionClient]);
  

  return (
    <div className="App">
      {nillionClient ? (
        <Auction nillionClient={nillionClient} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
