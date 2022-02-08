import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { courseId, studentId } = req.body;

    try {
      const exists = await prisma.studentsOnCourses.findFirst({
        where: {
          courseId: Number(courseId),
          studentId: Number(studentId),
        },
      });

      if (exists) {
        return res
          .status(400)
          .send("The student is already enrolled in this course.");
      }

      const studentOnCourse = await prisma.studentsOnCourses.create({
        data: {
          course: {
            connect: {
              id: Number(courseId),
            },
          },
          student: {
            connect: {
              id: Number(studentId),
            },
          },
        },
      });
      // TEMPORARY
      return res.json(studentOnCourse);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("Bad Request");
  }
}
