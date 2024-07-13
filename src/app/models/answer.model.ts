export class AnswerModel {
    id: number;
    answer: string;
    isCorrect: boolean;
    questionId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        answer: string,
        isCorrect: boolean,
        questionId: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = isCorrect;
        this.questionId = questionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
