import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const studentId = req.query.id;

  if (req.method === "GET") {
    handleGET(studentId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handleGET(studentId: string | string[], res: NextApiResponse) {
    try {
      const studentsOnCourses = await prisma.studentsOnCourses.findMany({
        include: {
          course: {
            include: {
              program: {
                include: {
                  college: true,
                },
              },
            },
          },
          student: true,
        },
        where: { studentId: Number(studentId) },
      });
      return res.json(studentsOnCourses);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
