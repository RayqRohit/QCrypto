import React, { useState, useEffect } from 'react'
import { Container, Box, Radio, RadioGroup, HStack, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import Loader from './Loader'
import axios from 'axios';
import { server } from "../index"
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import Chart from "./Chart"



const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArr, setChartArr] = useState([]);


  const params = useParams();


  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];


  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  const switchChartStats = (key) => {

    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);

        break;
      case "7d":
        setDays("7d");
        setLoading(true);

        break;
      case "14d":
        setDays("14d");
        setLoading(true);

        break;
      case "30d":
        setDays("30d");
        setLoading(true);

        break;
      case "60d":
        setDays("60d");
        setLoading(true);

        break;
      case "200d":
        setDays("200d");
        setLoading(true);

        break;
      case "1y":
        setDays("365d");
        setLoading(true);

        break;
      case "max":
        setDays("max");
        setLoading(true);

        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }

  }


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);


        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);


        // console.log(chartData.prices);

        // console.log(data);
        setCoin(data);
        setChartArr(chartData.prices);
        setLoading(false);
      }

      catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);


  // const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];



  if (error) return <ErrorComponent message={"Error while Fetching Coin"} />


  return (
    <Container maxW={"container.xl"}>

      {
        loading ? <Loader /> : (
          <>

            <Box w={"full"} borderWidth={1}>


              <Chart arr={chartArr} currency={currencySymbol} days={days} />



            </Box>


            {/* Button */}


            <HStack p={"4"} overflowX={"auto"}>

              {
                btns.map((i) => {
                  return (
                    <Button onClick={() => switchChartStats(i)} key={i}>{i}</Button>
                  )
                })
              }

            </HStack>




            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack direction='row' spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>



            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>

              <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>


                Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}


              </Text>


              <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />



              <Stat>

                <StatLabel>Name : {coin.name}</StatLabel>
                <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>


                <StatHelpText>

                  <StatArrow type={coin.market_data.price_change_percentage_24h_in_currency > 0 ? "increase" : "decrease"} />
                  {coin.market_data.price_change_percentage_24h_in_currency[currency].toFixed(2)}%

                </StatHelpText>


              </Stat>


              <Badge fontSize={"2xl"} paddingInline={"3"} bgColor={"blackAlpha.800"} color={"white"} borderRadius={"11"}>
                {`#${coin.market_cap_rank}`}
              </Badge>


              <CustomBar high={`${currency} ${coin.market_data.high_24h[currency]}`} low={`${currency} ${coin.market_data.low_24h[currency]}`} />


              <Box w={"full"} p={"4"} >

                <Item title={"Max supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
                <Item title={"All Time High"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />

              </Box>





            </VStack>



          </>
        )
      }

    </Container>
  )
}


const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"} fontFamily={"Montserrat"} letterSpacing={"widest"}>
      <Text>
        {title}
      </Text>
      <Text>
        {value}
      </Text>
    </HStack>
  )
}





const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>

    <Progress value={50} colorScheme='teal' w={"full"} />

    <HStack w={"full"} justifyContent={"space-between"}>


      <Badge children={low} colorScheme='red' />
      <Text fontSize={"small"}>24H Range</Text>
      <Badge children={high} colorScheme='green' />





    </HStack>

  </VStack>
)

export default CoinDetails