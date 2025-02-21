import DoneIcon from '@mui/icons-material/Done'

interface ListItemProps {
  text: string
}

const ListItemsWithIcon = (prop: ListItemProps) => {
  return (
    <p className='flex gap-2 mr-10'>
      <DoneIcon />
      {prop.text}
    </p>
  )
}

export default function CourseAbout({ courseDetails }: ICourseFull) {
  return (
    <div className=' mb-28'>
      <h1 className='w-[900px] border-t-2 pt-10 font-bold text-xl mb-5'>What you'll learn</h1>

      <div className='flex flex-wrap gap-4 md:grid md:grid-cols-3 mb-7'>
        {courseDetails?.learningOutcomes.map((item, idx) => (
          <ListItemsWithIcon key={idx} text={item} />
        ))}
      </div>
      {/**Video Display */}
      <video className='w-full max-h-[500px] border-2 rounded border-black' controls>
        <source src={courseDetails?.introURL} type='video/mp4'></source>
      </video>
    </div>
  )
}
