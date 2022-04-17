import React, { FC } from 'react'

import { AppProps } from 'next/app'

import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import theme from '../theme'

import '../styles/globals.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius='sm'
          backgroundColor='white'
          boxShadow='md'
          marginY={4}
          maxWidth={'container.xl'}
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              src='https://picsum.photos/150/150'
              alt='imag'
              borderRadius={9999}
            />
            <Heading>Tienda xxxxx</Heading>
            <Text>El almacen xxxx</Text>
          </VStack>
          <Divider />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
