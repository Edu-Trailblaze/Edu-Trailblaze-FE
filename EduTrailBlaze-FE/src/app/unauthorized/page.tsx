export default function Unauthorized() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold text-red-500'>Unauthorized</h1>
      <p className='text-lg mt-2'>You do not have permission to access this page.</p>
    </div>
  )
}
