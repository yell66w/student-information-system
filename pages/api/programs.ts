import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const programs = await prisma.program.findMany({
      orderBy: [{ id: "asc" }],
    });
    res.json(programs);
  } else {
    res.status(404).send("Cannot GET programs");
  }
}
