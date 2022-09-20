import React from 'react';

const Error: React.FC = () => {
  const text = 'Error 404. This page does not exist!';

  return (
    <h1>
      { text }
    </h1>
  );
};

export default Error;
