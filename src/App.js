import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import TableData from './components/tabledata';
import About from './components/about';
import Footer from './components/footer';
import Main from './components/main';
import Header from './components/header';
import Todolist from './components/todolist';
import CardData from './components/cardData';
import Signup from './components/signup';
import Login from './components/login';
import Welcome from './components/welcome';
// import Singlepage_todolist from './components/singlepage_todolist';
import Pagination from './components/pagination/pagination';
import Newapi from './components/pagination/newapi';

function App() {
  return (
  <>
  <Header/>
  <div className='add-padding-top'></div>
  <main className='container'>
    <Routes basename='/new_react-project'>
      <Route path='/' element={<Main/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/table' element={<TableData/>}></Route>
       <Route path='/todo-list' element={<Todolist/>}></Route> 
      {/* <Route path='/singlepage_todolist' element={<Singlepage_todolist/>}></Route> */}
      <Route path='/pagination' element={<Pagination/>}></Route>
      <Route path='/newapi' element={<Newapi/>}></Route>     //new api
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/carddata/:id' element={<CardData/>}></Route>
      <Route path='/welcome' element={<Welcome/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </main>
    <div className='add-padding-bottom'></div>
    <Footer/>
  </>
  );
}

export default App;
