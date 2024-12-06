import WebFooter from "@/components/footer";
import WebHeader from "@/components/header";
import HomeCourses from "@/components/home_courses";
import HomeFeedbacks from "@/components/home_feedbacks";
import HomeSupporter from "@/components/home_supporter";
import HomeTeacherArea from "@/components/home_teacher_area";
import ImageSlider from "@/components/image_slider";
import MakeDiffer from "@/components/make_different";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <WebHeader></WebHeader>
      <ImageSlider></ImageSlider>
      <HomeCourses></HomeCourses>
      <MakeDiffer></MakeDiffer>
      <div className="flex items-center justify-center mb-20">
      <HomeFeedbacks></HomeFeedbacks>
      </div>
      <HomeTeacherArea></HomeTeacherArea>
      <HomeSupporter></HomeSupporter>
      <WebFooter></WebFooter>
    </div>
  );
}
