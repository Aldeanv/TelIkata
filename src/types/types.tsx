export interface Explanation {
  index: number;
  wrong: string;
  correct: string;
  explanation: string;
}

export interface ResultData {
  time: number;
  totalErrors: number;
  correct: number;
  clicked: number;
  totalWords: number;
  original: string;
  corrected: string;
  explanations: Explanation[];
  isChallengeMode?: boolean;
  timeUp?: boolean;
  duration?: number;
  difficulty?: string;
}

export type Correction = {
  correct: string[];
  explanation: string;
  wordIndex:string;
};

export type Sample = {
  original: string;
  corrections: {
    [index: number]: Correction;
  };
};

export type Difficulty = "mudah" | "menengah" | "sulit" | "challenge";
