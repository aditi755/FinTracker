import React, {useState, useEffect} from 'react'
import { Table } from "antd"

const TransactionsTable = ({transactions}) => {
    const [searchTerm, setSearchTerm] = useState()

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Tag",
          dataIndex: "tag",
          key: "tag",
        },
      ];
  return (
    <div>
        <Table dataSource={transactions} columns={columns}/>
    </div>
  )
}

export default TransactionsTable