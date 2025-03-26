import WebHeader from '../components/global/header/header'
import WebFooter from '../components/global/footer/footer'
import ImageSlider from '../components/user/home_components/image_slider'
import HomeCourses from '../components/user/home_components/home_courses'
import MakeDiffer from '../components/user/home_components/make_different'
import HomeFeedbacks from '../components/user/home_components/home_feedbacks'
import HomeTeacherArea from '../components/user/home_components/home_teacher_area'
import HomeSupporter from '../components/user/home_components/home_supporter'
import RollingGallery from '@/components/user/home_components/RollingGallery'

export default function Home() {
  return (
    <div>
      <WebHeader />
      {/* <ImageSlider /> */}
      <RollingGallery autoplay={true} pauseOnHover={true}/>
      <HomeCourses />
      <MakeDiffer />
      <div className='flex items-center justify-center mb-20'>
        <HomeFeedbacks />
      </div>
      <HomeTeacherArea />
      <HomeSupporter />
      <WebFooter />
    </div>
  )
}
