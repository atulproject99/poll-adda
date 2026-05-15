import type { Request, Response } from "express";
export declare const createPoll: (req: Request, res: Response) => Promise<void>;
export declare const getPollById: (req: Request, res: Response) => Promise<void>;
export declare const deletePoll: (req: Request, res: Response) => Promise<void>;
export declare const getUserPolls: (req: Request, res: Response) => Promise<void>;
export declare const publishPoll: (req: Request, res: Response) => Promise<void>;
export declare const toggleResultsVisibility: (req: Request, res: Response) => Promise<void>;
export declare const getDashboardStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=poll.controller.d.ts.map