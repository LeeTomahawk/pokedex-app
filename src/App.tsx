import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./App.css";
import axios from "axios";
import Pokemons from "./components/pokemons";
import { PokeDetails } from "./components/intefaces";
import { Col, Row } from "react-bootstrap";

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
  function sortNameDESC() {
    let sortArray = [...pokemons].sort((a, b) => {
      return a.name > b.name ? -1 : 1;
    });
    setPokemons(sortArray);
  }
  function sortTypeASC() {
    let sortArray = [...pokemons].sort((a, b) => {
      return a.types[0].type.name > b.types[0].type.name ? 1 : -1;
    });
    setPokemons(sortArray);
  }
  function sortTypeDESC() {
    let sortArray = [...pokemons].sort((a, b) => {
      return a.types[0].type.name > b.types[0].type.name ? -1 : 1;
    });
    setPokemons(sortArray);
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <Button className="m-2 p-2" onClick={() => changeLimit()}>
            Add more pokemons
          </Button>
          <Button className="m-2 p-2" onClick={() => sortNameASC()}>
            Sort by name asc
          </Button>
          <Button className="m-2 p-2" onClick={() => sortNameDESC()}>
            Sort by name desc
          </Button>
          <Button className="m-2 p-2" onClick={() => sortTypeASC()}>
            Sort by first type asc
          </Button>
          <Button className="m-2 p-2" onClick={() => sortTypeDESC()}>
            Sort by first type desc
          </Button>
        </Col>
      </Row>
      <Pokemons pokemonsData={pokemons} />
    </Container>
  );
}

export default App;
