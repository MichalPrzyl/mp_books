import { IRow }  from './main-interfaces'

export const columns = [
    {
        name: 'ID',
        selector: (row: IRow) => row.id,
        grow: 0.1,
      },
    {
      name: 'Tytuł',
      selector: (row: IRow) => row.title,
      grow: 0.5,
    },
    {
      name: 'Autor',
      selector: (row: IRow) => row.author,
    },
     
  ]