import 'ldrs/helix';

const Loader = () => {
  return (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center'>
          <l-helix
              size="100"
              speed="2.5"
              color="white"
          ></l-helix>
   </div>
  )
}

export default Loader