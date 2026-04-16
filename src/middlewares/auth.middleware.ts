import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("Token d'authentification manquant");
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET!;
        const payload = jwt.verify(token, secret) as JwtPayload;
        req.user = payload;
        return next();
    } catch {
        return res.status(401).json("Token invalide ou expiré");
    }
}

export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json("Non authentifié");
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json("Accès interdit : rôle insuffisant");
        }
        return next();
    };
}
