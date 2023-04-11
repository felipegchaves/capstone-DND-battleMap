import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

export default function LoginPage({ setUsername }) {
  const [usernameInput, setUsernameInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setUsername(usernameInput);
    navigate('/homepage');
  };

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
  };

  return (
    <div className='background'>
      <div className='login'>
        <h1 className='login__title'>DND BattleMap</h1>
        <form className='login__form' onSubmit={handleLogin}>
          <label>
            <span className='login__form--span'>Username:</span>
            <input className='login__form--username' type="text" name="username" value={usernameInput} onChange={handleUsernameChange} />
          </label>
          <button className='login__form--btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
