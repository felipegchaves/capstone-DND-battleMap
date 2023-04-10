import React, { useState } from 'react';
import './AddPlayer.scss'
import playerToken1 from '../../assets/PlayerIcons/playerToken1.png';
import playerToken2 from '../../assets/PlayerIcons/playerToken2.png';
import playerToken3 from '../../assets/PlayerIcons/playerToken3.png';
import playerToken4 from '../../assets/PlayerIcons/playerToken4.png';

export default function AddPlayer({ closeModal, addPlayer }) {
    const [name, setName] = useState('');
    const [hp, setHp] = useState('');
    const [selectedToken, setSelectedToken] = useState(1);

    const playerTokens = [
        { id: 1, image: playerToken1 },
        { id: 2, image: playerToken2 },
        { id: 3, image: playerToken3 },
        { id: 4, image: playerToken4 }
    ];

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleHpChange(event) {
        setHp(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const selectedTokenImage = playerTokens.find(token => token.id === selectedToken)?.image;
        addPlayer(name, hp, selectedTokenImage);
    }      

    function handleTokenSelect(tokenId) {
        setSelectedToken(tokenId);
    }

    return (
        <div className='modal'>
        <h2 className='modal__title'>Add Player</h2>
        <form className='modal__context' onSubmit={handleSubmit}>
            <div className='modal__context--inputs'> 
                <label>
                Player Name: 
                <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                Player HP: 
                <input type="number" value={hp} onChange={handleHpChange} />
                </label>
            </div>
            <div className="modal__context--iconSelector">
            {playerTokens.map(token => (
                <img
                    key={token.id}
                    src={token.image}
                    alt={`Player Token ${token.id}`}
                    onClick={() => handleTokenSelect(token.id)}
                    className={selectedToken === token.id ? 'selected' : ''}
                />
                ))}
            </div>
            <div className='btn__container'>
                <button className='modal__context--btn' type="submit">Add</button>
                <button className='modal__context--btn' onClick={closeModal}>Close</button>
            </div>
        </form>
        </div>
    );
}