import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// GET /api/students
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const students = await prisma.student.findMany();
    res.json(students);
  } else {
    res.status(404).send("Cannot GET students");
  }
}
