class NeuralNetwork {
  constructor(inputSize, hiddenSize, outputSize, learningRate = 0.1) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;
    this.lr = learningRate;

    this.W1 = this.randomMatrix(inputSize, hiddenSize);
    this.b1 = Array(hiddenSize).fill(0.1);
    this.W2 = this.randomMatrix(hiddenSize, outputSize);
    this.b2 = Array(outputSize).fill(0.1);
  }

  randomMatrix(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() * 0.2 - 0.1)
    );
  }

  sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  sigmoidDerivative(x) { return x * (1 - x); }

  softmax(arr) {
    const max = Math.max(...arr);
    const exp = arr.map(v => Math.exp(v - max));
    const sum = exp.reduce((a, b) => a + b, 0);
    return exp.map(v => v / sum);
  }

  predict(inputVec) {
    if (inputVec.length !== this.inputSize) throw new Error('input size mismatch');
    const z1 = Array.from({ length: this.hiddenSize }, (_, j) => {
      let sum = this.b1[j];
      for (let i = 0; i < this.inputSize; i++) sum += inputVec[i] * this.W1[i][j];
      return this.sigmoid(sum);
    });
    const z2 = Array.from({ length: this.outputSize }, (_, j) => {
      let sum = this.b2[j];
      for (let i = 0; i < this.hiddenSize; i++) sum += z1[i] * this.W2[i][j];
      return sum;
    });
    return this.softmax(z2);
  }

  train(inputVec, targetVec) {
    const z1 = Array.from({ length: this.hiddenSize }, (_, j) => {
      let sum = this.b1[j];
      for (let i = 0; i < this.inputSize; i++) sum += inputVec[i] * this.W1[i][j];
      return this.sigmoid(sum);
    });
    const z2 = Array.from({ length: this.outputSize }, (_, j) => {
      let sum = this.b2[j];
      for (let i = 0; i < this.hiddenSize; i++) sum += z1[i] * this.W2[i][j];
      return sum;
    });
    const output = this.softmax(z2);
    const outputErrors = targetVec.map((t, i) => t - output[i]);

    const dW2 = Array.from({ length: this.hiddenSize }, () => Array(this.outputSize).fill(0));
    const db2 = Array(this.outputSize).fill(0);
    for (let i = 0; i < this.hiddenSize; i++)
      for (let j = 0; j < this.outputSize; j++)
        dW2[i][j] = this.lr * outputErrors[j] * z1[i];
    for (let j = 0; j < this.outputSize; j++) db2[j] = this.lr * outputErrors[j];

    const hiddenErrors = Array(this.hiddenSize).fill(0);
    for (let i = 0; i < this.hiddenSize; i++) {
      for (let j = 0; j < this.outputSize; j++)
        hiddenErrors[i] += outputErrors[j] * this.W2[i][j];
      hiddenErrors[i] *= this.sigmoidDerivative(z1[i]);
    }

    const dW1 = Array.from({ length: this.inputSize }, () => Array(this.hiddenSize).fill(0));
    const db1 = Array(this.hiddenSize).fill(0);
    for (let i = 0; i < this.inputSize; i++)
      for (let j = 0; j < this.hiddenSize; j++)
        dW1[i][j] = this.lr * hiddenErrors[j] * inputVec[i];
    for (let j = 0; j < this.hiddenSize; j++) db1[j] = this.lr * hiddenErrors[j];

    for (let i = 0; i < this.inputSize; i++)
      for (let j = 0; j < this.hiddenSize; j++)
        this.W1[i][j] += dW1[i][j];
    for (let j = 0; j < this.hiddenSize; j++) this.b1[j] += db1[j];
    for (let i = 0; i < this.hiddenSize; i++)
      for (let j = 0; j < this.outputSize; j++)
        this.W2[i][j] += dW2[i][j];
    for (let j = 0; j < this.outputSize; j++) this.b2[j] += db2[j];
  }

  toJSON() {
    return {
      inputSize: this.inputSize, hiddenSize: this.hiddenSize, outputSize: this.outputSize,
      lr: this.lr, W1: this.W1, b1: this.b1, W2: this.W2, b2: this.b2
    };
  }

  static fromJSON(json) {
    const nn = new NeuralNetwork(json.inputSize, json.hiddenSize, json.outputSize, json.lr);
    nn.W1 = json.W1; nn.b1 = json.b1; nn.W2 = json.W2; nn.b2 = json.b2;
    return nn;
  }
}

class TextVectorizer {
  constructor(vocabulary) { this.vocab = vocabulary; }
  vectorize(text) {
    const tokens = text.match(/[آ-یa-z0-9]+/gi) || [];
    const vec = new Array(this.vocab.length).fill(0);
    tokens.forEach(t => {
      const idx = this.vocab.indexOf(t.toLowerCase());
      if (idx !== -1) vec[idx] += 1;
    });
    return vec;
  }
}

const DEFAULT_VOCABULARY = [
  'سلام', 'hello', 'hi', 'hey', 'درود', 'خوبی', 'چطوری',
  'bye', 'goodbye', 'خداحافظ', 'می‌بینمت',
  'thanks', 'thank', 'مرسی', 'ممنون',
  'help', 'کمک', 'راهنما',
  'about', 'درباره', 'تو', 'کی', 'هستی',
  'تحلیل', 'analyz', 'بررسی', 'احساس', 'شخصیت'
];

const INTENT_LABELS = ['greeting', 'farewell', 'thanks', 'help', 'about', 'analysis', 'general'];

module.exports = { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS };
