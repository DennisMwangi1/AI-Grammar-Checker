// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY  });

// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         {
//             role: "system",
//             content: `You are a grammar assistant. Return errors in JSON format. Each error must include:
//           - The error itself (word or phrase).
//           - The category of the error (grammar, spelling, punctuation, style).
//           - The suggested correction.
//           - The start and end character indices in the input text.
//           - A message explaining the issue.`,
//         },
//         {
//             role: "user",
//             content: `Analyze the following text: "Thos is an exmaple sentence with errors."`,
//         },
//     ],
//     max_tokens: 100,
// });

// console.log(completion.choices[0].message);
const response = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
        text: "The quick brown fox jump over the lazzy dog who were runing quickly across the feilds. It didnt notices the sudden stop, and continue on, not knowing that it were being watched. Many of the people there thought that foxes were inteligent, but this one seemed rather foolish. The dogs, who hadnt seen such a thing before, was confused and barked loudly at the strange sight. It was an odd day, one that they would all remembers.",
        language: "en",
        isPreferedVariant: "true", // Force preference for English
    }),
});

if (!response.ok) {
    const error = await response.text();
    console.error(`Error: ${response.status} - ${response.statusText}`, error);
} else {
    const data = await response.json();
    console.log(data);
}



