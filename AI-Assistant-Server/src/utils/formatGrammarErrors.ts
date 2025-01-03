import { GrammarError } from '../types/propTypes';

/**
 * Takes an array of matches returned by the `language-tool` library and
 * formats them into an array of {@link GrammarError} objects.
 *
 * @param {object[]} matches
 * @returns {GrammarError[]}
 */

export const formatGrammarErrors = (matches: any[]): GrammarError[] =>
  matches.map((match) => ({
    sentence: match.sentence,
    error: match.message,
    suggestions: match.replacements
      ? match.replacements.map((s: any) => s.value)
      : [],
    position: {
      start: match.offset,
      end: match.offset + match.length,
    },
  }));
