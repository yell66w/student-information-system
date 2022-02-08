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
    try {
      const post = await prisma.student.findUnique({
        where: { id: Number(studentId) },
      });
      return res.json(post);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  // DELETE /api/post/:id
  async function handleDELETE(
    studentId: string | string[],
    res: NextApiResponse
  ) {
    try {
      const post = await prisma.student.delete({
        where: { id: Number(studentId) },
      });
      return res.json(post);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
