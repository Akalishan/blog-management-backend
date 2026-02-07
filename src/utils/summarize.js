export const summarize = (text, maxSentences = 2) => {
  if (!text) return "";
  // Simple heuristic: split into sentences and return first N sentences trimmed.
  const sentences = text.replace(/\r\n|\n/g, " ").match(/[^.!?]+[.!?]?/g) || [
    text,
  ];
  return sentences.slice(0, maxSentences).join(" ").trim();
};

export default summarize;
