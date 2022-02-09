import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const students = await prisma.student.findMany({
      orderBy: [{ id: "asc" }],
      include: {
        college: true,
      },
    });
    res.json(students);
  } else {
    res.status(404).send("Cannot GET students");
  }
}
