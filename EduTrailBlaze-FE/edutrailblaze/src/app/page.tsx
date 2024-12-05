import WebFooter from "@/components/footer";
import WebHeader from "@/components/header";
import ImageSlider from "@/components/image_slider";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <WebHeader></WebHeader>
      <ImageSlider></ImageSlider>
      <WebFooter></WebFooter>
    </div>
  );
}
