export interface IAnswerPayload {
    questionId: string;
    selectedOption: string | string[];
}
export interface SubmitResponseRequestType {
    pollId: string;
    userId?: string;
    answers: IAnswerPayload[];
}
//# sourceMappingURL=poll-response.types.d.ts.map