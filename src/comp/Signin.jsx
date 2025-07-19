import React, { useState } from 'react'

const Signin = ({state,onclick,loaduser}) => {
  const [sie,setsie]=useState('');
  const [sip,setsip]=useState('');
  const onec=(e)=>{
    setsie(e.target.value);
  } ;
  const onpc=(e)=>{
    setsip(e.target.value);
  };
  const onsubsi=()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: sie,
        passward: sip
      })
    }).then(response => response.json())
    .then(user => {
      if (user.id) { 
        loaduser(user);
        onclick(state);
      } else {  
        console.error('Error signing in:', user);
      }
    })
    console.log('Email:', sie, '| Password:', sip);
  };
  return (
    <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" 
                htmlFor="email-address">Email</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={onec}
                />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" 
                htmlFor="password">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={onpc}
                />
            </div>
            </fieldset>
            <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value={state} 
            onClick={(e)=>{e.preventDefault();onsubsi();}}
            />
            </div>
        </form>
        </main>
        </article>
    </div>
  )
}

export default Signin