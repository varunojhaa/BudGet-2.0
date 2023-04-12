import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
  
    // Get the username and password from the input fields
    const inputUsername = event.target.querySelector('input[type="text"]').value;
    const inputPassword = event.target.querySelector('input[type="password"]').value;
  
    // Check if the username and password match with the stored user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.username === inputUsername && userData.password === inputPassword) {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    // Save the new user data in local storage
    localStorage.setItem('userData', JSON.stringify({ username, password }));
    setSignUp(false);
    setUsername('');
    setPassword('');
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, []);

  if (signUp) {
    return (
      <LoginPageStyled bg={bg} className="LoginPage">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            Username:
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit">Sign Up</button>
          <button onClick={() => setSignUp(false)}>Cancel</button>
        </form>
      </LoginPageStyled>
    );
  }

  if (!loggedIn) {
    return (
      <LoginPageStyled bg={bg} className="LoginPage">
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" />
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <button type="submit">Login</button>
        </form>
        <button onClick={() => setSignUp(true)}>Sign Up</button>
      </LoginPageStyled>
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const LoginPageStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 20px;
    animation: slideInDown 0.5s ease;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: slideInUp 0.5s ease;
    
    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    
      input {
        padding: 5px;
        margin-top: 5px;
        border: none;
        border-bottom: 2px solid #0077FF;
        transition: border-color 0.2s ease;
        
        &:focus {
          border-color: #005FCC;
        }
      }
    }
    
    button {
      padding: 10px;
      margin-top: 20px;
      background-color: #0077FF;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    
      &:hover {
        background-color: #005FCC;
      }
    }
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    color: #0077FF;
    animation: slideInUp 0.5s ease;

    &:hover {
      color: #005FCC;
    }
  }

  /* Keyframe animations */

  @keyframes slideInDown {
    from {
      transform: translateY(-50%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(50%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${(props) => props.bg});
    position: relative;
    main {
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #ffffff;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  `;

export default App;