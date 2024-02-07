import { Survey, SurveyQuestion } from "@/@types/global";

export function validateSurvey({
  surveyName,
  surveyQuestions,
}: {
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
}): boolean | never {
  if (!surveyName) {
    throw new Error("Survey name is required.");
  }

  for (let i = 0; i < surveyQuestions.length; i++) {
    const question = surveyQuestions[i];
    if (!question.question) {
      throw new Error(`Question ${i + 1}: Text is required.`);
    }
    if (!question.metadata || !question.metadata.type) {
      throw new Error(`Question ${i + 1}: Type is required.`);
    }
    if (question.metadata.type === "mcq") {
      if (!question.options) {
        throw new Error(`Question ${i + 1}: MCQ options are required.`);
      } else if (
        !Array.isArray(question.options) ||
        question.options.length < 2
      ) {
        throw new Error(
          `Question ${i + 1}: MCQ questions must have at least 2 options.`
        );
      } else {
        for (let j = 0; j < question.options.length; j++) {
          if (!question.options[j]) {
            throw new Error(
              `Question ${i + 1}: MCQ option ${j + 1} cannot be empty.`
            );
          }
        }
      }
    }
  }

  if (surveyQuestions.length < 3) {
    throw new Error("A survey must have at least 3 questions.");
  }
  return true;
}
