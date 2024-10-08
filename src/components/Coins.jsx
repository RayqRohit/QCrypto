import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, HStack, Button, Radio, RadioGroup } from '@chakra-ui/react';
import { server } from "../index"
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");


  // defining the currency symbol based on the currency
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  const changePage = (page) => {


    setPage(page);
    setLoading(true);

  }


  const btns = new Array(132).fill(1)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        // console.log(data);
        setCoins(data);
        setLoading(false);
      }

      catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);


  if (error) return <ErrorComponent message={"Error while Fetching Coins"} />

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>


          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack direction='row' spacing={"4"}>
              <Radio value={"inr"}>₹</Radio>
              <Radio value={"usd"}>$</Radio>
              <Radio value={"eur"}>€</Radio>
            </HStack>
          </RadioGroup>


          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>

            {
              btns.map((item, index) => (
                <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              ))
            }



          </HStack>



        </>
      )}
    </Container>
  );
};


export default Coins;
