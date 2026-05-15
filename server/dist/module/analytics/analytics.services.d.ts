export declare const getPollAnalytics: (pollId: string, requestingUserId?: string) => Promise<{
    pollTitle: string;
    resultsPublished: boolean;
    totalResponses: number;
    analytics: {
        question: string;
        options: {
            option: string;
            count: number;
            percentage: number;
        }[];
    }[];
}>;
//# sourceMappingURL=analytics.services.d.ts.map