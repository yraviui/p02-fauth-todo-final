import React from "react";
import TodosApp from "./todosapp/TodosApp";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { AuthContextProvider } from "./context/AuthContext";
import TestingaPage from "./pages/TestingaPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/test' element={<TestingaPage />} />
        <Route path='/todos' element={
          <ProtectedRoute>
            <TodosApp />
          </ProtectedRoute>
        }
        />
      </Routes>
    </AuthContextProvider>
  )
}

export default App;
