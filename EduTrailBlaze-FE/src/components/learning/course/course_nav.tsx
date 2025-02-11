import CourseDetails from './course_details';

export default function Navigation() {
  return (
    <div className='bg-white h-[160px]'>
      <div className='container'>
        <div className='pt-3 flex relative border-b pb-6'>
          <img
            src='assets/Logos/instagram_logo.png'
            alt='asdsda'
            className='pt-5 w-7'
          />
          <p className='font-semibold text-xl pl-5 pt-5'>
            Game Design: Art and Concepts Specialization
          </p>
          <button className='bg-blue-700 text-white h-16  w-36  rounded-sm hover:bg-blue-600 absolute right-0'>
            Enroll
            <p className='text-sm'>Starts Dec 2</p>
          </button>
        </div>
      </div>
        <CourseDetails/>
    </div>
  );
}
