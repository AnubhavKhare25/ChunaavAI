export const sanitizeInput = (str) => {
  if (!str) return '';
  return str.replace(/[^\w\s\?\.!]/gi, '').trim();
};

export const findMatchedResponse = (query, knowledgeBase) => {
  const lowerQuery = query.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(kw => lowerQuery.includes(kw))) {
      return entry.response;
    }
  }
  return null;
};
