import { Container } from "postcss"
import Header from "./components/Header"
import Products from "./components/Products"
import { Outlet } from "react-router-dom"
import './App.css'
function App() {
  

  return (
    <>
    <div className="bg-gray-500 min-h-screen">
      <Header/>
      <Outlet/>
    
     </div>
    </>
  )
}

export default App
