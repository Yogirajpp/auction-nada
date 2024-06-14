import React from 'react';

const Node = ({ id, bids }) => {
  return (
    <div>
      <h2>Node {id}</h2>
      <div>Masked Bids: {JSON.stringify(bids)}</div>
      <div>Secret Share of Outcome: {JSON.stringify(bids)}</div>
    </div>
  );
};

export default Node;
