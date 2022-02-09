import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export const STUD_NO = 2200000;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { first_name, last_name, collegeId, programId, accountId } = req.body;
    if (!first_name || !last_name || !collegeId || !programId) {
      return res.status(400).send("Missing fields.");
    }
    try {
      let data = {};
      if (accountId) {
        data = { ...data, account: { connect: { id: Number(accountId) } } };
        await prisma.account.update({
          data: {
            role: "STUDENT",
          },
          where: {
            id: Number(accountId),
          },
        });
      }
      const student = await prisma.student.create({
        data: {
          first_name,
          last_name,
          college: {
            connect: {
              id: Number(collegeId),
            },
          },
          program: {
            connect: {
              id: Number(programId),
            },
          },
          ...data,
        },
      });
      // TEMPORARY
      const student_no = (student.student_no += STUD_NO);
      const result = await prisma.student.update({
        data: {
          student_no,
        },
        where: {
          id: student.id,
        },
        include: {
          college: true,
        },
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("Bad Request");
  }
}
