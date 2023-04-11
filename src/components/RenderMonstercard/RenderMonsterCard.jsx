import './RenderMonsterCard.scss'
import anonMonster from '../../assets/monsterQuestionMark.png'


export default function RenderMonsterCard({ monster, index, removeCard, addMonsterToken }) {
    return (
        <div className="list__item card">
            <h2 className="card__name">{monster.name}</h2>
            <p className="card__hitPoints">{monster.hit_points}</p>
            {monster.image ? (
            <img className="card__img" src={`https://www.dnd5eapi.co${monster.image}`} alt={monster.name} />
            ) : (
            <img className="card__img" src={anonMonster} alt={monster.name} />
            )}
            <button className='card__remove--btn mobile__size' onClick={() => addMonsterToken(monster)}>add</button>
            <button className='card__remove--btn' onClick={removeCard}>Remove</button>
        </div>
    );
}