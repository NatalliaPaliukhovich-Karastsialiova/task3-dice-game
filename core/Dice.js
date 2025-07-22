export default class Dice {
  constructor(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Dice must have at least one face.');
    }
    this.faces = values.map((v) => {
      const n = parseInt(v);
      if (isNaN(n)) throw new Error(`Invalid face value: ${v}`);
      return n;
    });
  }

  getFace(index) {
    return this.faces[index];
  }

  getFaces() {
    return this.faces;
  }

  getFaceCount() {
    return this.faces.length;
  }

  toString() {
    return `[${this.faces.join(',')}]`;
  }
}
