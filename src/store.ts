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

                set(() => ({
                    rows,
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
                addGuess,
                newGame: (initialRows = []) => {
                    set({
                        answer: getRandomWord(),
                        rows: [],
                        gameState: `active`
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
