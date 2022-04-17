import React, { FC, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { Product } from '../product/types'
import { Button, Grid, Link, Stack, Text } from '@chakra-ui/react'
import api from '../product/api'

interface Props {
  productos: Product[]
}

const IndexRoute: FC<Props> = ({ productos }) => {
  const [cart, setCart] = useState<Product[]>([])
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
      <Grid templateColumns='repeat(auto-fill, minmax(250px,1fr))' gridGap={6}>
        {productos.map((product) => (
          <Stack key={product.id} backgroundColor='gray.100'>
            <Text>{product.title}</Text>
            <Text>{parseCurrency(product.price)}</Text>
            <Button
              onClick={() => setCart((cart) => cart.concat(product))}
              colorScheme='blue'
            >
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Button
          href={`https://wa.me/573152704286?text=${encodeURIComponent(text)}`}
          isExternal
          as={Link}
          colorScheme={'whatsapp'}
        >
          Completar pedido {cart.length} productos
        </Button>
      )}
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