import { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); 
  const API_ENDPOINT = 'https://restcountries.com/v3.1/all';

  async function fetchApi() {
    try {
      let res = await fetch(API_ENDPOINT);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchData = await res.json();
      setData(fetchData);
      setOriginalData(fetchData); 
    } catch (error) {
      console.error("API Error:", error.message);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  function handleChange(e) {
    const searchItem = e.target.value.toLowerCase();
    if (searchItem === '') {
    
      setData(originalData);
    } else {
      
      const filteredData = originalData.filter(country =>
        country.name.common.toLowerCase().includes(searchItem)
      );
      setData(filteredData);
    }
  }

  return (
    <>
      <div className="input-container">
        <input type="text" placeholder="Search for countries" className="search" onChange={handleChange} />
      </div>
      <div className="countryCard">
        {data.length > 0 ? (
          data.map(({ name, flags, cca3 }) => (
            <div key={cca3} className="country">
              <img src={flags.svg} alt={name.common} style={{ width: '100px', height: '100px' }} />
              <h2>{name.common}</h2>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </>
  );
}

export default App;
