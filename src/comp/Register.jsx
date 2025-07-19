import { useState } from 'react';

const Register = ({ state, onclick, loaduser }) => {
  const [sie, setsie] = useState('');
  const [sip, setsip] = useState('');
  const [sin, setsin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onsubsi = () => {
    setError('');
    setSuccess('');
    if (!sin || !sie || !sip) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(sie)) {
      setError('Invalid email format.');
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sin,
        email: sie,
        passward: sip,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.id) {
          loaduser(data);
          onclick(state);
          setSuccess('Registered successfully!');
        } else if (data === 'email exists') {
          setError('Email already exists. Try logging in.');
        } else {
          setError('Registration failed. Try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Server error. Please try again later.');
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Full Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                id="name"
                onChange={(e) => setsin(e.target.value)}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                id="email-address"
                onChange={(e) => setsie(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                id="password"
                onChange={(e) => setsip(e.target.value)}
              />
            </div>
          </fieldset>

          {/* Display error or success */}
          {error && (
            <div className="red f6 mv2">{error}</div>
          )}
          {success && (
            <div className="green f6 mv2">{success}</div>
          )}

          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value={state}
              onClick={(e) => {
                e.preventDefault();
                onsubsi();
              }}
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
