const stopwords = require('../util/stopwords');

class ProcessLanguage {

  // Method to tokenize text into individual terms
  tokenize(text) {
    return text.toLowerCase().match(/\b(\w+)\b/g);
  }

  // Method to count word frequencies in a text
  countWordFrequencies(tokenizedWords) {
    let wordCounts = tokenizedWords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return wordCounts;
  }

  // Method to remove common English stopwords from a list of tokenized words
  removeStopwords(tokenizedWords) {
    return tokenizedWords.filter(word => !stopwords.includes(word));
  }

  // Method to process input text: tokenize, remove stopwords, and count word frequencies
  processText(text) {
    let tokenizedWords = this.tokenize(text);
    let wordsWithoutStops = this.removeStopwords(tokenizedWords);
    let wordFrequencies = this.countWordFrequencies(wordsWithoutStops);
    return wordFrequencies;
  }
}

module.exports = ProcessLanguage;