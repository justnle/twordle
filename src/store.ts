import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord, LetterState } from './word-utils';

export const GUESS_LENGTH = 6;
interface GuessRow {
    guess: string;
    result?: LetterState[];
}

interface StoreState {
    answer: string;
    rows: GuessRow[];
    gameState: `active` | `success` | `fail`;
    keyboardLetterState: { [letter: string]: LetterState };
    addGuess: (guess: string) => void;
    newGame: (initialGuess?: string[]) => void;
}

export const useStore = create<StoreState>(
    persist(
        (set, get) => {
            const addGuess = (guess: string) => {
                const result = computeGuess(guess, get().answer);
                const succeed = result.every((i) => i === LetterState.Match);

                const rows = [
                    ...get().rows,
                    {
                        guess,
                        result
                    }
                ];

                const keyboardLetterState = get().keyboardLetterState;
                result.forEach((r, index) => {
                    const resultGuessLetter = guess[index];
                    const currentLetterState =
                        keyboardLetterState[resultGuessLetter];

                    switch (currentLetterState) {
                        case LetterState.Match:
                            break;
                        case LetterState.Present:
                            if (r === LetterState.Miss) {
                                break;
                            }
                        default:
                            keyboardLetterState[resultGuessLetter] = r;
                            break;
                    }
                });

                set(() => ({
                    rows,
                    keyboardLetterState,
                    gameState: succeed
                        ? `success`
                        : rows.length === GUESS_LENGTH
                        ? `fail`
                        : `active`
                }));
            };

            return {
                answer: getRandomWord(),
                rows: [],
                gameState: `active`,
                keyboardLetterState: {},
                addGuess,
                newGame: (initialRows = []) => {
                    set({
                        answer: getRandomWord(),
                        rows: [],
                        gameState: `active`,
                        keyboardLetterState: {}
                    });

                    initialRows.forEach(addGuess);
                }
            };
        },
        {
            name: `twordle`
        }
    )
);

// useStore.persist.clearStorage();
