import { IRow } from '../interfaces/row-interfaces'

export const columns = [
    {
      name: 'Tytuł',
      selector: (row: IRow) => row.title,
    },
    {
      name: 'Autor',
      selector: (row: IRow) => row.author,
    },
  ]