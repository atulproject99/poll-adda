import type { Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response) => Promise<void>;
export declare const verfiyEmail: (req: Request, res: Response) => Promise<void>;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const logoutUser: (req: Request, res: Response) => Promise<void>;
export declare const me: (req: Request, res: Response) => Promise<void>;
export declare const refreshToken: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map