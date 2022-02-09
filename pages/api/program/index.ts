import { check, validationResult } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../lib/init-middleware";
import prisma from "../../../lib/prisma";
import validateMiddleware from "../../../lib/validate-middleware";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("name").isLength({ min: 1, max: 40 }),
      check("acronym").isLength({ min: 1, max: 40 }),
      check("collegeId").notEmpty(),
    ],
    validationResult
  )
);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await validateBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, acronym, collegeId } = req.body;
    try {
      const program = await prisma.program.create({
        data: {
          name,
          acronym,
          college: {
            connect: {
              id: Number(collegeId),
            },
          },
        },
      });
      return res.json(program);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("Bad HTTP Request");
  }
}
