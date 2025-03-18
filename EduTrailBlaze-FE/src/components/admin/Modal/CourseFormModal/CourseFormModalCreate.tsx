// import React, { useState } from 'react'
// import { Modal, Box, Typography, IconButton } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close'
// import { z } from 'zod'
// import { CourseCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/courses/page'

// import InputText from '@/components/global/Input/InputText'
// import InputFile from '@/components/global/Input/InputFile'
// import InputNumber from '@/components/global/Input/InputNumber'
// import InputSelect from '@/components/global/Input/InputSelect'
// import Button from '@/components/global/Button/Button'

// const courseSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   imageURL: z.any(),
//   introURL: z.any(),
//   description: z.string().min(1, 'Description is required'),
//   price: z.number().positive('Price must be greater than zero'),
//   difficultyLevel: z.string().min(1, 'Difficulty level is required'),
//   prerequisites: z.string().min(1, 'Prerequisites are required'),
//   learningOutcomes: z.array(z.string().min(1, 'Each learning outcome must have content'))
// })

// type CourseFormModalCreateProps = {
//   initialValues: CourseCreate
//   setNewCourse: React.Dispatch<React.SetStateAction<CourseCreate>>
//   onSubmit: (formValues: CourseCreate) => void
//   onCancel: () => void
//   isOpen: boolean
// }

// export default function CourseFormModalCreate({
//   initialValues,
//   setNewCourse,
//   onSubmit,
//   onCancel,
//   isOpen
// }: CourseFormModalCreateProps) {
//   const [formValues, setFormValues] = useState(initialValues)
//   const [errors, setErrors] = useState<{
//     title?: string
//     description?: string
//     imageURL?: string
//     introURL?: string
//     price?: string
//     difficultyLevel?: string
//     prerequisites?: string
//     learningOutcomes?: string
//   }>({})

//   const handleChange = (field: keyof CourseCreate, value: any) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [field]: value
//     }))
//     setNewCourse((prev) => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const handleSubmit = () => {
//     const result = courseSchema.safeParse(formValues)
//     if (!result.success) {
//       const newErrors: any = {}
//       result.error.errors.forEach((err) => {
//         newErrors[err.path[0]] = err.message
//       })
//       setErrors(newErrors)
//     } else {
//       setErrors({})
//       onSubmit(formValues)
//       setFormValues(initialValues)
//     }
//   }

//   return (
//     <Modal
//       open={isOpen}
//       onClose={onCancel}
//       sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           maxWidth: 550,
//           bgcolor: 'white',
//           p: 4,
//           borderRadius: 3,
//           border: '1px solid #ccc',
//           position: 'relative',
//           display: 'flex',
//           flexDirection: 'column',
//           maxHeight: '80vh'
//         }}
//       >
//         <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
//           <CloseIcon />
//         </IconButton>
//         <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
//           CREATE A COURSE
//         </Typography>

//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
//           <InputText
//             noLayout
//             label='Title'
//             name='title'
//             placeholder='Enter course title'
//             value={formValues.title}
//             onChange={(e) => handleChange('title', e.target.value)}
//             required
//             helperText={errors.title}
//           />

//           <InputFile
//             label='Upload Image'
//             name='imageURL'
//             accept='image/*'
//             onChange={(e) => {
//               const file = e.target.files?.[0]
//               handleChange('imageURL', file)
//             }}
//             noLayout
//           />
//           {errors.imageURL && (
//             <Typography color='error' variant='body2'>
//               {errors.imageURL}
//             </Typography>
//           )}

//           <InputFile
//             label='Upload Intro'
//             name='introURL'
//             accept='video/*'
//             onChange={(e) => {
//               const file = e.target.files?.[0]
//               handleChange('introURL', file)
//             }}
//             noLayout
//           />
//           {errors.introURL && (
//             <Typography color='error' variant='body2'>
//               {errors.introURL}
//             </Typography>
//           )}

//           <InputText
//             noLayout
//             label='Description'
//             name='description'
//             placeholder='Enter description'
//             value={formValues.description}
//             onChange={(e) => handleChange('description', e.target.value)}
//             required
//             helperText={errors.description}
//           />

//           <InputNumber
//             noLayout
//             label='Price'
//             name='price'
//             placeholder='Enter price'
//             value={formValues.price}
//             onChange={(e) => handleChange('price', Number(e.target.value))}
//             required
//             subtitle={errors.price}
//           />

//           <InputSelect
//             label='Difficulty'
//             name='difficultyLevel'
//             value={formValues.difficultyLevel}
//             onChange={(e) => handleChange('difficultyLevel', e.target.value)}
//             options={[
//               { label: 'Select Difficulty', value: '' },
//               { label: 'Beginner', value: 'Beginner' },
//               { label: 'Intermediate', value: 'Intermediate' },
//               { label: 'Advanced', value: 'Advanced' }
//             ]}
//             required
//             subtitle={errors.difficultyLevel}
//             noLayout
//           />

//           <InputText
//             noLayout
//             label='Prerequisites'
//             name='prerequisites'
//             placeholder='Enter prerequisites'
//             value={formValues.prerequisites}
//             onChange={(e) => handleChange('prerequisites', e.target.value)}
//             required
//             helperText={errors.prerequisites}
//           />

//           {/* Learning Outcomes (InputText textarea) */}
//           <InputText
//             label='Learning Outcomes'
//             name='learningOutcomes'
//             type='textarea'
//             value={formValues.learningOutcomes.join('\n')}
//             onChange={(e) => {
//               const lines = e.target.value
//                 .split('\n')
//                 .map((line) => line.trim())
//                 .filter((line) => line !== '')
//               handleChange('learningOutcomes', lines)
//             }}
//             required
//             helperText={errors.learningOutcomes}
//             noLayout
//           />
//         </Box>

//         <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
//           <Button variant='DarkBlue' className='w-full mt-6' onClick={handleSubmit}>
//             CREATE A COURSE
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   )
// }



import React, { useState } from 'react'
import { Modal, Box, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { CourseCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/courses/page'
import { useGetTagQuery } from '@/redux/services/tag.service'  // bạn đã có
import InputText from '@/components/global/Input/InputText'
import InputFile from '@/components/global/Input/InputFile'
import InputNumber from '@/components/global/Input/InputNumber'
import InputSelect from '@/components/global/Input/InputSelect'
import Button from '@/components/global/Button/Button'

// Giả sử API trả về { id, name }, ta định nghĩa:
interface ITag {
  id: number
  name: string
}

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageURL: z.any(),
  introURL: z.any(),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than zero'),
  difficultyLevel: z.string().min(1, 'Difficulty level is required'),
  prerequisites: z.string().min(1, 'Prerequisites are required'),
  learningOutcomes: z.array(z.string().min(1, 'Each learning outcome must have content'))
})

type CourseFormModalCreateProps = {
  initialValues: CourseCreate
  setNewCourse: React.Dispatch<React.SetStateAction<CourseCreate>>
  // Chỉnh onSubmit để nhận thêm selectedTagIds nếu bạn muốn
  onSubmit: (formValues: CourseCreate, selectedTagIds: number[]) => void
  onCancel: () => void
  isOpen: boolean
}

export default function CourseFormModalCreate({
  initialValues,
  setNewCourse,
  onSubmit,
  onCancel,
  isOpen
}: CourseFormModalCreateProps) {
  // State cho form cũ
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    imageURL?: string
    introURL?: string
    price?: string
    difficultyLevel?: string
    prerequisites?: string
    learningOutcomes?: string
  }>({})

  // State cho Tag
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

  // Fetch danh sách Tag
  const { data: tags, isLoading: isTagLoading, isError: isTagError } = useGetTagQuery()

  // Xử lý thay đổi trong form cũ
  const handleChange = (field: keyof CourseCreate, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setNewCourse((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  // Xử lý bấm Submit
  const handleSubmit = () => {
    const result = courseSchema.safeParse(formValues)
    if (!result.success) {
      const newErrors: any = {}
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message
      })
      setErrors(newErrors)
    } else {
      setErrors({})
      // Gọi onSubmit, truyền thêm selectedTagIds
      onSubmit(formValues, selectedTagIds)
      setFormValues(initialValues)
      setSelectedTagIds([]) // reset
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          border: '1px solid #ccc',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        {/* Nút đóng modal */}
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
          <CloseIcon />
        </IconButton>

        <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          CREATE A COURSE
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          {/* Title */}
          <InputText
            noLayout
            label='Title'
            name='title'
            placeholder='Enter course title'
            value={formValues.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            helperText={errors.title}
          />

          {/* Upload Image */}
          <InputFile
            label='Upload Image'
            name='imageURL'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0]
              handleChange('imageURL', file)
            }}
            noLayout
          />
          {errors.imageURL && (
            <Typography color='error' variant='body2'>
              {errors.imageURL}
            </Typography>
          )}

          {/* Upload Intro */}
          <InputFile
            label='Upload Intro'
            name='introURL'
            accept='video/*'
            onChange={(e) => {
              const file = e.target.files?.[0]
              handleChange('introURL', file)
            }}
            noLayout
          />
          {errors.introURL && (
            <Typography color='error' variant='body2'>
              {errors.introURL}
            </Typography>
          )}

          {/* Description */}
          <InputText
            noLayout
            label='Description'
            name='description'
            placeholder='Enter description'
            value={formValues.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            helperText={errors.description}
          />

          {/* Price */}
          <InputNumber
            noLayout
            label='Price'
            name='price'
            placeholder='Enter price'
            value={formValues.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            required
            subtitle={errors.price}
          />

          {/* Difficulty */}
          <InputSelect
            label='Difficulty'
            name='difficultyLevel'
            value={formValues.difficultyLevel}
            onChange={(e) => handleChange('difficultyLevel', e.target.value)}
            options={[
              { label: 'Select Difficulty', value: '' },
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advanced', value: 'Advanced' }
            ]}
            required
            subtitle={errors.difficultyLevel}
            noLayout
          />

          {/* Prerequisites */}
          <InputText
            noLayout
            label='Prerequisites'
            name='prerequisites'
            placeholder='Enter prerequisites'
            value={formValues.prerequisites}
            onChange={(e) => handleChange('prerequisites', e.target.value)}
            required
            helperText={errors.prerequisites}
          />

          {/* Learning Outcomes (textarea) */}
          <InputText
            label='Learning Outcomes'
            name='learningOutcomes'
            type='textarea'
            value={formValues.learningOutcomes.join('\n')}
            onChange={(e) => {
              const lines = e.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line !== '')
              handleChange('learningOutcomes', lines)
            }}
            required
            helperText={errors.learningOutcomes}
            noLayout
          />

          {/* TAG SELECT (multiple) */}
          <FormControl sx={{ mt: 1 }}>
            <InputLabel id='tag-select-label'>Tags</InputLabel>
            <Select
              labelId='tag-select-label'
              multiple
              value={selectedTagIds}
              onChange={(e) => {
                // e.target.value là mảng (number[]) do multiple
                const value = e.target.value as number[]
                setSelectedTagIds(value)
              }}
              input={<OutlinedInput label='Tags' />}
            >
              {isTagLoading && <MenuItem disabled>Loading tags...</MenuItem>}
              {isTagError && <MenuItem disabled>Error loading tags</MenuItem>}
              {tags &&
                tags.map((tag: ITag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        

        {/* Nút CREATE A COURSE */}
        <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
          <Button variant='DarkBlue' className='w-full mt-6' onClick={handleSubmit}>
            CREATE A COURSE
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
