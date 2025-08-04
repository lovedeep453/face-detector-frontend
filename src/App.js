import './App.css';
import Navigation from './comp/Navigation';
import Logo from './comp/Logo';
import Image from './comp/Image';
import FaceBox from './comp/FaceBox';
import "tachyons";
import Rank from './comp/Rank';
import Signin from './comp/Signin';
import Register from './comp/Register';
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";


function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [faces, setFaces] = useState([]);
  const [state, setState] = useState('signin'); // default is signin
  const [route, setRoute] = useState('signin');
  const [userState, setUserState] = useState({
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  });
  const { id, name, email, entries, joined } = userState.user; 
  const loadUser = (data) => {
    setUserState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };
  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setFaces([]);
  };
  const handleSignout = () => {
    setUserState({
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    });
    setImageUrl('');
    setFaces([]);
    setRoute('signin');
    setState('signin');
  };

  const handleSignin = () => {
    setState('home');
    setRoute('home'); // go to home after successful sign in/register
  };

  const handleRouteChange = () => {
  if (route === 'home') {
    setRoute('signin');
    setState('signin'); // Sign out, go back to signin form
  } else if (route === 'signin') {
    setRoute('register');
    setState('register');
  } else {
    setRoute('signin');
    setState('signin');
  }
  };

// In your React component (frontend)
const handleDetect = async () => {
  if (!imageUrl) {
    console.error('No image URL provided');
    return;
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Face detection failed: ${response.status} ${response.statusText}. ${errorText}`);
    }
    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error(`Invalid JSON from face detection API: ${jsonError.message}`);
    }
    const { boxes } = result;
    if (!Array.isArray(boxes)) {
      console.warn('No bounding boxes returned');
      setFaces([]);
    } else {
      setFaces(boxes);
    }
    if (id) {
      try {
        const entriesRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        if (!entriesRes.ok) {
          const errText = await entriesRes.text();
          throw new Error(`Entries update failed: ${entriesRes.status} ${entriesRes.statusText}. ${errText}`);
        }
        const newEntries = await entriesRes.json();
        if (typeof newEntries === 'number') {
          setUserState(prev => ({
            ...prev,
            user: { ...prev.user, entries: newEntries }
          }));
        } else {
          console.error('Unexpected entries response:', newEntries);
        }
      } catch (entriesError) {
        console.error('Failed to update entries:', entriesError.message);
      }
    }
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      console.error('Network error - server may be down:', err.message);
    } else {
      console.error('Face detection error:', err.message);
    }
    setFaces([]); 
  }
};


  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);
  useEffect(() => {
  if (state !== 'home') {
    setImageUrl('');
    setFaces([]);
  }
}, [state]);

  const options = useMemo(() => ({
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 75, duration: 0.4 },
      },
    },
    particles: {
      links: { distance: 100, enable: true, opacity: 0.3, width: 1 },
      move: { enable: true, speed: 3, outModes: { default: "bounce" } },
      number: { value: 800, density: { enable: true } },
      opacity: { value: 0.3 },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  }), []);

  return (
    <div className='app'>
      <Particles className='particles' particlesLoaded={() => {}} options={options} />
      <Navigation route={route} handle={handleRouteChange} handleSignOut={handleSignout}/>
      {state === 'signin' ? (
        <Signin loaduser={loadUser} state={state} onclick={handleSignin} />
      ) : state === 'register' ? (
        <Register loaduser={loadUser} state={state} onclick={handleSignin} />
      ) : (
        <div>
          <Logo />
          <Rank entries={entries} name={name}/>
          <Image imageUrl={imageUrl} onInputChange={handleInputChange} onDetect={handleDetect} />
          {imageUrl && (<FaceBox imageUrl={imageUrl} faces={faces} />)}
        </div>
      )}
    </div>
  );
}

export default App;
