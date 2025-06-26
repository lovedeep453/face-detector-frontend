import './App.css';
import Navigation from './comp/Navigation';
import Logo from './comp/Logo'
import Image from './comp/Image'
import FaceBox from './comp/FaceBox'
import "tachyons"
import Rank from './comp/Rank';
import { useEffect, useMemo, useState,} from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import axios from 'axios';

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [faces, setFaces] = useState([]);
  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    console.log(e.target.value);
    setFaces([]); // Reset face boxes on new input
  };
  const handleDetect = async () => {
    try {
      const response = await axios.post('/api/face-detect', { imageUrl });
      const regions = response.data.outputs[0].data.regions;

      const faceBoxes = regions.map(region => region.region_info.bounding_box);
      setFaces(faceBoxes);
    } catch (err) {
      console.error("Face detection failed:", err);
    }
  };
  useEffect(() => {
    initParticlesEngine(async(engine)=>{await loadSlim(engine);});
  }, []);
  const particlesLoaded = (container) => {
      console.log(container);
  };
  const options = useMemo(() => ({
      fpsLimit: 120,
      interactivity: {
        events: {onClick: {enable: true,mode: "push",},onHover: {enable: true,mode: "repulse",},},
        modes: {push: {quantity: 4,},repulse: {distance: 75,duration: 0.4,},},
      },
      particles: {
        links: {distance: 100,enable: true,opacity: 0.3,width: 1,},
        move: {direction: "none",enable: true,outModes: {default: "bounce",},random: false,speed: 3,straight: false,},
        number: {density: {enable: true,},value: 800,},
        opacity: {value: 0.3,},
        size: {value: { min: 1, max: 5 },},
      },
      detectRetina: true,
  }),[],);

  return <>
    <div className='app'>
      <Particles className='particles'
            particlesLoaded={particlesLoaded}
            options={options}
      />
      <Navigation/>
      <Logo/>
      <Rank/>
      <Image imageUrl={imageUrl} onInputChange={handleInputChange} onDetect={handleDetect}/>
      {imageUrl && <FaceBox imageUrl={imageUrl} faces={faces} />}
    </div>
  </>;
}

export default App;
