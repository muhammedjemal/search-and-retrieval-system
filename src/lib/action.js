import * as fs from "fs";
import * as path from "path";

// Jaccard Index Function
function jaccardIndex(A, B) {
  const intersection = A.filter((x) => B.includes(x)).length;
  const union = new Set([...A, ...B]).size;
  return intersection / union;
}

function createIndex(processedCorpus) {
  const index = {};
  processedCorpus.forEach((docTokens, docId) => {
    docTokens.forEach((term) => {
      if (!index[term]) {
        index[term] = [];
      }
      index[term].push(docId);
    });
  });
  return index;
}

export function fetchSearchResult(query) {
  const folderPath = __dirname;

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".txt"));

  const documents = [];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, "utf-8").trim(); // Read file content
    const tokens = content.split(/\s+/); // Tokenize content
    documents.push({
      text: content,
      tokens: tokens,
      fileName: file,
    });
  });

  const similarities = documents.map((doc) => ({
    text: doc.text,
    similarity: jaccardIndex(query, doc.tokens),
    fileName: doc.fileName,
  }));

  const rankedDocs = similarities.sort((a, b) => b.similarity - a.similarity);

  const processedCorpus = documents.map((doc) => doc.tokens);
  const index = createIndex(processedCorpus);

  return rankedDocs;
}
