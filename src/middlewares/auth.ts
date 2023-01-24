import { NextFunction, Request, Response } from "express";
import Jwt, { decode } from "jsonwebtoken";
import { config } from "dotenv";

module.exports = (req: any, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  const secret: any = process.env.JWT_SECRET;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  // Formato token JWT Bearer asdkfgaseçkf123123

  const parts = authHeader.split(" ");
  const amountParts = parts.length;

  if (amountParts != 2) return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!(scheme === "Bearer"))
    return res.status(401).send({ error: "Token malformatted" });

  Jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
  });
};
