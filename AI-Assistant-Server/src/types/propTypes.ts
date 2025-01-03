type Position = {
  start: number;
  end: number;
}

type GrammarError = {
  sentence: string;
  error: string;
  suggestions: string[];
  position: Position;
}

export type {Position, GrammarError}