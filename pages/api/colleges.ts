import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const colleges = await prisma.college.findMany({});
    res.json(colleges);
  } else {
    res.status(404).send("Cannot GET colleges");
  }
}
