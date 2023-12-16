import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
  
    
    useEffect(() => {
      RPokemon(setLoading, setPokemonRList, false);
      
      const onScroll = () => {
        if (window.scrollY == 0) RPokemon(setLoading, setPokemonRList, true);
      };
      // clean up code
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    },[])

  return (
    <IonPage>
      <IonHeader>

        <IonTitle><h1>Pokémon Rand<span></span>m</h1></IonTitle>
        <p>Swipe up to show more Pokémons</p>

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">

          <IonTitle size="large">Pokémon Rand<span></span>m</IonTitle>
          <p>Swipe up to show more Pokémons</p>
  
        </IonHeader>
        
        <div>
          {loading && pokemonRList.map((el) => {
            return <ExploreContainer number={el} key={el}/>
          })}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
