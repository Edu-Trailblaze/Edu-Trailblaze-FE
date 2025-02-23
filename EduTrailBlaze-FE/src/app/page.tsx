import HomeCourses from '@/components/home_components/home_courses'
import HomeFeedbacks from '@/components/home_components/home_feedbacks'
import HomeSupporter from '@/components/home_components/home_supporter'
import HomeTeacherArea from '@/components/home_components/home_teacher_area'
import ImageSlider from '@/components/home_components/image_slider'
import MakeDiffer from '@/components/home_components/make_different'
import WebHeader from '../components/generalLayout/header/header'
import WebFooter from '../components/generalLayout/footer/footer'

export default function Home() {
  return (
    <div>
      <WebHeader />
      <ImageSlider></ImageSlider>
      <HomeCourses></HomeCourses>
      <MakeDiffer></MakeDiffer>
      <div className='flex items-center justify-center mb-20'>
        <HomeFeedbacks></HomeFeedbacks>
      </div>
      <HomeTeacherArea></HomeTeacherArea>
      <HomeSupporter></HomeSupporter>
      <WebFooter />
    </div>
  )
}
