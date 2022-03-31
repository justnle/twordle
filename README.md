# Twordle

A Wordle clone, which is a web-based word game where the user has six tries to guess
a random five letter word. With each of the guesses, the user is presented some feedback
to help narrow down the answer: the letter tile renders green if the letter is present in
the word and in the correct space, yellow if the letter is present in the word and in the
incorrect space, and gray if the letter is not present in the word at all.

## Technologies

This application was built with:

-   [React.js](https://reactjs.org/docs/getting-started.html) - Frontend Library
-   [Tailwind CSS](https://tailwindcss.com/docs/installation) - CSS Framework
-   [Vite.js](https://vitejs.dev/guide/)
-   [Zustand](https://github.com/pmndrs/zustand) - State Management

Testing done with:

-   [Vitest](https://vitest.dev/) - Testing framework powered by Vite

## Road Map

-   Implement hard mode (subsequent guesses must include previously discovered correct letters)
-   Implement dark mode
-   Implement score history

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
