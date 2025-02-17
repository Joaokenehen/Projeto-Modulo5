import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState<string>('');
  const [imgurl, setImgurl] = useState<string>('');

  useEffect(() => {
    axios.get<{ message: string; imgurl: string }>('http://localhost:5000/frontend')
      .then(response => {
        setMessage(response.data.message);
        setImgurl(response.data.imgurl);
      });
      
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <img src={imgurl} alt="img" />
    </div>
  )
}

export default App;
