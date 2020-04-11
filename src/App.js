import React, {useState, useEffect} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get(`/repositories`).then(response => {
      setRepositories(response.data.results);
    });
  },[])

  async function handleAddRepository() {
    const response = await api.post(`/repositories`,{
      title: `Construído as ${Date.now()}` ,
      url: "https://github.com/WandersonMJ",
      techs: ["NodeJs", "React Native", "ReactJs"]
    });
    setRepositories([...repositories, response.data.repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repository=> repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repository=>(
         <>
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        </>
      ))}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
