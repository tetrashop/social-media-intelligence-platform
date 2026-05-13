const { tokenizeAndStem, getSentiment } = require('./nlp-engine');

const traitKeywords = {
  openness: ['creative','curious','adventurous','innovative','imaginative'],
  conscientiousness: ['organized','responsible','reliable','disciplined','efficient'],
  extraversion: ['outgoing','energetic','talkative','social','assertive'],
  agreeableness: ['kind','sympathetic','cooperative','warm','compassionate'],
  neuroticism: ['anxious','moody','worried','tense','nervous']
};

function predictPersonality(text) {
  const { tokens } = tokenizeAndStem(text);
  const wordCount = tokens.length || 1;
  const sent = getSentiment(tokens);
  const traits = {};

  for (const [trait, keywords] of Object.entries(traitKeywords)) {
    const stems = keywords.map(k => require('natural').PorterStemmer.stem(k));
    const count = tokens.filter(t => stems.includes(require('natural').PorterStemmer.stem(t))).length;
    const baseRatio = count / wordCount;
    // booster based on sentiment correlation (simplified Big‑Five tendency)
    let booster = 1.0;
    if (trait === 'extraversion') booster = sent > 0 ? 1.3 : 0.8;
    if (trait === 'neuroticism') booster = sent < -0.2 ? 1.4 : 0.7;
    if (trait === 'agreeableness') booster = sent > 0.1 ? 1.2 : 0.9;
    traits[trait] = Math.min(1, Math.max(0, baseRatio * booster));
  }

  // normalise so that sum ~1 (not strictly, but for consistency)
  const total = Object.values(traits).reduce((a,b)=>a+b, 0) || 1;
  for (const t in traits) traits[t] = +(traits[t] / total).toFixed(3);

  return traits;
}

module.exports = { predictPersonality };
