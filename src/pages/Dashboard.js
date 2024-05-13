import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import AddIncome from '../components/Modals/AddIncome';
import AddExpense from '../components/Modals/AddExpense';
import Cards from '../components/Cards'
import {Modal} from 'antd';

const Dashboard = () => {

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    console.log("finish", values, type)

  }

  return (
    <div>
      <Header />
      <Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />

<AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>

<AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />

    </div>
  )
}

export default Dashboard