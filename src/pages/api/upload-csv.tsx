// pages/api/upload-csv.js
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import csvParser from "csv-parser";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disables body parsing, as we're using formidable for multipart/form-data
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST requests are allowed",
    });
  }

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Error parsing form",
      });
    }

    if (!files.file) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: "No file uploaded" });
    }

    const fileStream = fs.createReadStream(files.file[0].filepath);
    let results: any[] = [];

    fileStream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("CSV data parsed:", results);
        let surveyQuestions: any[]= [];

        results.forEach((result) => {
          function parseOptions(optionsString: string) {
            return optionsString
              .split(", ")
              .map((option) => ({ text: option }));
          }

        
          let question = {
           id : result.id,
           links : result.links,
           prefix : result.prefix,
           selectTags : parseOptions(result["select tags"]),
           selectedTags : parseOptions(result["selected tags"]),
          };

          surveyQuestions.push(question);
        });

        res
          .status(200)
          .json({ message: "CSV data parsed successfully", data: surveyQuestions });
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error);
        res.status(500).json({
          error: "Internal Server Error",
          message: "Error parsing CSV",
        });
      });
  });
}

let obj = {
  Question: "How satisfied are you with our service?",
  Type: "mcq",
  Answer: "",
  Required: "true",
  Options: "Very satisfied, Satisfied, Neutral, Unsatisfied, Very unsatisfied",
};
