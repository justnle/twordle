import { useState } from 'react';
import { useStore } from './store';
import { LETTER_LENGTH } from './word-utils';
import WordRow from './WordRow';

const GUESS_LENGTH = 6;

export default function App() {
    const state = useStore();
    const [guess, setGuess] = useState(``);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGuess = e.target.value;

        if (newGuess.length === LETTER_LENGTH) {
            state.addGuess(newGuess);
            setGuess(``);
            return;
        }
        setGuess(newGuess);
    };

    let rows = [...state.guesses];

    if (rows.length < GUESS_LENGTH) {
        rows.push(guess);
    }

    const remainingGuesses = GUESS_LENGTH - rows.length;

    rows = rows.concat(Array(remainingGuesses).fill(``));

    return (
        <div className="mx-auto w-96">
            <header className="border-b border-gray-500 pb-2 my-2">
                <h1 className="text-4xl text-center">Twordle</h1>

                <div>
                    <input
                        type="text"
                        className="border-2 border-gray-500 p-2 w-half"
                        value={guess}
                        onChange={handleChange}
                    />
                </div>
            </header>

            <main className="grid grid-rows-6 gap-4">
                {rows.map((word, index) => (
                    <WordRow key={`${index}-${word}`} letters={word} />
                ))}
            </main>
        </div>
    );
}
