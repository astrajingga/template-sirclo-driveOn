import { useState } from "react";

const ProgressBar = ({ rating }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${rating}%`
    }
    setStyle(newStyle);
  }, 200);

  return (
    <div className="progressBar">
      <div className="progressBar-done" style={style}></div>
    </div>
  )
}

export default ProgressBar;