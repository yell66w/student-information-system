import { Student, StudentsOnCourses } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { Enrollees } from "../types/entities";

type Props = {
  enrollees: Enrollees[];
};

const Home: NextPage<Props> = ({ enrollees }) => {
  return (
    <div>
      <ul>
        {enrollees
          ? enrollees.map((enrollee) => (
              <li key={enrollee.courseId + enrollee.studentId}>
                {enrollee.id}
                {enrollee.student.first_name}
              </li>
            ))
          : "No student enrolled at the moment."}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/enrollees`);
  const enrollees = await res.json();
  return {
    props: { enrollees },
  };
};

export default Home;
