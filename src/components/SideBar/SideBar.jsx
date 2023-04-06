import { useState, useEffect } from 'react';
import axios from 'axios';
import './SideBar.scss';

export default function SideBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }
  
  function searchMonster() {
      if (searchQuery.trim() !== '') {
        axios.get(`http://localhost:8080/monsters?name=${searchQuery}`)
        .then((response) => {
          setSearchResult(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <div className='sidebar'>
      <h1 className='sidebar__title'>DND BattleMap</h1>
      <div>
        <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearch} />
        <button onClick={searchMonster}>Search</button>
      </div>
    </div>
  );
}
