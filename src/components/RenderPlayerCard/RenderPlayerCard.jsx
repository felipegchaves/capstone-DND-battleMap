import React from 'react';
import './RenderPlayerCard.scss';

export default function RenderPlayerCard({ player, removeCard, addPlayerToken }) {
    return (
            <div className="list__item card">
                <h2 className="card__name">{player.name}</h2>
                <p className="card__hitPoints">{player.hit_points}</p>
                <img className='card__img' src={player.icon} alt="player Image" />
                <button className='card__remove--btn mobile__size' onClick={() => addPlayerToken(player)}>add</button>
                <button className="card__remove--btn" onClick={removeCard}>Remove</button>
            </div>
    );
}
