import React, { useState } from 'react';

function HighlightForm() {
    const [highlights, setHighlights] = useState([]); // Array to hold all points
    const [highlightInput, setHighlightInput] = useState(''); // Current input value

    // Handle change in input field
    const handleInputChange = (e) => {
        setHighlightInput(e.target.value);
    };

    // Add current input as a new point in the highlights list
    const handleAddHighlight = () => {
        if (highlightInput.trim()) {
            setHighlights([...highlights, highlightInput]);
            setHighlightInput(''); // Clear input after adding
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the highlights array to the server
        fetch('https://example.com/api/products/highlights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ highlights }) // Send the highlights as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally clear the highlights after successful submission
            setHighlights([]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>Add Product Highlights</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={highlightInput}
                    onChange={handleInputChange}
                    placeholder="Enter highlight"
                />
                <button type="button" onClick={handleAddHighlight}>Add Highlight</button>
                <button type="submit">Submit Highlights</button>
            </form>
            <div>
                <h3>Current Highlights:</h3>
                <ul>
                    {highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HighlightForm;
