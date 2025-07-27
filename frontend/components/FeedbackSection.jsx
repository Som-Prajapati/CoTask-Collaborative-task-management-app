import React, { useState } from "react";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  return (
    <div className="text-white w-[90%]">
      <h3 className="text-2xl font-bold mb-4">Feedback</h3>

      {/* Rate Me (Star Rating) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Rate Me</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-zinc-600"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Comments</label>
        <textarea
          placeholder="Write your feedback here..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-[50vw] bg-transparent border-zinc-800 border-[0.5px] rounded-md px-4 py-2 text-sm h-32"
        />
      </div>

      <button className="bg-white text-black px-4 py-2 rounded-md">Submit Feedback</button>
    </div>
  );
};

export default FeedbackSection;