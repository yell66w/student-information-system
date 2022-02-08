import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const studentOnCourses = await prisma.studentsOnCourses.findMany({
      include: {
        student: {
          include: {
            college: true,
          },
        },
        course: {
          include: {
            program: true,
          },
        },
      },
    });
    res.json(studentOnCourses);
  } else {
    res.status(404).send("Cannot GET enrollees");
  }
}
