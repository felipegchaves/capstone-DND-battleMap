import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss'

export default function LoginPage() {
    const [username, setUsername] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // handle the login logic here
        // assuming the login is successful, redirect the user to the homepage
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div className='background'>
            <div className='login'>
                <h1 className='login__title'>DND BattleMap</h1>
                    <form className='login__form' onSubmit={handleLogin}>
                        <label>
                            Username:
                            <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                        </label>
                        <Link className='login__form--btn' to={`/homepage`} type="submit">Login</Link>
                    </form>
            </div>
        </div>
    );
}
