import sanitize from "sanitize-html";

export const normalizeText = (text: string) => {
  return sanitize(text, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (input) =>
      input
        .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
        .replace(/[\u2013\u2014]/g, "-")
        .replace(/\u2026/g, "..."),
  });
};
