
import CourseAbout from '../../components/course-detail/course_about';
import CourseDetails from '../../components/course-detail/course_details';
import CourseHeader from '../../components/course-detail/course_header';

export default function Blog() {
  return (
    <div>
      <CourseHeader/>
      <CourseDetails/>
      <CourseAbout/>
    </div>
  );
}
