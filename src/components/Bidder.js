import React, { useState } from 'react';

const Bidder = ({ id, onBid }) => {
  const [bid, setBid] = useState(0);

  const handleBidChange = (e) => {
    setBid(e.target.value);
  };

  const submitBid = () => {
    onBid(id, bid);
  };

  return (
    <div>
      <h2>Bidder {id}</h2>
      <input type="number" value={bid} onChange={handleBidChange} />
      <button onClick={submitBid}>Bid</button>
    </div>
  );
};

export default Bidder;
