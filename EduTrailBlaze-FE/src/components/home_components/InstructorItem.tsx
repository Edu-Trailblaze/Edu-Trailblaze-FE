import React from 'react';
import { useGetInstructorOfCourseQuery } from '@/services/courseDetail.service'; 

interface InstructorItemProps {
  courseId: number;
}

const InstructorItem: React.FC<InstructorItemProps> = ({ courseId }) => {
  const { data: instructor, isLoading } = useGetInstructorOfCourseQuery(courseId);

  if (isLoading) return <span>Loading...</span>;

  return (
    <span>
      {instructor && instructor.length > 0 ? instructor[0].userName : 'Unknown Instructor'}
    </span>
  );
};

export default InstructorItem;
