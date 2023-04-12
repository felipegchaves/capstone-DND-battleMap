import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'
import axios from 'axios';
import './SideBar.scss';
import RenderMonsterCard from '../RenderMonstercard/RenderMonsterCard';
import AddPlayer from '../AddPlayer/AddPlayer';
import Modal from 'react-modal';
import RenderPlayerCard from '../RenderPlayerCard/RenderPlayerCard';
import { API_URL } from "../../utils/api";
import { CLIENT_URL } from '../../utils/client';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function SideBar({ addToken, addMonsterToken, addPlayerToken }) {
    const [search, setSearch] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const prevSearchResultsRef = useRef(searchResults);


    useEffect(() => {
        axios.get(`${API_URL}/list`)
        .then(response => {
            setSearchResults(response.data);
        })
        .catch(error => {
            console.log('yikers', error);
        });
    }, []);


useEffect(() => {
    async function saveResults() {
        if (prevSearchResultsRef.current !== searchResults) {
        try {
            await axios.post(`${API_URL}/list`, searchResults);
            prevSearchResultsRef.current = searchResults;
        } catch (error) {
            console.error(error);
        }
        }
    }
    saveResults();
}, [searchResults]);

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleAutocomplete(event) {
        const searchName = event.target.value.trim();
        if (searchName !== '') {
            axios
            .get(`${API_URL}/monsters?autocomplete=${searchName}`)
            .then((response) => {
                setAutocompleteResults(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setAutocompleteResults([]);
        }
    }

    function handleAutocompleteSelection(event) {
        const selectedMonsterName = event.target.textContent;
        setSearch(selectedMonsterName);
        setAutocompleteResults([]);
        searchMonster(selectedMonsterName);
    }

    function searchMonster(name) {
        axios
            .get(`${API_URL}/monsters?name=${name || search}`)
            .then((response) => {
            const monsterData = response.data;
            monsterData.tokenNumber = 0;
            monsterData.id = searchResults.length;
            setSearchResults((prevSearchResults) => [...prevSearchResults, monsterData]);
            setSearch('');
            })
            .catch((error) => {
            console.error(error);
            });
    }

    function handleRemoveCard(id) {
        setSearchResults((prevSearchResults) => {
            const updatedResults = [...prevSearchResults];
            const index = updatedResults.findIndex((result) => result.id === id);
            updatedResults.splice(index, 1);
            return updatedResults;
        });
    }

    function handleAddPlayer(playerName, playerHp, selectedTokenImage) {
        const newPlayer = {
            name: playerName,
            hit_points: playerHp,
            icon: `${CLIENT_URL}${selectedTokenImage}`
        };
        setSearchResults((prevSearchResults) => [...prevSearchResults, newPlayer]);
        setShowModal(false);
    }

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }
    return (
        <div className="sidebar">
            <h1 className="sidebar__title">BattleMap</h1>
            <form onSubmit={(event) => {event.preventDefault(); searchMonster(search);}}>
                <input
                    type="text"
                    placeholder="Search Monster"
                    value={search}
                    onChange={handleSearch}
                    onKeyUp={handleAutocomplete}
                />
                <ul className={autocompleteResults.length > 0 ? "autocomplete" : "autocomplete hidden"}>
                    {autocompleteResults.map((monster, index) => (
                    <li className='autocomplete__item' key={monster.index} data-index={index} onClick={handleAutocompleteSelection}>
                        {monster.index}
                    </li>
                    ))}
                </ul>
                <button className="sidebar__searchBtn" type="submit">
                    Search
                </button>
            </form>
                <Modal appElement={document.getElementById('root')} className='modal__container' isOpen={showModal} onRequestClose={handleCloseModal}>
                    <AddPlayer closeModal={handleCloseModal} addPlayer={handleAddPlayer} />
                </Modal>
            <button className="sidebar__addBtn" onClick={handleOpenModal}>
            Add Player
            </button>
            <ul className="list">
            {searchResults.map((result, index) => (
                <li key={result.id || index}>
                {result.challenge_rating ? (
                    <RenderMonsterCard 
                        addToken={addToken}
                        addMonsterToken={addMonsterToken}
                        monster={result} 
                        index={index} 
                        removeCard={() => handleRemoveCard(result.id)} 
                    />
                ) : (
                    <RenderPlayerCard 
                        addToken={addToken}
                        addPlayerToken={addPlayerToken}
                        player={result} 
                        index={index} 
                        removeCard={() => handleRemoveCard(result.id)}
                    />
                )}
                </li>
            ))}
            </ul>
        </div>
    );
}      