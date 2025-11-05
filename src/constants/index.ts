import { Technique, Connection, TechniqueCategory, BeltRank } from '../types';

export const TECHNIQUES: Technique[] = [
  // Guard
  { id: '1', name: 'Closed Guard', description: 'A foundational defensive position.', category: TechniqueCategory.POSITION, positionGroup: 'Guard' },
  { id: '2', name: 'Armbar from Guard', description: 'A submission targeting the elbow joint.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Guard' },
  { id: '3', name: 'Triangle Choke', description: 'A choke using the legs.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Guard' },
  { id: '4', name: 'Scissor Sweep', description: 'A sweep to reverse the position.', category: TechniqueCategory.SWEEP, positionGroup: 'Guard' },
  { id: '5', name: 'Guard Pass', description: 'Transitioning past the opponent\'s legs.', category: TechniqueCategory.TRANSITION, positionGroup: 'Guard' },
  
  // Side Control
  { id: '6', name: 'Side Control', description: 'A dominant top position.', category: TechniqueCategory.POSITION, positionGroup: 'Side Control' },
  { id: '7', name: 'Kimura', description: 'A shoulder lock submission.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Side Control' },
  { id: '8', name: 'Americana', description: 'Another shoulder lock submission.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Side Control' },
  { id: '9', name: 'Transition to Mount', description: 'Improving position from side control.', category: TechniqueCategory.TRANSITION, positionGroup: 'Side Control' },
  { id: '10', name: 'Hip Escape', description: 'An escape to create space and re-guard.', category: TechniqueCategory.ESCAPE, positionGroup: 'Side Control' },

  // Mount
  { id: '11', name: 'Mount', description: 'A highly dominant top position.', category: TechniqueCategory.POSITION, positionGroup: 'Mount' },
  { id: '12', name: 'Armbar from Mount', description: 'Submission from the mount position.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Mount' },
  { id: '13', name: 'Ezekiel Choke', description: 'A choke using the sleeve.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Mount' },
  { id: '14', name: 'Trap and Roll Escape', description: 'A fundamental escape from mount.', category: TechniqueCategory.ESCAPE, positionGroup: 'Mount' },

  // Back Control
  { id: '15', name: 'Back Control', description: 'The most dominant position in BJJ.', category: TechniqueCategory.POSITION, positionGroup: 'Back Control' },
  { id: '16', name: 'Rear Naked Choke', description: 'The king of submissions.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Back Control' },
  { id: '17', name: 'Bow and Arrow Choke', description: 'A powerful gi choke from the back.', category: TechniqueCategory.SUBMISSION, positionGroup: 'Back Control' },
];

export const CONNECTIONS: Connection[] = [
  { source: '1', target: '2' }, // Closed Guard -> Armbar
  { source: '1', target: '3' }, // Closed Guard -> Triangle
  { source: '1', target: '4' }, // Closed Guard -> Scissor Sweep
  { source: '5', target: '6' }, // Guard Pass -> Side Control
  { source: '4', target: '11'}, // Scissor Sweep -> Mount
  { source: '6', target: '7' }, // Side Control -> Kimura
  { source: '6', target: '8' }, // Side Control -> Americana
  { source: '6', target: '9' }, // Side Control -> Transition to Mount
  { source: '9', target: '11' }, // Transition to Mount -> Mount
  { source: '10', target: '1' }, // Hip Escape -> Closed Guard
  { source: '11', target: '12' },// Mount -> Armbar
  { source: '11', target: '13' },// Mount -> Ezekiel
  { source: '14', target: '1' }, // Trap and Roll -> Closed Guard
  // A connection to back control for demonstration
  { source: '11', target: '15' }, // Mount -> Back Control
  { source: '15', target: '16' }, // Back Control -> RNC
  { source: '15', target: '17' }, // Back Control -> Bow and Arrow
];

export const BELT_RANKS = Object.values(BeltRank);
