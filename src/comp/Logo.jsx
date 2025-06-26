import Tilt from 'react-parallax-tilt'
import brain from'./brain.png'
const Logo = () => {
  return (
      <Tilt
        className="tilt-box br2 shadow-2"
        options={{ max: 90}} style={{height:150,width:150}}
      >
       <div className='tilt-image flex items-center justify-center'>
          <img style={{padding:20}}alt='logo' src={brain}/>
       </div>
      </Tilt>
  )
}
export default Logo