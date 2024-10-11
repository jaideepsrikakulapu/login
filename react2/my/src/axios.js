import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with your API URL
    axios.get('http://127.0.0.1:8000')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default YourComponent;
