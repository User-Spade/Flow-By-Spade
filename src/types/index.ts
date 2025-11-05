export enum TechniqueCategory {
  POSITION = 'Position',
  SUBMISSION = 'Submission',
  SWEEP = 'Sweep',
  ESCAPE = 'Escape',
  TRANSITION = 'Transition',
}

export enum BeltRank {
  WHITE = 'White Belt',
  BLUE = 'Blue Belt',
  PURPLE = 'Purple Belt',
  BROWN = 'Brown Belt',
  BLACK = 'Black Belt',
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  category: TechniqueCategory;
  positionGroup: string;
}

export interface Connection {
  source: string;
  target: string;
}

export interface TechniqueNode extends Technique {
  x: number;
  y: number;
}

export interface AISuggestion {
  name: string;
  reasoning: string;
}
