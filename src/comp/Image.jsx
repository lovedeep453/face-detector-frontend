const Image = ({ imageUrl, onInputChange, onDetect }) => {
  return (
    <div className='tc'>
      <p className='f4'>"Got a photo? Paste the link below and watch the magic happen ✨"</p>
      <div className='pa4 br4 shadow-1 center'>
        <input
          className='f4 pa2 w-70 center br2'
          type='text'
          value={imageUrl}
          onChange={onInputChange}
        />
        <button
          className='w-30 br4 grow f4 link ph3 pv2 dib white bg-light-purple ml2'
          onClick={onDetect}
        >Detect</button>
      </div>
    </div>
  );
};


export default Image;
