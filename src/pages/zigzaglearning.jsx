import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// Import videos for first 3 levels
import Video1 from "../assets/vidieo1.mp4";
import Video2 from "../assets/vidieo2.mp4";
import Video3 from "../assets/vidieo3.mp4";

// Levels Array (1-20)
const levels = Array.from({ length: 20 }, (_, i) => ({ id: 7087 + i }));

// Quiz Questions (including new levels 5,6,7)
const quizQuestions = [
  // Level 4 quizzes (existing)
  { question: "What is the safest place during an earthquake?", options: ["Under a tree", "Near windows", "Under a sturdy table", "On stairs"], correct: 2 },
  { question: "Which item is essential in a disaster kit?", options: ["Toys", "Water", "Makeup", "TV remote"], correct: 1 },
  { question: "Flood safety: You should…", options: ["Walk through moving water", "Stay on higher ground", "Touch electric wires", "Swim across rivers"], correct: 1 },

  // Level 5 quizzes
  { question: "First step when flood warning issued?", options: ["Move to higher ground","Stay inside","Ignore","Swim"], correct: 0 },
  { question: "Avoid walking in moving water because…", options: ["Can sweep you away","Safe","Good exercise","Nothing"], correct: 0 },
  { question: "Critical item in flood kit?", options: ["Water","Toy","TV","Phone"], correct: 0 },

  // Level 6 quizzes
  { question: "Purpose of family disaster plan?", options: ["Ensure safety","Fun","Nothing","Exercise"], correct: 0 },
  { question: "Turn off before evacuation?", options: ["Gas, electricity, water","TV","Computer","Fridge"], correct: 0 },
  { question: "Why evacuation drills?", options: ["Practice safe escape","Fun","Ignore","Nothing"], correct: 0 },

  // Level 7 quizzes
  { question: "Diseases spread after floods?", options: ["Cholera, malaria","Cold","Flu","Cancer"], correct: 0 },
  { question: "Avoid floodwater contact because…", options: ["It has germs","Safe","Fun","Nothing"], correct: 0 },
  { question: "Food safety post-flood?", options: ["Discard","Eat","Nothing","Fun"], correct: 0 },
];

const ZigzagLearning = ({ onBack }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [showPopup, setShowPopup] = useState(null); // "correct" | "wrong" | "final"
  const [score, setScore] = useState(0);
  const [wrongQueue, setWrongQueue] = useState([]);
  const [lastWrongAnswer, setLastWrongAnswer] = useState(null);

  // Handle Level Click
  const handleLevelClick = (idx) => {
    switch (idx) {
      case 0: setActiveVideo(Video1); break;
      case 1: setActiveVideo(Video2); break;
      case 2: setActiveVideo(Video3); break;
      case 3: // Level 4 quiz
      case 4: // Level 5 quiz
      case 5: // Level 6 quiz
      case 6: // Level 7 quiz
        setShowQuiz(true);
        setCurrentQ(idx === 3 ? 0 : idx === 4 ? 3 : idx === 5 ? 6 : 9);
        setScore(0);
        setWrongQueue([]);
        setLastWrongAnswer(null);
        setShowPopup(null);
        break;
      default: setActiveVideo(null);
    }
  };

  // Quiz Handlers
  const handleAnswer = (index) => {
    if (index === quizQuestions[currentQ].correct) {
      setScore(score + 1);
      setShowPopup("correct");
    } else {
      setLastWrongAnswer({
        question: quizQuestions[currentQ].question,
        correctOption: quizQuestions[currentQ].options[quizQuestions[currentQ].correct],
        qIndex: currentQ,
      });
      setWrongQueue([...wrongQueue, quizQuestions[currentQ]]);
      setShowPopup("wrong");
    }
  };

  const handleNext = () => {
    setShowPopup(null);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else if (wrongQueue.length > 0) {
      const repeatQ = wrongQueue[0];
      setWrongQueue(wrongQueue.slice(1));
      quizQuestions.push(repeatQ);
      setCurrentQ(quizQuestions.length - 1);
    } else {
      setShowPopup("final");
    }
  };

  const stars =
    score === quizQuestions.length
      ? 3
      : score >= quizQuestions.length / 2
      ? 2
      : score > 0
      ? 1
      : 0;

  return (
    <div className="relative h-screen overflow-y-scroll bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 px-5 py-2 bg-gray-800 text-green-400 font-bold rounded-lg shadow-lg hover:bg-gray-700 hover:scale-105 transition-all"
      >
        ← Back
      </button>

      {/* LEVELS ZIGZAG */}
      {levels.map((lvl, idx) => (
        <motion.div
          key={lvl.id}
          onClick={() => handleLevelClick(idx)}
          className="absolute flex items-center justify-center w-20 h-20 cursor-pointer group"
          style={{
            top: `${idx * 110 + 120}px`,
            left: idx % 2 === 0 ? "25%" : "65%",
          }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-300 group-hover:shadow-green-400/50"
            style={{
              background:
                idx < 4
                  ? "linear-gradient(145deg, #34d399, #059669)"
                  : idx < 7
                  ? "linear-gradient(145deg, #06b6d4, #0ea5e9)"
                  : "linear-gradient(145deg, #1f2937, #111827)",
              color: idx < 7 ? "#fff" : "#6b7280",
              boxShadow:
                idx < 7
                  ? "0 0 25px rgba(16,185,129,0.8)"
                  : "inset 2px 2px 5px rgba(0,0,0,0.8)",
            }}
          >
            {lvl.id}
          </div>
        </motion.div>
      ))}

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[50%]"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="mb-2 px-4 py-1 bg-red-500 text-white rounded-md float-right hover:bg-red-600"
            >
              ✕ Close
            </button>
            <div className="mt-6">
              <video controls autoPlay className="w-full rounded-lg" src={activeVideo} />
            </div>
          </motion.div>
        </div>
      )}

      {/* QUIZ POPUP */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <motion.div
              key={currentQ}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg text-center relative text-white"
            >
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute top-3 right-3 text-gray-200 hover:text-white transition-all"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-teal-300 mb-4">
                Q{currentQ + 1}. {quizQuestions[currentQ].question}
              </h2>

              <div className="grid gap-3">
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    whileHover={{ scale: 1.05, backgroundColor: "#22d3ee", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl border border-teal-400 bg-blue-700 hover:bg-blue-600 transition-all font-semibold"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* POPUPS */}
            {showPopup === "correct" && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute bg-blue-700 border-2 border-teal-400 p-6 rounded-2xl shadow-xl text-center w-80 text-white"
              >
                <h3 className="text-2xl font-bold text-teal-300">🎉 Correct!</h3>
                <p className="mt-2 text-teal-200">Well done!</p>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-teal-500 rounded-lg font-semibold shadow hover:bg-teal-400"
                >
                  Next
                </motion.button>
              </motion.div>
            )}

            {showPopup === "wrong" && lastWrongAnswer && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute bg-red-800 border-2 border-red-400 p-6 rounded-2xl shadow-xl text-center w-96 text-white"
              >
                <h3 className="text-2xl font-bold text-red-300">❌ Oops!</h3>
                <p className="mt-2 text-red-200">Wrong Answer</p>
                <p className="mt-2 text-sm font-semibold text-red-100">
                  ✅ Correct Answer: {lastWrongAnswer.correctOption}
                </p>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-red-600 rounded-lg font-semibold shadow hover:bg-red-500"
                >
                  Next Question
                </motion.button>
              </motion.div>
            )}

            {showPopup === "final" && (
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="absolute bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 p-6 rounded-2xl shadow-2xl text-center w-96 text-white"
              >
                <h3 className="text-2xl font-bold mb-2 text-teal-300">Level Complete 🎉</h3>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      size={32}
                      className={stars >= s ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                    />
                  ))}
                </div>
                <p className="text-teal-200 mb-4">
                  You scored {score}/{quizQuestions.length}
                </p>
                <motion.button
                  onClick={() => setShowQuiz(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-teal-500 rounded-lg font-semibold shadow hover:bg-teal-400"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZigzagLearning;