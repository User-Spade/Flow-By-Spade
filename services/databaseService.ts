/**
 * BJJ Database Service
 * 
 * Provides methods to query and access the BJJ technique database.
 * Handles loading, filtering, and transforming database content for the UI.
 */

import { BJJDatabase, Position, Technique, BeltLevel } from '../data/types/database.types';
import databaseJson from '../data/bjj-database.json';

class DatabaseService {
  private database: BJJDatabase;

  constructor() {
    this.database = databaseJson as BJJDatabase;
  }

  /**
   * Get all positions available at or below a specific belt level
   */
  getPositionsByBelt(beltLevel: BeltLevel | null = null): Record<string, Position> {
    if (!beltLevel) {
      return this.database.positions;
    }

    const beltOrder: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const maxBeltIndex = beltOrder.indexOf(beltLevel);

    const filtered: Record<string, Position> = {};
    
    Object.entries(this.database.positions).forEach(([key, position]) => {
      const positionBeltIndex = beltOrder.indexOf(position.system.min_belt);
      if (positionBeltIndex <= maxBeltIndex) {
        filtered[key] = position;
      }
    });

    return filtered;
  }

  /**
   * Get a single position by ID
   */
  getPosition(positionId: string): Position | null {
    return this.database.positions[positionId] || null;
  }

  /**
   * Get all positions by category
   */
  getPositionsByCategory(category: string, beltLevel: BeltLevel | null = null): Record<string, Position> {
    const positions = this.getPositionsByBelt(beltLevel);
    const filtered: Record<string, Position> = {};

    Object.entries(positions).forEach(([key, position]) => {
      if (position.system.category === category) {
        filtered[key] = position;
      }
    });

    return filtered;
  }

  /**
   * Get all techniques for a specific position
   */
  getTechniquesForPosition(positionId: string, beltLevel: BeltLevel | null = null): Technique[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    if (!beltLevel) {
      return position.techniques;
    }

    const beltOrder: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const maxBeltIndex = beltOrder.indexOf(beltLevel);

    return position.techniques.filter(technique => {
      const techniqueBeltIndex = beltOrder.indexOf(technique.min_belt);
      return techniqueBeltIndex <= maxBeltIndex;
    });
  }

  /**
   * Search positions by name or description
   */
  searchPositions(query: string): Record<string, Position> {
    const lowercaseQuery = query.toLowerCase();
    const results: Record<string, Position> = {};

    Object.entries(this.database.positions).forEach(([key, position]) => {
      const matchesName = position.learning.display_name.toLowerCase().includes(lowercaseQuery);
      const matchesAltName = position.learning.alternate_names.some(name => 
        name.toLowerCase().includes(lowercaseQuery)
      );
      const matchesDescription = position.learning.description.toLowerCase().includes(lowercaseQuery);

      if (matchesName || matchesAltName || matchesDescription) {
        results[key] = position;
      }
    });

    return results;
  }

  /**
   * Get belt-specific content for a position
   */
  getPositionBeltContent(positionId: string, beltLevel: BeltLevel) {
    const position = this.getPosition(positionId);
    if (!position) return null;

    return position.belt_levels[beltLevel];
  }

  /**
   * Get all unique categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    Object.values(this.database.positions).forEach(position => {
      categories.add(position.system.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Get positions that can be transitioned to from a given position
   */
  getTransitionsFrom(positionId: string): Position[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    return position.system.leads_to_position_ids
      .map(id => this.getPosition(id))
      .filter((p): p is Position => p !== null);
  }

  /**
   * Get positions that can transition into the given position
   */
  getTransitionsTo(positionId: string): Position[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    return position.system.entry_from_position_ids
      .map(id => this.getPosition(id))
      .filter((p): p is Position => p !== null);
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
