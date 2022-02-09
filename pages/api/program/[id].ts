import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import { check, validationResult } from "express-validator";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("name").isLength({ min: 1, max: 40 }).optional(),
      check("acronym").isLength({ min: 1, max: 40 }).optional(),
    ],
    validationResult
  )
);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const programId = req.query.id;

  if (req.method === "GET") {
    handleGET(programId, res);
  } else if (req.method === "PATCH") {
    await validateBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    handlePATCH(programId, req, res);
  } else if (req.method === "DELETE") {
    handleDELETE(programId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handleGET(programId: string | string[], res: NextApiResponse) {
    try {
      const program = await prisma.program.findUnique({
        include: {
          courses: true,
          college: true,
        },
        where: { id: Number(programId) },
      });
      return res.json(program);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async function handleDELETE(
    programId: string | string[],
    res: NextApiResponse
  ) {
    try {
      const program = await prisma.program.delete({
        where: { id: Number(programId) },
      });
      return res.json(program);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async function handlePATCH(
    programId: string | string[],
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const program = await prisma.program.update({
        data: req.body,
        where: { id: Number(programId) },
      });
      return res.json(program);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
