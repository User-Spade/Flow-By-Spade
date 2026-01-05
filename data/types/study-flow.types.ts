export type Belt = "white" | "blue" | "purple" | "brown" | "black";
export type Quality = "best" | "ok" | "risky" | "bad";

export type Actor = "you" | "opponent";

export interface Position {
  id: string;
  name: string;
  description?: string;
  isStartPosition?: boolean;
}

export interface OpponentResponse {
  id: string;
  label: string;
  toPositionId: string;
  quality: Quality;
  note: string;
  isTerminal?: boolean;
}

export interface Transition {
  id: string;
  fromPositionId: string;
  toPositionId: string;
  label: string;
  quality: Quality;
  note: string;
  minBelt: Belt;
  isTerminal?: boolean;
  opponentResponses?: OpponentResponse[];
}

export interface FlowStep {
  id: string;
  actor: Actor;
  fromPositionId: string;
  toPositionId: string;
  label: string;     // move label (or response label)
  quality: Quality;
  note: string;
}
