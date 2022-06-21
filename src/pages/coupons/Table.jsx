import React from 'react'
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
     const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });
  return (
    <div>Table</div>
  )
}

export default Table