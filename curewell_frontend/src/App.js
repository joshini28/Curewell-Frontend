import React from 'react'
import "./App.css"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Doctor from './Pages/Doctor'
import AddDoctor from './Components/Doctor/Addoctor'
import UpdateDoctor from './Components/Doctor/UpdateDoctor'
import Specialization from './Pages/Specialization/index'
import UpdateSpecialization from './Components/Specialization/UpdateSpecialization/index'
import UpdateSurgery from './Components/Surgery/UpdateSurgery/index'
import AddSpecialization from './Components/Specialization/AddSpecialization/index'
import Doctor_Specialization from './Pages/Doctor_specialization/index'
import Surgery from './Pages/Surgery/index'
import AddDoctor_Specialization from './Components/Doctor_Specialization/AddDoctorSpecialization/index'
import AddSurgery from './Components/Surgery/AddSurgery/index'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/doctor' element={<Doctor />} />
      <Route path='/addDoctor' element={<AddDoctor />} />
      <Route path='/doctor/:id' element={<UpdateDoctor />} />
      <Route path='/specialization' element={< Specialization />} />
      <Route path='/addspecialization' element={< AddSpecialization />} />
      <Route path='/specialization/:id' element={<UpdateSpecialization />} />
      <Route path='/doctorSpecialization' element={<Doctor_Specialization />} />
      <Route path='/adddoctorSpecialization' element={<AddDoctor_Specialization />} />
      <Route path='/surgery' element={<Surgery />} />
      <Route path='/addsurgery' element={<AddSurgery />} />
      <Route path='/addsurgery/:id' element={<UpdateSurgery />} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App