import type { GetServerSideProps, NextPage } from "next";
import { Enrollees } from "../types/entities";

type Props = {
  enrollees: Enrollees[];
};

const Home: NextPage<Props> = ({ enrollees }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student #</th>
            <th>Name</th>
            <th>College</th>
            <th>Program</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Date Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {enrollees
            ? enrollees.map((enrollee) => (
                <tr key={enrollee.id}>
                  <td>{enrollee.id}</td>
                  <td>{enrollee.student.student_no}</td>
                  <td>
                    {enrollee.student.first_name} {enrollee.student.last_name}
                  </td>
                  <td>{enrollee.student.college.acronym}</td>
                  <td>{enrollee.course.program.acronym}</td>
                  <td>{enrollee.course.code}</td>
                  <td>{enrollee.course.name}</td>
                  <td>{enrollee.dateEnrolled}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
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
