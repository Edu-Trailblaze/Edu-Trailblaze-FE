import Box from '../Box/Box'

interface InputFileProps {
  label: string
  name: string
  accept: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  preview?: string | null
  icon?: React.ReactNode
  subtitle?: string
  noLayout?: boolean // ✅ Thêm prop mới
}

export default function InputFile({ label, name, accept, onChange, preview, icon, noLayout }: InputFileProps) {
  const content = (
    <>
      <label htmlFor={name} className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        {label} <span className='text-red-500'>*</span>
      </label>
      <input
        id={name}
        name={name}
        type='file'
        accept={accept}
        onChange={onChange}
        className='w-full p-2 border border-gray-300 rounded-lg'
      />
      {preview && accept.includes('image') && (
        <img src={preview} alt='Preview' className='w-auto rounded-lg shadow-md border border-gray-300 mt-2' />
      )}
      {preview && accept.includes('video') && (
        <div className='mt-2'>
          <video controls className='w-full rounded'>
            <source src={preview} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  )
  return noLayout ? content : <Box>{content}</Box>
}
