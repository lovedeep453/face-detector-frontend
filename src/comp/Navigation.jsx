const Navigation = ({ route, handle, handleSignOut }) => {
  return (
    <nav className='App-header'>
      {route === 'home' ? (
        <button
          className='w-20 br2 grow f4 link ph3 pv2 dib black bg-dark-red ml2'
          onClick={() => {handleSignOut();}}
        > Sign Out</button>
        
      ) : route === 'signin' ? (
        <button
          className='w-20 br2 grow f4 link ph3 pv2 dib black bg-dark-red ml2'
          onClick={() => { handle(route)}}
        > Register</button>
      ) : (
        <button
          className='w-15 br2 grow f4 link ph3 pv2 dib black bg-dark-red ml2'
          onClick={() => { handle(route)}}
        > Sign In</button>
      )}
    </nav>
  );
};

export default Navigation;