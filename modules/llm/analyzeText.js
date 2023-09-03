const natural = require('natural');
const ProcessLanguage = require('./processLanguage');
const util = require('../util/util');

class AnalyzeText {
  constructor() {
    this.processLanguage = new ProcessLanguage();
    this.tokenizer = new natural.WordTokenizer();
  }

  // Method to perform sentiment analysis on a text
  analyzeSentiment(text) {
    let analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    let tokenizedWords = this.processLanguage.tokenize(text);
    return analyzer.getSentiment(tokenizedWords);
  }

  // Method to apply Porter Stemming on a tokenized word (break a word down into its root form)
  stemWords(tokenizedWords) {
    return tokenizedWords.map(word => natural.PorterStemmer.stem(word));
  }

  // Method to perform classification of texts
  classifyTexts(texts, classificationStrings) {
    let classifier = new natural.BayesClassifier();
    texts.forEach(text => {
      classifier.addDocument(this.stemWords(this.processLanguage.tokenize(text.text)), text.label);
    });
    classifier.train();
    return classificationStrings.map(text => classifier.classify(this.stemWords(this.processLanguage.tokenize(text))));
  }

  // Method to find similar strings to a given string 
  findSimilarStrings(string, possibleMatches) {
    let stringDistance = natural.JaroWinklerDistance;
    return possibleMatches.map(possibleMatch => ({
      string: possibleMatch,
      similarity: stringDistance(string, possibleMatch)
    })).sort((a, b) => b.similarity - a.similarity);
  }

  // Overarching method to analyze text: Tokenize, perform sentiment analysis, and find stemmed words
  analyzeText(text) {
    let tokenizedWords = this.processLanguage.tokenize(text);
    let sentiment = this.analyzeSentiment(text);
    let stemmedWords = this.stemWords(tokenizedWords);
    return {
      sentiment: sentiment,
      stemmedWords: stemmedWords
    };
  }
}

module.exports = AnalyzeText;