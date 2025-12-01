/**
 * BJJ Flow Database Type Definitions
 * 
 * These types define the structure of the BJJ technique database.
 * Used for type safety and auto-completion throughout the app.
 */

export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export interface BeltContent {
  // Human-facing belt-specific learning facets (will be progressively filled)
  concepts: string[]; // Core principles emphasized at this belt for the position
  techniques: string[]; // Technique IDs unlocked or emphasized at this belt level
  common_mistakes: string[]; // Belt-typical errors
  key_details: string[]; // Crucial refinements appropriate for belt
  transitions_available: string[]; // Position IDs reachable via belt-relevant transitions
  prerequisites?: string[]; // Concepts or positions required before progression
}

// Technique = Transition (Option A: unify transition edges into technique objects)
export interface Technique {
  // Identity & classification
  id: string;
  name: string;
  alternate_names: string[];
  description: string; // Brief purpose / contextual summary
  min_belt: BeltLevel; // Earliest recommended study belt
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  type: 'submission' | 'sweep' | 'pass' | 'escape' | 'entry' | 'back_take' | 'transition' | 'control_shift';

  // Human-facing learning detail
  steps: string[]; // Ordered granular execution steps
  key_points: string[]; // Fine technical cues
  common_mistakes: string[]; // Frequent failure patterns
  goals: string[]; // What successful completion achieves (e.g., secure mount, score sweep, isolate limb)
  setups: string[]; // Technique IDs or positional preconditions that commonly precede this
  counters: string[]; // Technique IDs that directly counter this
  variations: string[]; // Alternate finishing or entry variations

  // System-facing simulation metadata
  start_position_id: string; // Origin position node
  end_position_id: string; // Destination position node (may be same for retention / control shift)
  required_grips: string[]; // Abstracted controls needed (e.g. 'collar_grip', 'underhook')
  required_conditions: string[]; // State predicates (e.g. 'opponent_posts_hand')
  movement_profile: {
    elevation: 'up' | 'down' | 'neutral';
    rotation_deg: 0 | 45 | 90 | 180;
    inversion: boolean;
    pressure: 'forward' | 'backward' | 'lateral' | 'neutral';
    angle_entry: 'inside' | 'outside' | 'direct';
  };
  success_probability: { beginner: number; expert: number }; // Baseline simulation weighting
  failure_outcome: {
    outcome_type: 'revert' | 'scramble' | 'opponent_advances';
    position_id?: string; // Position reached on failure (if opponent advances or scramble defined)
  };
}

export interface Transition {
  from_position: string;
  to_position: string;
  min_belt: BeltLevel;
  techniques_used: string[];
  difficulty: 'easy' | 'moderate' | 'difficult' | 'advanced';
}

// System-facing positional metadata (node layer)
export interface PositionSystemMetadata {
  position_id: string; // Stable key (same as map key)
  min_belt: BeltLevel; // Unlock belt
  category: 'standing' | 'guard' | 'top_control' | 'bottom_control' | 'leg_entanglement' | 'transition_state' | 'escape' | 'advanced_guard' | 'hybrid';
  opponent_relative: string[]; // Multi-tag relational descriptors
  stability_score: 1 | 2 | 3 | 4 | 5; // Abstract difficulty to dislodge
  movement_directions_allowed: ('forward_pressure' | 'backward_retreat' | 'rotational' | 'inversion' | 'lateral_shift')[];
  allowed_technique_ids: string[]; // Techniques initiating here
  leads_to_position_ids: string[]; // Positions reachable via allowed techniques
  entry_from_position_ids: string[]; // Valid predecessor nodes
  risk_level: 'low' | 'medium' | 'high';
  hierarchy_score?: number; // Optional relative dominance ranking
}

// New: High-level foundation layer categories (dominance / strategic buckets)
export type FoundationCategory =
  | 'rear_mount_top'
  | 'full_mount_top'
  | 'side_control_top'
  | 'knee_on_belly_top'
  | 'turtle_top'
  | 'guard_top'
  | 'neutral'
  | 'guard_bottom'
  | 'turtle_bottom'
  | 'knee_on_belly_bottom'
  | 'side_control_bottom'
  | 'full_mount_bottom'
  | 'rear_mount_bottom';

export interface FoundationMappingEntry {
  position_id: string;
  foundation: FoundationCategory; // Primary bucket
  rank: number; // Dominance ranking (lower = more dominant for top perspective)
  transitional_target?: FoundationCategory; // If this position commonly progresses toward a higher control state
  notes?: string; // Classification rationale / ambiguity explanation
}

export interface FoundationMappingIndex {
  generated_at: string;
  foundations: {
    [key: string]: FoundationMappingEntry;
  };
}

// Human-facing positional learning layer
export interface PositionLearningMetadata {
  display_name: string;
  alternate_names: string[];
  description: string; // 1–3 sentence overview
  key_concepts: string[];
  entry_steps: string[];
  maintenance_steps: string[];
  escape_overview: string; // High-level view of opponent escapes / your retention ideas
  common_mistakes: string[];
  goals: string[]; // Offensive / control / transition goals
}

export interface Position {
  belt_levels: {
    white: BeltContent;
    blue: BeltContent;
    purple: BeltContent;
    brown: BeltContent;
    black: BeltContent;
  };
  techniques: Technique[]; // Techniques originating from or tightly coupled with this node
  // transitions field retained for future lightweight edges if needed (currently unused Option A)
  transitions: Transition[];
  system: PositionSystemMetadata; // Simulation layer
  learning: PositionLearningMetadata; // Human-facing layer
}

export interface BJJDatabase {
  version: string;
  last_updated: string;
  positions: {
    [key: string]: Position;
  };
}
