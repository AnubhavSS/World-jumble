interface Word {
    answer: string;
    letters: string[];
}

export type Words = Word[];

export const words = {
  Easy: [
    { answer: "READ", letters: ["D", "A", "R", "E"] },
    { answer: "GAME", letters: ["M", "A", "G", "E"] },
    { answer: "TREE", letters: ["E", "R", "T", "E"] },
  ],

  Medium: [
    { answer: "PLANET", letters: ["T", "P", "L", "A", "N", "E"] },
    { answer: "MARKET", letters: ["K", "E", "T", "M", "A", "R"] },
    { answer: "OBJECT", letters: ["B", "J", "E", "C", "T", "O"] },
  ],

  Hard: [
    { answer: "ELEPHANT", letters: ["P", "H", "A", "E", "N", "L", "T", "E"] },
    { answer: "COMPUTER", letters: ["T", "R", "C", "O", "M", "P", "U", "E"] },
    { answer: "NOTEBOOK", letters: ["O", "B", "K", "N", "O", "T", "E", "E"] },
  ],
};