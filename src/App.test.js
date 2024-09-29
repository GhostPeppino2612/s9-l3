import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import list from "../src/scifi.json";

test("renders Welcome component", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Hey, nice to see you/i);
  expect(welcomeElement).toBeInTheDocument();
});

test("renders correct number of books as bootstrap cards", () => {
  render(<App />);
  const bookCards = screen.getAllByRole("img");
  expect(bookCards.length).toBe(list.length);
});

test("renders CommentArea component", () => {
  render(<App />);
  const commentArea = screen.queryByTestId("comment-area");
  expect(commentArea).toBeInTheDocument();
});

test("filters books based on search input", () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Inserisci il Nome del Film/i);
  fireEvent.change(searchInput, { target: { value: "Dune" } });
  const filteredBooks = screen.getAllByRole("img");
  expect(filteredBooks.length).toBe(1);
});

test("changes border color on book click", () => {
  render(<App />);
  const bookCard = screen.getAllByRole("img")[0];
  fireEvent.click(bookCard);

  const firstBookCard = screen.getByTestId("book-card-0");
  fireEvent.click(firstBookCard);
  expect(firstBookCard).toHaveClass("border-danger");
});

test("resets border of first book on clicking a second", () => {
  render(<App />);
  const firstBookCard = screen.getAllByRole("img")[0];
  const secondBookCard = screen.getAllByRole("img")[1];

  fireEvent.click(firstBookCard);
  fireEvent.click(secondBookCard);

  const firstCardAfterClick = screen.getByRole("img", { name: firstBookCard.alt });
  const secondCardAfterClick = screen.getByRole("img", { name: secondBookCard.alt });

  expect(firstCardAfterClick).not.toHaveClass("border-danger");
  expect(secondCardAfterClick).toHaveClass("border-danger");
});

test("no SingleComment component on initial load", () => {
  render(<App />);
  const singleComment = screen.queryByTestId("single-comment");
  expect(singleComment).toBeNull();
});

test("loads comments when a book with reviews is clicked", async () => {
  render(<App />);
  const bookWithReviews = screen.getAllByRole("img")[0];
  fireEvent.click(bookWithReviews);

  const comments = await screen.findByTestId("comment-area");
  expect(comments).toBeInTheDocument();
});
