import { Suspense } from "react";
import CourseListView from "@/src/components/Courses/ListView";

export const metadata = {
  title: "Courses | Prep French Classes",
  description: "Browse all our French courses in list view format",
};

export default function CourseListViewPage() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CourseListView />
    </Suspense>
  );
}


