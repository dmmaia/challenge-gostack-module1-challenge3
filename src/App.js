import React, {useState, useEffect} from "react";
import {IoIosHeartEmpty} from 'react-icons/io'

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [like, setLike] = useState();

  useEffect(()=>{
    api.get('repositories').then(response =>{
        setRepositories(response.data);
    })
  }, [like]);
  
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      "title": "Back-end com NodeJS",
      "url": "github.com",
      "techs": "NodeJS"
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response =>{
      setRepositories(repositories.filter(repositore=>repositore._id !== id));
    });
  }

  async function handleAddLike(id){
    api.post(`repositories/${id}/like`).then(response =>{
      like>0?setLike(like+1):setLike(1);setLike('');
    })

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositore =>(
            <li key={repositore._id}>
              {repositore.title}<span>{(repositore.likes)>0?repositore.likes:like}</span>
              <IoIosHeartEmpty onClick={()=>handleAddLike(repositore._id)} />

              <button onClick={() => handleRemoveRepository(repositore._id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
