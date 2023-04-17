import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.scss';

export default function Footer({ username, setUsername }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setUsername('')
        navigate('/');
    };

    const isLoginPage = location.pathname === '/';

    return (
        <footer className="footer">
            <div className='footer__box'>
                <h2 className='footer__box--title'>DND BattleMap</h2>
                {isLoginPage ? (
                    <div className='footer__box--user'>
                        <p className='footer__box--author'>{username}</p>
                    </div>
                ) : (
                    <div className='footer__box--user'>
                        <p className='footer__box--author'>{username}</p>
                        <button className='footer__box--logout' onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </footer>
    );
}
