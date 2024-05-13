import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import AddIncome from '../components/Modals/AddIncome';
import AddExpense from '../components/Modals/AddExpense';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query} from 'firebase/firestore';
import { db, auth } from '../firebase'
import Cards from '../components/Cards'
import {Modal} from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment'

const Dashboard = () => {
  // const transactions = [
  //   {
  //     type: 'income',
  //     amount: 1200,
  //     tag: 'salary',
  //     name: 'income 1',
  //     date: "2023-05-15"
  //   }
  // ]

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false) 
  const [user] = useAuthState(auth)
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
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
  
  };

  
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  async function fetchTransactions() {
    setLoading(true)
    if(user){
      const q = query(collection(db, `users/${user.uid}/transactions`))
      const querySnapshot = await getDocs(q)
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        console.log("doc-data",doc.data())
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray)
      console.log("transactions", transactionsArray)
      toast.success("Transactios Fetched")
    }
    setLoading(false)
  }

  return (
    <div>
      <Header />
      {loading ? (<p>Loading...</p>) : ( <><Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />

<AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>

<AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />
       
    </> 
   )}
  </div>
   )}

export default Dashboard