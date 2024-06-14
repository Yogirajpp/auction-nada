import React, { useState } from 'react';
import Bidder from './Bidder';
import Node from './Node';
import Result from './Result';

const Auction = ({ nillionClient }) => {
  const [bids, setBids] = useState({});
  const [winner, setWinner] = useState(null);

  const handleBid = (bidderId, bidValue) => {
    setBids((prevBids) => ({
      ...prevBids,
      [bidderId]: parseInt(bidValue)
    }));
  };

  const runAuction = async () => {
    try {
      const result = await nillionClient.run('firstPriceAuction', [bids]);
      setWinner(result);
    } catch (error) {
      console.error("Error running auction:", error);
    }
  };

  return (
    <div>
      <h1>TinyBid: Secure Single-Item First-Price Auction</h1>
      <div className="bidders">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Bidder key={idx} id={idx} onBid={handleBid} />
        ))}
      </div>
      <button onClick={runAuction}>Run Auction</button>
      {winner && <Result winner={winner} />}
      <div className="nodes">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Node key={idx} id={idx} bids={bids} />
        ))}
      </div>
    </div>
  );
};

export default Auction;
