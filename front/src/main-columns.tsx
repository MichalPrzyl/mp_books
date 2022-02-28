import { IRow }  from './main-interfaces'

export const columns = [
    {
        name: 'ID',
        selector: (row: IRow) => row.id,
      },
    {
      name: 'Tytuł',
      selector: (row: IRow) => row.title,
    },
    {
      name: 'Autor',
      selector: (row: IRow) => row.author,
    },
  ]