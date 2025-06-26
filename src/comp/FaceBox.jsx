const FaceBox = ({ imageUrl, faces }) => {
  const calculateBoxStyle = (box) => {
    const image = document.getElementById('inputImage');
    const width = image?.width || 0;
    const height = image?.height || 0;

    return {
      left: box.left_col * width,
      top: box.top_row * height,
      right: width - box.right_col * width,
      bottom: height - box.bottom_row * height,
    };
  };

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        {faces.map((face, index) => {
          const style = calculateBoxStyle(face);
          return <div key={index} className="bounding-box" style={style}></div>;
        })}
      </div>
    </div>
  );
};

export default FaceBox;
