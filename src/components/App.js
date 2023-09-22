import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions when the application loads
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleDeleteQuestion = (id) => {
    // Remove the deleted question from state
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleUpdateQuestion = (id, newCorrectIndex) => {
    // Update the correctIndex for the question in state
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, correctIndex: newCorrectIndex }
          : question
      )
    );
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
