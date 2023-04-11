import { useNavigate } from 'react-router-dom';
import './Footer.scss';

export default function Footer({ username, setUsername }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUsername('')
        navigate('/');
    };

    return (
        <footer className="footer">
            <div className='footer__box'>
                <h2 className='footer__box--title'>DND BattleMap</h2>
                <div className='footer__box--user'>
                    <p className='footer__box--author'>{username}</p>
                    <button className='footer__box--logout' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </footer>
    );
}
