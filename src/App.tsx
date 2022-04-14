import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Accordion } from "react-bootstrap";
import Pokemons from "./components/pokemons";
import { PokeDetails } from "./components/intefaces";

function App() {
  const [pokemons, setPokemons] = useState<PokeDetails[]>([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const fetchApi = async () => {
    await axios
      .get(
        "https://pokeapi.co/api/v2/pokemon?limit=" +
          limit +
          "&&offset=" +
          offset
      )
      .then(async (res) => {
        const poke: Array<PokeDetails> = [...pokemons];
        for (let i = 0; i < limit; i++) {
          let det = await axios.get<PokeDetails>(res.data.results[i].url);
          poke.push({
            name: res.data.results[i].name,
            height: det.data.height,
            weight: det.data.weight,
            sprites: det.data.sprites,
            types: det.data.types,
          });
        }
        setPokemons([...poke]);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [limit, offset]);

  function changeLimit() {
    setOffset(offset + 20);
    setLimit(20);
  }
  function sortNameASC() {
    let sortArray = [...pokemons].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setPokemons(sortArray);
  }
  return (
    <Container>
      <Button onClick={() => changeLimit()}>ADD</Button>
      <Button onClick={() => sortNameASC()}>sort</Button>
      <Pokemons pokemonsData={pokemons} />
    </Container>
  );
}

export default App;
