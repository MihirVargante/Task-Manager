import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'
import Navigations from './components/Navigationbar'
import Signup from './registraion/Signup'
import Signin from './registraion/Signin'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import AddTask from './taskmanagement/AddTask'
import ViewTask from './taskmanagement/ViewTask'
import FrontPage from './pages/FrontPage'
import EditTask from './taskmanagement/EditTask'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      
      {/* <Signup/> */}
      {/* <Signin/> */}

    <Router>
        <Navigations/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/addtask" element={<AddTask/>}/>
        <Route path="/view/:id" element={<ViewTask/>}/>
        <Route path="/edit/:id" element={<EditTask/>}/>
        
      </Routes>
    </Router>
    </div>

  )
}

export default App

