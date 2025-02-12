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

export default function SectionAbout() {
  return (
    <div className='container mb-20'>
      <h1 className='w-[900px] border-t-2 pt-10 font-bold text-xl mb-5'>What you'll learn</h1>
        <div className='flex mt-5'>
          <ListItemsWithIcon text='Understand the core concepts of React' />
          <ListItemsWithIcon text='Understand the core concepts of React' />
          <ListItemsWithIcon text='Understand the core concepts of React' />
        </div>
    </div>
  )
}
