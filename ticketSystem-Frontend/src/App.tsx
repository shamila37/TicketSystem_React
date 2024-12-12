import "./App.css";
import CustomerComponent from "./components/CustomerComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListCustomerComponents from "./components/TablePages/ListCustomerTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListVendorComponents from "./components/TablePages/ListVendorTable";
import VendorComponent from "./components/VendorComponent";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import EventDetails from "./components/EventDetails";
import EventTable from "./components/TablePages/EventTable";
import AddEvent from "./components/AddEvents";

function App() {
  return (
    <>
      <div
        style={{
          // backgroundImage:`url(${image})`,
          // height: "100vh",
          backgroundColor: "#006144",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          minHeight: "100vh", 
          padding: "20px"
        }}
      >
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            {/* http://localhost:5173*/}
            <Route path="/" element={<Login />}></Route>

            {/* http://localhost:5173/customers*/}
            <Route
              path="/customers"
              element={<ListCustomerComponents />}
            ></Route>

            {/* http://localhost:5173/add-customer*/}
            <Route path="/add-customer" element={<CustomerComponent />}></Route>

            {/* http://localhost:5173/edit-customer/1*/}
            <Route
              path="/edit-customer/:id"
              element={<CustomerComponent />}
            ></Route>

            {/* http://localhost:5173/vendors*/}
            <Route path="/vendors" element={<ListVendorComponents />}></Route>

            {/* http://localhost:5173/add-vendors*/}
            <Route path="/add-vendor" element={<VendorComponent />}></Route>

            {/* http://localhost:5173/edit-vendors/1*/}
            <Route
              path="/edit-vendor/:id"
              element={<VendorComponent />}
            ></Route>

            {/* http://localhost:5173/home*/}
            <Route path="/home" element={<HomePage />}></Route>

            {/* http://localhost:5173/viewEvents*/}
            <Route path="/viewEvents" element={<AddEvent />}></Route>

            {/* http://localhost:5173/events/1*/}
            <Route path="/events/:id" element={<EventDetails />}></Route>

            {/* http://localhost:5173/events*/}
            <Route path="/events" element={<EventTable />}></Route>

            {/* http://localhost:5173/events*/}
            <Route path="/events" element={<EventTable />}></Route>

          </Routes>

          <FooterComponent />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
