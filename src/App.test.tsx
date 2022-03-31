import { describe, expect, it } from 'vitest';
import App from './App';
import { useStore } from './store';
import { render, screen, userEvent } from './test/test-utils';

describe(`App`, () => {
    it(`the title is visible`, () => {
        render(<App />);
        expect(screen.getByText(/Twordle/i)).toBeInTheDocument();
    });

    it(`shows an empty state`, () => {
        useStore.getState().newGame([]);
        render(<App />);

        expect(screen.queryByText(`Game Over`)).toBeNull();
        expect(document.querySelectorAll(`main div`)).toHaveLength(6);
        expect(document.querySelector(`main`)?.textContent).toEqual(``);
    });

    it(`shows one row of guesses`, () => {
        useStore.getState().newGame([`zelda`]);
        render(<App />);

        expect(document.querySelector(`main`)?.textContent).toEqual(`zelda`);
    });

    it(`shows succeeded game state`, () => {
        const answer = useStore.getState().answer;

        // useStore.getState().newGame(Array(2).fill(`ganon`));
        useStore.getState().addGuess(answer);
        render(<App />);

        expect(screen.getByText(`Game Over!`)).toBeInTheDocument();
    });

    it(`shows failed game state`, () => {
        useStore.getState().newGame(Array(6).fill(`ganon`));
        render(<App />);

        expect(screen.getByText(`Game Over!`)).toBeInTheDocument();
    });

    it(`can start a new game`, () => {
        useStore.getState().newGame(Array(6).fill(`ganon`));
        render(<App />);

        expect(screen.getByText(`Game Over!`)).toBeInTheDocument();
        userEvent.click(screen.getByText(`New Game`));
        expect(document.querySelector(`main`)?.textContent).toEqual(``);
    });
});
