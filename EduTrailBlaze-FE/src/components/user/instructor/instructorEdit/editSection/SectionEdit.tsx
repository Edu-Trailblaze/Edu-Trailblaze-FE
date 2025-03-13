'use client'
import { useState } from 'react'
import Head from 'next/head'
import { ChevronDown, ChevronUp, Edit, Plus, Trash2, Save } from 'lucide-react'
import '@/components/global/Modal/ReactModal.css'
import SectionFields from '../../CreateCourse/Content/SectionFields'
import Modal from '../../../../global/Modal/Modal'
import { useParams } from 'next/navigation'
import { useGetSectionbyConditionsQuery, useUpdateSectionMutation } from '../../../../../redux/services/section.service'
import { useGetSectionLectureQuery } from '../../../../../redux/services/lecture.service'
import LoadingPage from '../../../../animate/Loading/LoadingPage'
import { toast } from 'react-toastify'

export default function EditSections() {
  const [modalOpen, setModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({})
  const [editingSection, setEditingSection] = useState<ISection | null>(null)
  const [updateSection, { isLoading: updateSectionLoading }] = useUpdateSectionMutation()
  const params = useParams()

  const courseId = params.courseId as string
  const {
    data: sections,
    isLoading: secLoading,
    refetch: sectionRefetch
  } = useGetSectionbyConditionsQuery(Number(courseId), {
    skip: !courseId
  })
  const sectionId = sections?.map((items) => items.id) ?? []
  const { data: secLec, isLoading: lecLoading } = useGetSectionLectureQuery(sectionId, {
    skip: sectionId?.length === 0
  })

  if (secLoading || lecLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    )

  const processedSections = sections?.map((section) => {
    return {
      section: section,
      sectionId: section.id,
      lectures: secLec?.find((lec) => lec.sectionId === section.id)?.lectures || []
    }
  })

  const startEditSection = (section: ISection) => {
    setEditingSection({ ...section })
  }

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  const addNewSection = () => {
    setModalOpen(true)
  }

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingSection) {
      setEditingSection({ ...editingSection, [name]: value })
    }
  }

  const saveSection = () => {
    if (editingSection) {
      setEditingSection((prev) => (prev ? { ...prev } : null))
      updateSection({
        sectionId: editingSection.id,
        title: editingSection.title,
        description: editingSection.description
      })
        .unwrap()
        .then(() => {
          toast.success('Section updated successfully.')
          sectionRefetch()
        })
        .catch(() => {
          toast.error('Failed to update section. Please try again.')
        })
        .finally(() => {
          setEditingSection(null)
        })
    }
  }

  return (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 '>
        <div>
          <div className='flex items-center'>
            <button type='button' className='mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-500'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <div>
              <h1 className='text-3xl font-bold text-indigo-900'>Editing Sections</h1>
              <p className='mt-2 text-gray-600'>Update your Section content and information</p>
            </div>
          </div>
        </div>

        <main className='container mx-auto px-4 py-8'>
          <div className='flex justify-end items-center mb-8'>
            <button
              onClick={addNewSection}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition-colors duration-200'
            >
              <Plus size={20} className='mr-2' />
              Add New Section
            </button>
          </div>

          {/* Sections List */}
          <div className='space-y-4'>
            {processedSections?.map((section, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                {/* Section Header */}
                <div
                  className='flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-blue-50'
                  onClick={() => toggleSection(section.sectionId)}
                >
                  {/* Section Title and Description */}
                  <div className='flex-1'>
                    <h3 className='text-xl font-medium text-gray-800'>{section.section.title}</h3>
                    <p className='text-gray-500 text-sm mt-1'>{section.section.description}</p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100'
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditSection(section.section)
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button className='text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100'>
                      <Trash2 size={18} />
                    </button>
                    {expandedSections[section.sectionId] ? (
                      <ChevronUp size={24} className='text-blue-500' />
                    ) : (
                      <ChevronDown size={24} className='text-blue-500' />
                    )}
                  </div>
                </div>

                {/* Lectures List (Expandable) */}
                {expandedSections[section.sectionId] && (
                  <div className='bg-blue-50 border-t border-blue-100 px-6 py-4'>
                    <div className='flex justify-between items-center mb-4'>
                      <h4 className='text-lg font-medium text-blue-700'>Lectures</h4>
                      <button
                        // onClick={() => addNewLecture(section.id)}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm shadow-sm'
                      >
                        <Plus size={16} className='mr-1' />
                        Add Lecture
                      </button>
                    </div>

                    {/* Lectures Table */}
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                      {section.lectures.length > 0 ? (
                        <table className='min-w-full divide-y divide-gray-200'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Title
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Duration
                              </th>
                              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white divide-y divide-gray-200'>
                            {section.lectures?.map((lecture) => (
                              <tr key={lecture.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm font-medium text-gray-900'>{lecture.title}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-500'>{lecture.duration}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                  <button className='text-blue-500 hover:text-blue-700 mr-3'>Edit</button>
                                  <button className='text-red-500 hover:text-red-700'>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className='px-6 py-4 text-sm text-gray-500 text-center'>
                          No lectures in this section yet. Click "Add Lecture" to create one.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {sections?.length === 0 && (
              <div className='bg-white rounded-lg shadow-md p-8 text-center'>
                <p className='text-gray-500 mb-4'>No sections found. Get started by adding a new section.</p>
                <button
                  onClick={addNewSection}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto'
                >
                  <Plus size={20} className='mr-2' />
                  Add New Section
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Edit Section Modal */}
        {editingSection && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-6'>
              <h3 className='text-xl font-semibold mb-4 text-gray-800'>Edit Section</h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Section Title</label>
                  <input
                    type='text'
                    name='title'
                    value={editingSection.title}
                    onChange={handleSectionChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                  <textarea
                    name='description'
                    value={editingSection.description}
                    onChange={handleSectionChange}
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  onClick={() => setEditingSection(null)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={saveSection}
                  className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center'
                >
                  <Save size={18} className='mr-2' />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lecture Modal */}
        {/* {editingLecture && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-6'>
              <h3 className='text-xl font-semibold mb-4 text-gray-800'>Edit Lecture</h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title</label>
                  <input
                    type='text'
                    name='title'
                    value={editingLecture.title}
                    //   onChange={handleLectureChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Duration</label>
                  <input
                    type='text'
                    name='duration'
                    value={editingLecture.duration}
                    //   onChange={handleLectureChange}
                    placeholder='e.g., 45 min'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  onClick={() => setEditingLecture(null)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  // onClick={saveLecture}
                  className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center'
                >
                  <Save size={18} className='mr-2' />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Add New Section'>
        <SectionFields courseId={97} />
      </Modal>
    </div>
  )
}
