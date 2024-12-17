import DoneIcon from '@mui/icons-material/Done';

const listItems = [
  'Ways to create and describe a game concept',
  'Concepts and approaches involved in creating successful character designs',
  'Evaluation and interpretation of different story styles',
];
interface ListItemProps {
  text: string;
}

const ListItemsWithIcon = (prop: ListItemProps) => {
  return (
    <p className='flex gap-2 mr-10'>
      <DoneIcon />
      {prop.text}
    </p>
  );
};

export default function CourseAbout() {
  return (
    <div className='container mb-14'>
      <h1 className='w-[900px] border-t-2 pt-10 font-bold text-xl mb-5'>What you'll learn</h1>
      {[...Array(3)].map((_, index) => (
        <div className='flex mt-5' key={index}>
          {listItems.map((item, idx) => (
            <ListItemsWithIcon key={idx} text={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
