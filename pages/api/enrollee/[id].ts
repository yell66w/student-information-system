import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const studentsOnCoursesId = req.query.id;

  if (req.method === "GET") {
    handleGET(studentsOnCoursesId, res);
  } else if (req.method === "DELETE") {
    handleDELETE(studentsOnCoursesId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handleGET(
    studentsOnCoursesId: string | string[],
    res: NextApiResponse
  ) {
    try {
      const studentsOnCourses = await prisma.studentsOnCourses.findUnique({
        include: {
          course: true,
          student: true,
        },
        where: { id: Number(studentsOnCoursesId) },
      });
      return res.json(studentsOnCourses);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async function handleDELETE(
    studentsOnCoursesId: string | string[],
    res: NextApiResponse
  ) {
    try {
      const studentsOnCourses = await prisma.studentsOnCourses.delete({
        where: { id: Number(studentsOnCoursesId) },
      });
      return res.json(studentsOnCourses);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
