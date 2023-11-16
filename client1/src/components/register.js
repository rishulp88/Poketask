import React, { useState } from 'react';
import auth from '../auth';

import apiService from '../apiService'
import { useNavigate, Link } from 'react-router-dom';
import './register-page.css';

const initialState = {
  email: '',
  password: '',
  firstName: '',
};

const Register = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { firstName, email, password } = state;
    const user = { firstName, email, password };
    const res = await apiService.register(user);
    if (res.error) {

      alert(`${res.message}`);
      setState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName
    );
  };

  return (
    <section className='container main'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>

      <h2 className='h2'>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className='field'
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input className='field'
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input className='field'
          type="text"
          placeholder="Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
      <Link to="/login" className='add-task login' >Login</Link>

    </section>

  );
};

export default Register;
