import { check, validationResult } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../lib/init-middleware";
import prisma from "../../../lib/prisma";
import validateMiddleware from "../../../lib/validate-middleware";
import * as bcrypt from "bcryptjs";
const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("username").isLength({ min: 4, max: 40 }),
      check("password").isLength({ min: 4, max: 40 }),
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
    let { username, password } = req.body;
    password = bcrypt.hashSync(password, 8);
    try {
      const account = await prisma.account.create({
        data: {
          username,
          password,
        },
      });
      return res.json(account);
    } catch (error: any) {
      return res.status(400).send("Invalid username or password.");
    }
  } else {
    return res.status(400).send("Bad HTTP Request");
  }
}
