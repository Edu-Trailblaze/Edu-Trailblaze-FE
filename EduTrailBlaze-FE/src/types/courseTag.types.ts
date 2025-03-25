export interface CourseTagPayload {
    courseId: number;
    tagId: number;
  }
  
  export interface CourseTag extends CourseTagPayload {
    id: number;
  }