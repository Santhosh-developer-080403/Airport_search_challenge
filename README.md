
# Indian Airport Autocomplete

## 1. Project Overview

A simple airport autocomplete application built using React.
Users can search Indian airports using their IATA code or
city name and select an airport from the suggestions.

## 2. Technology Stack

- React
- JavaScript (ES6+)
- HTML
- CSS
- JSON

## 3. Why React?

I chose React.js because I have hands-on experience working with React and its hooks. It helped me build the autocomplete functionality using reusable components and manage state efficiently with useState and useEffect.

## 4. Installation and Setup

```bash
npm install
```

## 5. Run the Project

```bash
npm run dev
```

## 6. Features

- Search airports using IATA code or city name.
- Case-insensitive substring matching.
- Debounced search (250ms).
- Display top 5 matching airports.
- Show "No airports match" when there are no results.
- Keyboard navigation.
- Select an airport using mouse or keyboard.
- Display selected airport as JSON.

## 7. Technical Decisions

### How does debouncing work?

I used a 250ms debounce with setTimeout and clearTimeout to avoid filtering on every keystroke. This reduces unnecessary operations and improves the search experience.

### How are keyboard and mouse navigation synced?

I used a shared focusedIndex state to manage both keyboard navigation and mouse hover. This keeps the highlighted suggestion synchronized between both interactions.

### How would you support 10,000 airports?

I would introduce a search index to find matching airports more efficiently. This would improve search performance as the dataset grows.


