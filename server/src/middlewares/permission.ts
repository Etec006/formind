import { NextFunction, Request, Response } from "express";
import decoder from "../utils/decoderUser";

function is(role: String[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await decoder(request);

    const userRoles = user?.roles.map((role) => role.name);

    const existRoles = userRoles?.some((r) => role.includes(r));

    if (existRoles) {
      return next();
    }

    return response.status(401).json({ message: "Não autorizado" });
  };

  return roleAuthorized;
}

export { is };
