import React from 'react'
import { Box, Stack, VStack ,Avatar, Text} from '@chakra-ui/react'

const Footer = () => {
    return (
        <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"}
            px={"16"} py={["16", "8"]}>



            <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>


                <VStack w={"full"} alignItems={["center", "flex-start"]}>


                    <Text fontWeight={"bold"}>About Us</Text>
                    <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]}>We are the best Crypto Trading App in India, We Provide Guidance at very reasonable Price.</Text>
                    
                </VStack>
                <VStack>

                    <Avatar boxSize={28} mt={[20,0]}/>

                    <Text>Rayq Rohit</Text>
                    
                </VStack>


            </Stack>

        </Box>
    )
}

export default Footer