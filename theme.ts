import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    primary: theme.colors['facebook'],
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'primary.50',
      },
    },
  },
})
