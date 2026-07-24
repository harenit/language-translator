const config = require('../config/config');

// A single translation record.
class Translation {
  constructor({ sourceText, translatedText, sourceLang, targetLang }) {
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    this.sourceText = sourceText;
    this.translatedText = translatedText;
    this.sourceLang = sourceLang;
    this.targetLang = targetLang;
    this.createdAt = new Date().toISOString();
  }
}

// A tiny in-memory store standing in for a database.
// Swap this out for a real model (e.g. Mongoose/Sequelize) by keeping the same method names.
class TranslationStore {
  constructor(limit) {
    this.limit = limit;
    this.items = [];
  }

  add(entryData) {
    const entry = new Translation(entryData);
    this.items.unshift(entry);
    if (this.items.length > this.limit) {
      this.items.length = this.limit;
    }
    return entry;
  }

  getAll() {
    return this.items;
  }

  clear() {
    this.items = [];
  }
}

module.exports = new TranslationStore(config.historyLimit);
