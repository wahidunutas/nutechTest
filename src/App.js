import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import BarangList from './Components/BarangList';
import BarangForm from './Components/BarangForm';
import BarangFormUpdate from './Components/BarangFormUpdate';
import Login from './Components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Components/costume.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decryptText = (encryptedText) => {
          const decryptedText = atob(encryptedText);
          return decryptedText;
        };
        const users = [
          { username: 'user1' },
          { username: 'user2' },
          { username: 'user3' },
        ];
        const dec = decryptText(token);
        const user = users.find((user) => user.username === dec);

        if (user) {
          setIsLogin(true);
        } else {
          alert('Cih Manual')
          setIsLogin(false);
          localStorage.removeItem('token');
        }

      } catch (error) {
        alert('Cih Manual')
        localStorage.removeItem('token');
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Container>
      <Router>
        <div className='cards'>
          <Routes>
            <Route path="/" element={isLogin ? <BarangList /> : <Login setLogin={setIsLogin} />} />
            <Route path="/tambah" element={isLogin ? <BarangForm /> : <Login setLogin={setIsLogin} />} />
            <Route path="/update/:id" element={isLogin ? <BarangFormUpdate /> : <Login setLogin={setIsLogin} />} />
            <Route path="/login" element={<Login setLogin={setIsLogin} />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;