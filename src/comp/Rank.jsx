const Rank = ({name,entries}) => {
  console.log("Entries:", entries);
  return (
    <div>
        <p className='f4 flex justify-center'>{name}, your current entry count is....</p>
        <p className='f3 flex justify-center'>{entries}</p>
    </div>
  )
}

export default Rank