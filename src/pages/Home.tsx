import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, ScrollDetail } from '@ionic/react';
import { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

function RPokemon(setLoading: Function, setPokemonRList: Function, condicion: boolean) {
  let list = [];

  if (condicion) {
    list = JSON.parse(localStorage.getItem("pokemonList") || "") ;
  }

  for (let i = 0; i < 4; i++) {
      let rNumber = Math.floor(Math.random() * 1000);

      while (list.includes(rNumber)) {
          rNumber = Math.floor(Math.random() * 1000);
      }

      list.unshift(rNumber);
  }

  localStorage.setItem("pokemonList", JSON.stringify(list));
  setPokemonRList(list);
  setLoading(true);
  console.log(list);
}


const Home: React.FC = () => {

  // Valores de los input
  const [pokemonRList, setPokemonRList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onScroll = ($event: CustomEvent<ScrollDetail>) => {

    if ($event && $event.detail && $event.detail.scrollTop == 0) {
      RPokemon(setLoading, setPokemonRList, true);  
    }
  }

  
  useEffect(() => {
    RPokemon(setLoading, setPokemonRList, false);
  },[])

  return (
    <IonPage >
      <IonHeader>

        <IonTitle>
          <h1>Pokémon Rand<span></span>m</h1>
          <p>Swipe up to show more Pokémons</p>
        </IonTitle>
        
      </IonHeader>
      <IonContent fullscreen scrollEvents={true} onIonScroll={(e) => onScroll(e)}>
        <IonHeader collapse="condense">

          <IonTitle size="large">
            <h1>Pokémon Rand<span></span>m</h1>
            <p>Swipe up to show more Pokémons</p>
          </IonTitle>
  
        </IonHeader>
        
        <div className="pokemon-list">
          {loading && pokemonRList.map((el) => {
            return <ExploreContainer number={el} key={el}/>
          })}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
