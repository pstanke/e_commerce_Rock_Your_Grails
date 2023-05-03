import { useState } from 'react';
import { Button } from 'react-bootstrap';

export const TextComponent = ({ text, maxTextLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const truncatedText = text.slice(0, maxTextLength);
  const displayText = showFullText ? text : truncatedText + '...';

  const buttonText = showFullText ? 'Show less' : 'Show more';

  const handleButtonClick = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="my-4">
      <p>{displayText}</p>
      {text.length > maxTextLength && (
        <Button variant="light" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
