import './RenderMonsterCard.scss'
import anonMonster from '../../assets/monsterQuestionMark.png'


export default function RenderMonsterCard({ monster, index, removeCard}) {
    return (
        <div className="list__item card">
            <h2 className="card__name">{monster.name}</h2>
            <p className="card__hitPoints">{monster.hit_points}</p>
            <img className="card__img" src={monster.image ? `https://www.dnd5eapi.co${monster.image}` : anonMonster} alt={monster.name}/>
            <button className='card__remove--btn' onClick={removeCard}>Remove</button>
        </div>
    );
}
