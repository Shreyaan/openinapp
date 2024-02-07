import { stringSimilarity } from "string-similarity-js";
import {
  OptionType,
  Survey,
  SurveyResponse,
  SurveyResult,
} from "@/@types/global";

export const calculateResult = (
  survey: Survey | undefined,
  submissions: SurveyResponse[] | undefined
): SurveyResult | undefined => {
  if (!survey || !submissions) return undefined;
  if(survey.surveyQuestions.length === 0) return [];
  const result: SurveyResult = [];
  survey.surveyQuestions.forEach((question, index) => {
    const questionResult: {
      question: string;
      options?: OptionType[];
      metadata: {
        type: "mcq" | "text" | "boolean" | "number";
        answer: (number | string | boolean | null)[]; // Make the answer an array
        required: boolean;
      };
    } = {
      question: question.question,
      options: question.metadata.type === "mcq" ? question.options : undefined,
      metadata: {
        type: question.metadata.type,
        answer: [],
        required: question.metadata.required,
      },
    };
    submissions.forEach((submission) => {
      if(!submission.questions) return;
      if (
        stringSimilarity(
          submission.questions[index]?.question,
          question?.question
        ) > 0.8
      ) {
        questionResult.metadata.answer.push(submission.answers[index]);
      }
    });
    result.push(questionResult);
  });
  return result;
};
