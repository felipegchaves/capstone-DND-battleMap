import { useState, useEffect } from 'react';
import axios from 'axios';
import './SideBar.scss';

export default function SideBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [searchResult, setSearchResult] = useState(null);

    function handleSearch(event) {
        setSearchQuery(event.target.value);
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
        setSearchQuery(selectedMonsterName);
        setAutocompleteResults([]);
        searchMonster(selectedMonsterName);
    }

    function searchMonster(name) {
        axios
        .get(`http://localhost:8080/monsters?name=${name || searchQuery}`)
        .then((response) => {
            setSearchResult(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        searchMonster();
    }

    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    return (
        <div className="sidebar">
            <h1 className="sidebar__title">DND BattleMap</h1>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                onKeyUp={handleAutocomplete}
            />
            <ul className='autocomplete'>
                {autocompleteResults.map((monster, index) => (
                <li key={monster.id} data-index={index} onClick={handleAutocompleteSelection}>
                    {monster.index}
                </li>
                ))}
            </ul>
            <button className='sidebar__searchBtn' type="submit">Search</button>
            </form>
        </div>
    );
}
