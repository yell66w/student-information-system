import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import initMiddleware from "../../../../lib/init-middleware";
import validateMiddleware from "../../../../lib/validate-middleware";
import { check, validationResult } from "express-validator";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("first_name").isLength({ min: 1, max: 40 }).optional(),
      check("last_name").isLength({ min: 1, max: 40 }).optional(),
    ],
    validationResult
  )
);

// POST /api/student
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const studentId = req.query.id;

  if (req.method === "GET") {
    handleGET(studentId, res);
  } else if (req.method === "PATCH") {
    await validateBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    handlePATCH(studentId, req, res);
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

  async function handlePATCH(
    studentId: string | string[],
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const post = await prisma.student.update({
        data: req.body,
        where: { id: Number(studentId) },
      });
      return res.json(post);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
