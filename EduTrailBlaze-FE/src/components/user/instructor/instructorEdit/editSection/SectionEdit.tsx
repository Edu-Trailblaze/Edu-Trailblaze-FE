// pages/edit-sections.js
'use client'
import { useState } from 'react'
import Head from 'next/head'
import { ChevronDown, ChevronUp, Edit, Plus, Trash2, Save } from 'lucide-react'
import '@/components/global/Modal/ReactModal.css'
import SectionFields from '../../CreateCourse/Content/SectionFields'
import Modal from '../../../../global/Modal/Modal'

export default function EditSections() {
  const [modalOpen, setModalOpen] = useState(false)
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Basic concepts and fundamentals of programming',
      isExpanded: false,
      lectures: [
        { id: 101, title: 'What is Programming?', duration: '45 min' },
        { id: 102, title: 'Variables and Data Types', duration: '60 min' },
        { id: 103, title: 'Control Structures', duration: '55 min' }
      ]
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      description: 'HTML, CSS and JavaScript basics',
      isExpanded: false,
      lectures: [
        { id: 201, title: 'HTML5 Essentials', duration: '50 min' },
        { id: 202, title: 'CSS Styling', duration: '65 min' },
        { id: 203, title: 'JavaScript Basics', duration: '70 min' }
      ]
    },
    {
      id: 3,
      title: 'Backend Development',
      description: 'Server-side programming and databases',
      isExpanded: false,
      lectures: [
        { id: 301, title: 'Node.js Introduction', duration: '60 min' },
        { id: 302, title: 'RESTful APIs', duration: '55 min' },
        { id: 303, title: 'Database Integration', duration: '75 min' }
      ]
    }
  ])

  const [editingSection, setEditingSection] = useState<{
    id: number
    title: string
    description: string
    isExpanded: boolean
    lectures: { id: number; title: string; duration: string }[]
  } | null>(null)
  const [editingLecture, setEditingLecture] = useState<{
    id: number
    title: string
    duration: string
    sectionId: number
  } | null>(null)

  const toggleSection = (id: number) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isExpanded: !section.isExpanded } : section))
    )
  }

  const startEditSection = (section: any) => {
    setEditingSection({ ...section })
  }

  const startEditLecture = (lecture: any, sectionId: number) => {
    setEditingLecture({ ...lecture, sectionId })
  }

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingSection) {
      setEditingSection({ ...editingSection, [name]: value })
    }
  }

  //   const handleLectureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setEditingLecture({ ...editingLecture, [name]: value });
  //   };

  const saveSection = () => {
    if (editingSection) {
      setSections(sections.map((section) => (section.id === editingSection.id ? editingSection : section)))
    }
    setEditingSection(null)
  }

  //   const saveLecture = () => {
  //     setSections(sections.map(section =>
  //       section.id === editingLecture.sectionId
  //         ? {
  //             ...section,
  //             lectures: section.lectures.map(lecture =>
  //               lecture.id === editingLecture.id ? editingLecture : lecture
  //             )
  //           }
  //         : section
  //     ));
  //     setEditingLecture(null);
  //   };

  const addNewSection = () => {
    setModalOpen(true)
    // const newSection = {
    //   id: Date.now(),
    //   title: 'New Section',
    //   description: 'Enter section description',
    //   isExpanded: true,
    //   lectures: []
    // }
    // setSections([...sections, newSection])
    // startEditSection(newSection)
  }

  const addNewLecture = (sectionId: number) => {
    const newLecture = {
      id: Date.now(),
      title: 'New Lecture',
      duration: '0 min',
      sectionId
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, lectures: [...section.lectures, newLecture] } : section
      )
    )

    startEditLecture(newLecture, sectionId)
  }

  const deleteSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  const deleteLecture = (lectureId: number, sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, lectures: section.lectures.filter((lecture) => lecture.id !== lectureId) }
          : section
      )
    )
  }

  return (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 '>
        <Head>
          <title>Edit Sections | Course Management</title>
          <meta name='description' content='Edit course sections and lectures' />
        </Head>

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
            {sections.map((section) => (
              <div key={section.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                {/* Section Header */}
                <div
                  className='flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-blue-50'
                  onClick={() => toggleSection(section.id)}
                >
                  <div className='flex-1'>
                    <h3 className='text-xl font-medium text-gray-800'>{section.title}</h3>
                    <p className='text-gray-500 text-sm mt-1'>{section.description}</p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditSection(section)
                      }}
                      className='text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100'
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSection(section.id)
                      }}
                      className='text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100'
                    >
                      <Trash2 size={18} />
                    </button>
                    {section.isExpanded ? (
                      <ChevronUp size={24} className='text-blue-500' />
                    ) : (
                      <ChevronDown size={24} className='text-blue-500' />
                    )}
                  </div>
                </div>

                {/* Lectures List (Expandable) */}
                {section.isExpanded && (
                  <div className='bg-blue-50 border-t border-blue-100 px-6 py-4'>
                    <div className='flex justify-between items-center mb-4'>
                      <h4 className='text-lg font-medium text-blue-700'>Lectures</h4>
                      <button
                        onClick={() => addNewLecture(section.id)}
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
                            {section.lectures.map((lecture) => (
                              <tr key={lecture.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm font-medium text-gray-900'>{lecture.title}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className='text-sm text-gray-500'>{lecture.duration}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                  <button
                                    onClick={() => startEditLecture(lecture, section.id)}
                                    className='text-blue-500 hover:text-blue-700 mr-3'
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteLecture(lecture.id, section.id)}
                                    className='text-red-500 hover:text-red-700'
                                  >
                                    Delete
                                  </button>
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

            {sections.length === 0 && (
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
        {editingLecture && (
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
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} title='Add New Section'>
        <SectionFields courseId={12} />
      </Modal>
    </div>
  )
}
