import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface loginProps {
  username: string,
  setUsername: Function
}

const Login = (props:loginProps) => {
  let navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  async function handleClick() {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    console.log(username.value);
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      props.setUsername(username.value)
      navigate('/home');
    } else if (response.status === 400) {
      setAlertMessage(data.message || 'Bad Request');
      setAlertVisible(true);

      // Automatically hide the alert after 2 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  }

  return (
    <div className="bg-default">
      {alertVisible && (
        <div className="alert alert-error ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6  bg-secondary rounded-md shadow-lg border-top lg:max-w-lg z-50">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full input input-bordered"
                id="username"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered"
                id="password"
              />
            </div>
            <a href="#" className="text-xs hover:underline">
              Forget Password?
            </a>
            <div>
              <button

                type='button'
                className='btn btn-block'
                onClick={handleClick}>
                Login
              </button>
            </div>
            <div>
        <button
          type="button"
          className="btn btn-block"
          onClick={() => navigate('/signup')}
        >
          Don't have an account?
        </button>
      </div>
          </form>
          
        </div>
      </div>
      {/* This is for the glowing background */}
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className="glowing">
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
    </div>
  );
};
export default Login;
