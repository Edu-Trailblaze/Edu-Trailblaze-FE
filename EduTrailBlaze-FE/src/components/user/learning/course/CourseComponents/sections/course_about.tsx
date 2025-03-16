import DoneIcon from '@mui/icons-material/Done'

interface ListItemProps {
  text: string
}

const ListItemsWithIcon = ({ text }: ListItemProps) => {
  return (
    <div className='flex items-center gap-3 p-3 rounded-lg transition-all duration-300 h-full'>
      <div className='text-green-600 flex-shrink-0'>
        <DoneIcon />
      </div>
      <p className='font-medium'>{text}</p>
    </div>
  )
}

export default function CourseAbout({ courseDetails }: ICourseFull) {
  const parseLearningOutcomes = (outcomes: string[] | undefined): string[] => {
    if (!outcomes || outcomes.length === 0) return []

    return outcomes
  }

  const learningOutcomes = parseLearningOutcomes(courseDetails?.learningOutcomes)

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8 pt-6 border-t-2 md:text-3xl'>What you'll learn</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
        {learningOutcomes.map((item, idx) => (
          <ListItemsWithIcon key={idx} text={item} />
        ))}
      </div>

      <div className='w-full max-w-6xl mx-auto aspect-video bg-black overflow-hidden rounded-xl shadow-lg border border-blue-300 mb-20'>
        <video className='w-full h-full object-cover' controls poster='/assets/video-poster.jpg'>
          <source src={courseDetails?.introURL} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
