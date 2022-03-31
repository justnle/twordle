import { describe, expect, it } from 'vitest';
import {
    computeGuess,
    getRandomWord,
    isValidWord,
    LetterState
} from './utils/word-utils';

describe(`getRandomWord`, () => {
    it(`random word`, () => {
        expect(getRandomWord()).toBeTruthy();
        expect(getRandomWord().length).toEqual(5);
    });
});

describe(`computeGuess`, () => {
    it(`works with match and present`, () => {
        // computeGuess(guess, answer)
        expect(computeGuess(`kabar`, `kirby`)).toEqual([
            LetterState.Match,
            LetterState.Miss,
            LetterState.Present,
            LetterState.Miss,
            LetterState.Present
        ]);
    });

    it(`works with all matches`, () => {
        expect(computeGuess(`mario`, `mario`)).toEqual([
            LetterState.Match,
            LetterState.Match,
            LetterState.Match,
            LetterState.Match,
            LetterState.Match
        ]);
    });

    it(`works with all misses`, () => {
        expect(computeGuess(`traps`, `luigi`)).toEqual([
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss
        ]);
    });

    it(`works with double letters, matching only one, not both`, () => {
        expect(computeGuess(`stock`, `smash`)).toEqual([
            LetterState.Match,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss
        ]);
    });

    test(`returns an empty array when given an incomplete guess`, () => {
        expect(computeGuess(`to`, `zelda`)).toEqual([]);
    });

    test(`when two letters are present, but answer has only one of the letters`, () => {
        expect(computeGuess(`koopa`, `scorn`)).toEqual([
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Match,
            LetterState.Miss,
            LetterState.Miss
        ]);
    });

    test(`when one letter matches, but guess has more of the same letter`, () => {
        expect(computeGuess(`dough`, `diddy`)).toEqual([
            LetterState.Match,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss
        ]);
    });
});

describe(`isValidWord`, () => {
    it(`works with a word in wordBank`, () => {
        expect(isValidWord(`hello`)).toBe(true);
    });

    it(`works with a word not in wordBank`, () => {
        expect(isValidWord(`asdfg`)).toBe(false);
    });
});
