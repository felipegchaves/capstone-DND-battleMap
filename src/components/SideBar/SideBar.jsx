import { useState } from 'react';
import axios from 'axios';
import './SideBar.scss';
import RenderMonsterCard from '../RenderMonstercard/RenderMonsterCard';
import AddPlayer from '../AddPlayer/AddPlayer';
import Modal from 'react-modal';
import RenderPlayerCard from '../RenderPlayerCard/RenderPlayerCard';

export default function SideBar() {
    const [search, setSearch] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleAutocomplete(event) {
        const searchName = event.target.value.trim();
        if (searchName !== '') {
            axios
            .get(`http://localhost:8080/monsters?autocomplete=${searchName}`)
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
        .get(`http://localhost:8080/monsters?name=${name || search}`)
        .then((response) => {
            setSearchResults((prevSearchResults) => [...prevSearchResults, response.data]);
            setSearch('');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function handleRemoveCard(index) {
        setSearchResults((prevSearchResults) => {
            const updatedResults = [...prevSearchResults];
            updatedResults.splice(index, 1);
            return updatedResults;
        });
    }

    function handleAddPlayer(playerName, playerHp, selectedTokenImage) {
        const newPlayer = {
            name: playerName,
            hit_points: playerHp,
            icon: `http://localhost:3000${selectedTokenImage}`
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
            <form>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearch}
                    onKeyUp={handleAutocomplete}
                />
                <ul className="autocomplete">
                    {autocompleteResults.map((monster, index) => (
                    <li key={monster.id} data-index={index} onClick={handleAutocompleteSelection}>
                        {monster.index}
                    </li>
                    ))}
                </ul>
                <button className="sidebar__searchBtn" type="submit">
                    Search
                </button>
            </form>
                <Modal className='modal__container' isOpen={showModal} onRequestClose={handleCloseModal}>
                    <AddPlayer closeModal={handleCloseModal} addPlayer={handleAddPlayer} />
                </Modal>
            <button className="sidebar__addBtn" onClick={handleOpenModal}>
            Add Player
            </button>
            <ul className="list">
            {searchResults.map((result, index) => (
                <li key={result.id || index}>
                {result.challenge_rating ? (
                    <RenderMonsterCard monster={result} index={index} removeCard={handleRemoveCard} />
                ) : (
                    <RenderPlayerCard player={result} index={index} removeCard={handleRemoveCard} />
                )}
                </li>
            ))}
            </ul>
        </div>
    );
}      