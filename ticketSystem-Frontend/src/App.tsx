import './App.css'
import CustomerComponent from './components/CustomerComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListCustomerComponents from './components/ListCustomerComponents'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            {/* http://localhost:5173*/}
            <Route path='/' element ={<ListCustomerComponents/>}></Route>

            {/* http://localhost:5173/customers*/}
            <Route path='/customers' element ={<ListCustomerComponents/>}></Route>

            {/* http://localhost:5173/add-customer*/}
            <Route path='/add-customer' element ={<CustomerComponent/>}></Route>

            {/* http://localhost:5173/edit-customer/1*/}
            <Route path='/edit-customer/:id' element ={<CustomerComponent/>}></Route>
          </Routes>
        
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
