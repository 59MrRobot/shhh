import { useState } from 'react';
import './App.scss';
import CryptoJS from 'crypto-js';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [type, setType] = useState('Encrypt');

  const copy = () => {
    setInput(output);

    if (type === 'Encrypt') {
      setType('Decrypt');
    } else {
      setType('Encrypt');
    }

    setOutput('');
  }

  const handleClick = (event) => {
    event?.preventDefault();

    if (type === 'Encrypt') {
      const result = CryptoJS.AES.encrypt(input, process.env.REACT_APP_PRIVATE_KEY).toString();

      setOutput(result);
    } else {
      const bytes = CryptoJS.AES.decrypt(input, process.env.REACT_APP_PRIVATE_KEY).toString(CryptoJS.enc.Utf8);

      setOutput(bytes);
    }
  }

  return (
    <div className="App">
      <h1 className="App__title">Shhh!</h1>
      <h2 className="App__subtitle">Encrypt/Decrypt Your Secrets.</h2>

      <div className="App__selector">
        <label htmlFor="encrypt" onClick={() => { setType('Encrypt'); }}>
          <input
            type="radio"
            name="type"
            id="encrypt"
            checked={type === 'Encrypt'}
          />
          Encrypt
        </label>

        <label htmlFor="decrypt" onClick={() => { setType('Decrypt'); }}>
          <input
            type="radio"
            name="type"
            id="decrypt"
            checked={type === 'Decrypt'}
          />
          Decrypt
        </label>
      </div>

      <form className="form" onSubmit={handleClick}>
        <textarea
          value={input}
          rows={8}
          onChange={(event) => setInput(event.target.value)}
          className="form__textarea"
        />

        <div className="form__container">
          <button onClick={() => handleClick()} className="form__button">
            {type === 'Encrypt' ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}

            <span>{type}</span>
          </button>
        </div>
      </form>

      {output.length
        ? (
          <div className="App__output">
            <p>{output}</p>

            <ContentCopyIcon onClick={() => copy()} style={{ cursor: 'pointer' }}/>
          </div>
        )
        : null
      }
    </div>
  );
}

export default App;
