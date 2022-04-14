import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Accordion } from "react-bootstrap";
import { PokeDetails } from "./intefaces";

export interface pokeData {
  pokemonsData: PokeDetails[];
}

export default function Pokemons({ pokemonsData }: pokeData) {
  return (
    <Row className="justify-content-md-center">
      {pokemonsData.map((pok) => (
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
                  <Accordion.Header>
                    <Row className="justify-content-md-center">
                      <Col md={12}>
                        <Row>
                          <Col md={12} className="text-center">
                            <h3 style={{ color: "#077FEA" }}>{pok.name}</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <h5>Types:</h5>
                          </Col>
                        </Row>
                        <Row>
                          {pok.types.map((typ, index) => (
                            <Col className="mx-3" md={12}>
                              <h6>{typ.type.name}</h6>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row className="">
                      <Col md={12}>
                        <h5>Height: {pok.height}</h5>
                      </Col>
                      <Col md={12}>
                        <h5>Weight: {pok.weight}</h5>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>
          </Accordion>
        </Col>
      ))}
    </Row>
  );
}
