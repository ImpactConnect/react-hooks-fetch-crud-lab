import React, { useState } from "react";

function QuestionItem({ question, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [selectedCorrectIndex, setSelectedCorrectIndex] =
    useState(correctIndex);

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedCorrectIndex(newCorrectIndex);

    // Send PATCH request to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // If the update request is successful, trigger onUpdate to update the question in the state
          onUpdate(id, newCorrectIndex);
        } else {
          console.error("Error updating question");
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedCorrectIndex}
          onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
      <button>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
