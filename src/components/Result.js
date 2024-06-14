import React from 'react';

const Result = ({ winner }) => {
  return (
    <div>
      <h2>Auction Result</h2>
      <p>Winning bidder ID: {winner}</p>
    </div>
  );
};

export default Result;
