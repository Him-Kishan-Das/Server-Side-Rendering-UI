import React from 'react';
import './App.css';
import AllForms from './pages/AllForms';
import Form from './pages/Form';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'; // Correct import
import FormStep from './pages/FormStep';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes> {/* Wrap Routes around your Route components */}
          <Route path='/forms' element={<AllForms />} />
          <Route path='/forms/service/:serviceId' element={<Form />} />
          <Route path='/service/:serviceId/step/:stepId' element={<FormStep />} />
        </Routes>
    </div>
  );
}

export default App;