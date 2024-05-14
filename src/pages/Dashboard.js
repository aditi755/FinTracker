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
import TransactionsTable from '../components/TransactionsTable'

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false) 
  const [user] = useAuthState(auth)
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  
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
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  
  };

  
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("transaction added successfully")
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("couldn't added transactions")
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [user])

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


  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Calculate the initial balance, income, and expenses

  return (
    <div>
      <Header />
      {loading ? (<p>Loading...</p>) : ( <><Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      income={income}
      expenses={expenses}
      totalBalance={totalBalance}
      />

<AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>

<AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />

   <TransactionsTable transactions={transactions} />    
    </> 
   )}
  </div>
   )}

export default Dashboard