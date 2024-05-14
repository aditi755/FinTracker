import React from 'react'
import { Card, Row } from 'antd'
import './styles.css'
import Button from '../Button'
const Cards  = ({showExpenseModal, showIncomeModal, income, expenses, totalBalance}) => {
  return (
    <div>
    <Row className="my-row">
     <Card bordered={true} className="my-card">
     <h2>Current Balance</h2>
     <p>${totalBalance}</p>
     <Button text="Reset Balance" blue={true}/>
     </Card>

     <Card className="my-card" bordered={true}>
     <h2>Total Income</h2>
     <p>${income}</p>
     <Button text="Reset Balance" blue={true} onClick={showIncomeModal}/>
     </Card>

     <Card className="my-card" bordered={true}>
     <h2>Total Expenses</h2>
     <p>${expenses}</p>
     <Button text="Reset Balance" blue={true} onClick={showExpenseModal}/>
     </Card>
</Row>

    </div>
  )
}

export default Cards