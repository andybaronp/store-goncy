import axios from 'axios'
import Papa from 'papaparse'
import { Product } from './types'

const api = {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vRrvW2JtveaO2UJJL6iSrwABcEb5Icm7iHKaOxsvraTkoj44xwYB5ACftxSVGgKneM9l0HLCVVrErZZ/pub?output=csv`,
        {
          responseType: 'blob',
        }
      )
      .then(
        (res) =>
          new Promise<Product[]>((resolve, reject) => {
            //parsea a json el csv
            Papa.parse(res.data, {
              header: true,
              complete: (results) => {
                const productos = results.data as Product[]
                return resolve(
                  productos.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  }))
                )
              },
              error: (error) => reject(error),
            })
          })
      )
  },
}
export default api
