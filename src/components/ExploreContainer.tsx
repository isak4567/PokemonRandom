import { useState, useEffect } from 'react';
import './ExploreContainer.css';

interface ContainerProps { 
  number:any
}


const ExploreContainer: React.FC<ContainerProps> = ({number}) => {

  const [data, setData] = useState<any>({});
  const [loadP, setLoadP] = useState(false);

  useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`)
       .then(response => response.json())
       .then(data => {
       setData(data);
       setLoadP(true);
       })
  }, [])
  
  return (
      <div className="rPokemons">
          {loadP && 
          (<div className="pokemon" >
          
              <div className="pokemon-content">
                  <img src={data.sprites.front_default} />

                  <div className="pokemonInfo">
                      <div className="pI-container"> 
                          <p className="pIC-title">Name</p>
                          <p className="pIC-data">{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                      </div>

                      <div className="pI-container"> 
                          <p className="pIC-title">Weight</p>
                          <p className="pIC-data">{data.weight || ''} pound</p>
                      </div>

                      <div className="pI-container"> 
                          <p className="pIC-title">Height</p>
                          <p className="pIC-data">{data.height} feet</p>
                      </div>

                      <div className="pI-container"> 
                          <p className="pIC-title">Initial Experience</p>
                          <p className="pIC-data">{data.base_experience | 0} exp</p>
                      </div>
                  </div>

              </div>

              <div className="pokemon-moveset">
                  <p className="pM-title">Moveset</p>
                  {data.moves.slice(0, 4).map((el: any) => {
                      return <div className="move">{el.move.name.charAt(0).toUpperCase() + el.move.name.slice(1)}</div>
                  })}
              </div>
          </div>)
          }
      </div>
  );
};

export default ExploreContainer;
