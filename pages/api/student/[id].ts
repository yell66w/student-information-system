import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/student
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const studentId = req.query.id;

  if (req.method === "GET") {
    handleGET(studentId, res);
  } else if (req.method === "DELETE") {
    handleDELETE(studentId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handleGET(studentId: string | string[], res: NextApiResponse) {
    const post = await prisma.student.findUnique({
      where: { id: Number(studentId) },
    });
    res.json(post);
  }

  // DELETE /api/post/:id
  async function handleDELETE(
    studentId: string | string[],
    res: NextApiResponse
  ) {
    const post = await prisma.student.delete({
      where: { id: Number(studentId) },
    });
    res.json(post);
  }
}
