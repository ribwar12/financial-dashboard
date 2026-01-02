    import { useState } from "react";
    import './App.css';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
    import { Pie } from 'react-chartjs-2';

    ChartJS.register(ArcElement, Tooltip, Legend);



    export default function Financial(){
      const [title, setTitle] = useState('');
      const [amount, setAmount] = useState('');

      const [expenses, setexpenses] = useState([
        { id: 1, title: 'gold', amount: 10 },
        { id: 2, title: 'silver', amount: 20 },
        { id: 3, title: 'bronze', amount: 30 } 
      ]);

    function addExpense(e){
       e.preventDefault();

      if (title === '' || amount === '' || isNaN(Number(amount)))
        return;

      let newExpense = {
        id: Date.now() ,
        title: title ,
        amount: Number(amount)
      }
      setexpenses([...expenses , newExpense]);
      setTitle('');
      setAmount('');
    }

    function deleteExpense(id) {
      setexpenses(expenses.filter(item => item.id != id));
    }



      const chartData = {
      labels: expenses.map(e => e.title),
      datasets: [
        {
          data: expenses.map(e => Number(e.amount)),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };



      return(
        <>
        <div className="min-h-screen bg-gray-100 p-10 font-sans">
            <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
              Financial<span className="text-blue-600">Dashboard</span>
            </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
                Add Transaction
              </h2>

               <form onSubmit={addExpense} className="flex flex-col gap-4">
        <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
         <div className="flex gap-4">
        <input  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Amount ($)" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
        <button  type="submit"  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"> Add expenses</button>
        </div>
        </form>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-700 mb-4 self-start">analytics</h2>
         <div className="w-64">
      <Pie data={chartData} />
        </div>
        </div>
        </div>
        
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-700 mb-6">History</h2>
            {expenses.length === 0 ? (
              <p className="text-center text-gray-400 py-10">nothing to show</p>
            ) : (
        <ul className="space-y-3">
          {expenses.map((expense)=>(
            <li key={expense.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition">
              <span className="font-bold text-gray-800"> {expense.title}</span>
              <div className="flex items-center gap-4">
              <span className="font-bold text-lg"> ${expense.amount}</span>
              <button className="text-gray-300 hover:text-red-500 transition font-bold" onClick={() => {deleteExpense(expense.id)}}>X</button>
              </div>
            </li>
          ))}

        </ul>
            )}
        </div>
        </div>
        
        </div>
        </div>
        </div>
        </>
      )
    }