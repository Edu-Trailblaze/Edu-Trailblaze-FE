
import CourseAbout from '../../components/course-detail/course_about';
import CourseDetails from '../../components/course-detail/course_details';
import CourseHeader from '../../components/course-detail/course_header';
import WebFooter from '../../components/footer';
import WebHeader from '../../components/header';

export default function Blog() {
  // this is a server component
  return (
    <div>
      <CourseHeader/>
      <CourseDetails/>
      <CourseAbout/>
    </div>
  );
}
