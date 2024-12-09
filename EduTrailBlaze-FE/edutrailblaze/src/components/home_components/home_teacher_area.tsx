"use client";
import React from "react";

export default function HomeTeacherArea() {
  return (
    <div className="flex px-[150px] py-[5px] justify-evenly">
      <div className="flex justify-evenly w-[600px]">
        <div>
        <img src="assets/Side_Image/teacher1.jpg" alt="" className="rounded-[50%] h-[230px] mb-7"/>
        <img src="assets/Side_Image/teacher2.jpg" alt="" className="rounded-[50%] h-[230px]"/>
        </div>
        <div className="pt-[120px]">
        <img src="assets/Side_Image/teacher3.png" alt="" className="rounded-[50%] h-[230px]"/>
        </div>
      </div>
      <div  className="pt-[100px] w-[500px]">
        <p>TEACHERS</p>
        <h1 className="text-4xl font-bold py-8">Create your courses and engage every students</h1>
        <p>We empower teachers to support their entire classroom. 90% of US teachers who have used EduTrailBlaze have found us effective.</p>
        <button
            className="w-[160px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-14 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]"
            type="button"
          >
            Create Here!
          </button>
      </div>
    </div>
  );
}
