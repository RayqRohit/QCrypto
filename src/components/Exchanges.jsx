import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import {server} from "../index"
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try{
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      }

      catch(err){
      setError(err.message);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);


  if(error) return <ErrorComponent message={"Error while Fetching"}/>

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url, message }) => {
  return (
    <a href={url} target='_blank' rel="noopener noreferrer" >
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        _hover={{ transform: "scale(1.1)" }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
