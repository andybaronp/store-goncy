import React, { FC, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { Product } from '../product/types'
import { Button, Grid, Link, Stack, Text, Flex, Image } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../product/api'

interface Props {
  productos: Product[]
}

const IndexRoute: FC<Props> = ({ productos }) => {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(null)

  function parseCurrency(value: number): string {
    return value.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
    })
  }
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `📎- ${product.title} - ${parseCurrency(product.price)}\n`
            ),
          ``
        )
        .concat(
          `\nTotal:
           ${parseCurrency(
             cart.reduce((total, producto) => total + producto.price, 0)
           )}`
        ),
    [cart]
  )

  return (
    <Stack>
      <Stack spacing={6}>
        <Grid
          templateColumns='repeat(auto-fill, minmax(250px,1fr))'
          gridGap={6}
        >
          {productos.map((product) => (
            <Stack
              spacing={3}
              key={product.id}
              backgroundColor='gray.100'
              padding={4}
              borderRadius='sm'
            >
              <Image
                as={motion.img}
                cursor='pointer'
                layoutId={product.image}
                src={product.image}
                alt='img'
                objectFit='cover'
                //maxHeight={128}
                borderTopRadius={6}
                onClick={() => setSelectedImage(product.image)}
              />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text fontSize='medium' fontWeight='500' color='gray.500'>
                  {parseCurrency(product.price)}
                </Text>
              </Stack>
              <Button
                size='sm'
                onClick={() => setCart((cart) => cart.concat(product))}
                colorScheme='primary'
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex
              alignItems='center'
              justifyContent='center'
              position='sticky'
              bottom='0'
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              padding={4}
            >
              <Button
                width='fit-content'
                href={`https://wa.me/573152204136?text=${encodeURIComponent(
                  text
                )}`}
                isExternal
                as={Link}
                colorScheme={'whatsapp'}
                leftIcon={
                  <Image
                    src='https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff'
                    alt='icon'
                  />
                }
              >
                Completar pedido {cart.length} productos
              </Button>
            </Flex>
          )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key='backdrop'
            alignItems='center'
            as={motion.div}
            backgroundColor='rgba(0,0,0,0.5)'
            justifyContent='center'
            layoutId={selectedImage}
            position='fixed'
            top='0'
            left='0'
            width='100%'
            height='100%'
            onClick={() => setSelectedImage(null)}
          >
            <Image key='image' src={selectedImage} alt='imgAnimation' />
          </Flex>
        )}
      </AnimatePresence>
    </Stack>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async () => {
  const productos = await api.list()

  return {
    props: {
      productos,
    },
    revalidate: 2000,
  }
}
export default IndexRoute
