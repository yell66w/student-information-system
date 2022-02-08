import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export const STUD_NO = 2200000;

// POST /api/student
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { first_name, last_name } = req.body;
    const student = await prisma.student.create({
      data: {
        first_name,
        last_name,
      },
    });
    //TEMPORARY
    const student_no = (student.student_no += STUD_NO);
    const result = await prisma.student.update({
      data: {
        student_no,
      },
      where: {
        id: student.id,
      },
    });
    res.json(result);
  } else {
    res.status(400).send("Bad Request");
  }
}
