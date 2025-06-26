const Image = ({ imageUrl, onInputChange, onDetect }) => {
  return (
    <div style={{ justifyItems: "center" }}>
      <p>Wanna find the faces? Just put your image link here 👇</p>
      <div className='imge pa4 br3 shadow-5'>
        <input
          className='f4 pa2 w-70 center'
          type='text'
          value={imageUrl}
          onChange={onInputChange}
        />
        <button
          className='w-30 grow f4 link ph3 pv2 dib'
          onClick={onDetect}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default Image;
