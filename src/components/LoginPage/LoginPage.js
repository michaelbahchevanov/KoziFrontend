import React from 'react';
import './LoginPage.css';
import Logo from './isaac-logo.png';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const history = useHistory();

  const toHome = (e) => {
    e && e.preventDefault();
    history.push('');
  };

  return (
    <div className='main-login'>
      <link
        href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        rel='stylesheet'
      />
      <div className='d-md-flex h-md-100 align-items-center'>
        <div className='col-md-6 pt-md-5 p-0 h-md-100 '>
          <div className='text-white  d-md-flex h-100 p-5'>
            <div className='p-md-5 pb-5'>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='col-8 col-md-8'>
                  <img className='img img-fluid' src={Logo} alt='LogoImage' />
                </div>
              </div>

              <hr />

              <p className='text-p-secondary h2 mt-5'>Login</p>

              <form className='mt-3'>
                <label htmlFor='email' className='text-p-secondary'>
                  Email
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
                    </span>
                  </div>
                  <input type='email' name='email' className='form-control' />
                </div>

                <label htmlFor='email' className='text-p-secondary mt-4'>
                  Password
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fa fa-unlock-alt' aria-hidden='true'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                  />
                </div>

                <div className='col-xl-6'>
                  <button
                    id='submitAction'
                    type='submit'
                    className='btn btn-p-primary btn-block btn-round mt-5  '
                  >
                    <span
                      id='main-executeAction'
                      className='text-p-primary text-font-primary'
                    >
                      Login
                    </span>
                  </button>
                </div>
              </form>

              <div className='col-xl-6'>
                <button
                  id='main-forgottenPassword'
                  type='submit'
                  className='btn btn-p-primary btn-block btn-round mt-3'
                >
                  <span className='text-p-primary text-font-secondary'>
                    Forgotten Password
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6 bg-blue '>
          <div className='d-flex flex-column align-items-center h-md-100  p-5 justify-content-center'>
            <h1 id='side-action' className='h1 text-white'>
              Guest
            </h1>
            <p id='side-description' className='text-white h4 text-center'>
              Enter to view real-time sensor information!
            </p>
            <a
              href='/'
              id='switcher'
              onClick={toHome}
              className='btn btn-round btn-switcher btn-lg btn-block mt-3'
            >
              Login as a guest
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
