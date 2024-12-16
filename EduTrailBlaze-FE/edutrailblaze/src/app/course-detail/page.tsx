
import CourseAbout from '../../components/course-detail/course_about';
import CourseOutcome from '../../components/course-detail/course_outcome';
import CourseDetails from '../../components/course-detail/course_details';
import CourseHeader from '../../components/course-detail/course_header';
import CourseLessons from '../../components/course-detail/course_lessons';

export default function Blog() {
  return (
    <div>
      <CourseHeader/>
      <CourseDetails/>
      <CourseAbout/>
      <CourseOutcome/>
      <CourseLessons/>
    </div>
  );
}
