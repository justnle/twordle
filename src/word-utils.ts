import wordBank from './word-bank.json';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

export enum LetterState {
    Miss,
    Present,
    Match
}

export function computeGuess(guess: string, answer: string): LetterState[] {
    const guessArray = guess.split('');
    const answerArray = answer.split('');
    const answerLetterCount: Record<string, number> = {};
    const result: LetterState[] = [];

    if (guess.length !== answer.length) {
        return result;
    }

    guessArray.forEach((letter, index) => {
        const currentAnswerLetter = answerArray[index];

        answerLetterCount[currentAnswerLetter] = answerLetterCount[
            currentAnswerLetter
        ]
            ? answerLetterCount[currentAnswerLetter] + 1
            : 1;

        if (letter === currentAnswerLetter) {
            result.push(LetterState.Match);
        } else if (answerArray.includes(letter)) {
            result.push(LetterState.Present);
        } else {
            result.push(LetterState.Miss);
        }
    });

    result.forEach((currResult, resultIndex) => {
        if (currResult !== LetterState.Present) {
            return;
        }

        const guessLetter = guessArray[resultIndex];

        answerArray.forEach((currentAnswerLetter, answerIndex) => {
            if (currentAnswerLetter !== guessLetter) {
                return;
            }

            if (result[answerIndex] === LetterState.Match) {
                result[resultIndex] = LetterState.Miss;
            }

            if (answerLetterCount[guessLetter] <= 0) {
                result[resultIndex] = LetterState.Miss;
            }
        });
        answerLetterCount[guessLetter]--;
    });
    return result;
}
