import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Accordion } from "react-bootstrap";

export interface Type {
  type: {
    name: string;
  };
}
export interface PokeDetails {
  name: string;
  height: string;
  weight: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Type[];
}
export interface Pokemnos {
  name: string;
  url: string;
  details: PokeDetails;
}
export interface Api {
  results: Pokemnos[];
}
function App() {
  const [pokemons, setPokemons] = useState<PokeDetails[]>([]);
  const [limit, setLimit] = useState(20);

  const fetchApi = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=" + limit)
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
  }, [limit]);

  function changeLimit(x: any) {
    //console.log(api?.results);
    //setLimit(limit + x);
  }
  return (
    <Container>
      <Button onClick={() => changeLimit(1)}>ADD</Button>
      <Row className="justify-content-md-center">
        {pokemons.map((pok) => (
          <Col key={pok.name} className="text-center" md={6}>
            <Accordion>
              <Row>
                <Col>
                  <Image
                    width={150}
                    height={150}
                    src={pok.sprites.other["official-artwork"].front_default}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Accordion.Item eventKey={pok.name}>
                    <Accordion.Header>{pok.name}</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col md={12}>Height: {pok.height}</Col>
                        <Col md={12}>Weight: {pok.weight}</Col>
                        {pok.types.map((typ) => (
                          <Col md={12}>{typ.type.name}</Col>
                        ))}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
              </Row>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
