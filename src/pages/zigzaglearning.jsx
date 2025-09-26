import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Home, Trophy, Play, Brain, ChevronLeft } from "lucide-react";

// Import videos for levels
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
  const [completedLevels, setCompletedLevels] = useState([]);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [showPopup, setShowPopup] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongQueue, setWrongQueue] = useState([]);
  const [lastWrongAnswer, setLastWrongAnswer] = useState(null);

  // Map index -> video
  const videoMap = [Video1, Video2, Video3];

  // Handle Level Click
  const handleLevelClick = (idx) => {
    if (idx % 2 === 0) {
      // Even index = video
      const videoIndex = idx / 2;
      setActiveVideo(videoMap[videoIndex] || videoMap[videoMap.length - 1]); // fallback to last video
    } else {
      // Odd index = quiz
      setShowQuiz(true);
      // Each quiz set is 3 questions long
      const quizStartIndex = Math.floor(idx / 2) * 3; 
      setCurrentQ(quizStartIndex);
      setScore(0);
      setWrongQueue([]);
      setLastWrongAnswer(null);
      setShowPopup(null);
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
      // Mark level as completed
      const levelIndex = Math.floor(currentQ / 3) * 2 + 1;
      if (!completedLevels.includes(levelIndex)) {
        setCompletedLevels([...completedLevels, levelIndex]);
      }
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
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/21542/hammerfest-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      
      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-600 hover:scale-105 transition-all"
        >
          <ChevronLeft size={20} /> Back
        </button>
        
        <div className="flex items-center gap-2 bg-indigo-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-indigo-600">
          <Trophy className="text-yellow-400" size={20} />
          <span className="font-bold">Levels Completed: {completedLevels.length}/10</span>
        </div>
      </div>

      {/* TITLE */}
      <div className="relative z-10 text-center mb-8 mt-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Disaster Safety Adventure
        </h1>
        <p className="text-indigo-200 mt-2">Learn through videos and quizzes to become a safety expert!</p>
      </div>

      {/* LEVELS ZIGZAG PATH */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Path line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24 bottom-24 w-2 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"></div>
        
        {/* Level circles */}
        <div className="relative py-12">
          {levels.map((lvl, idx) => {
            const isCompleted = completedLevels.includes(idx);
            const isVideoLevel = idx % 2 === 0;
            
            return (
              <motion.div
                key={lvl.id}
                onClick={() => handleLevelClick(idx)}
                className={`absolute flex items-center justify-center w-20 h-20 cursor-pointer group ${
                  idx % 2 === 0 ? "left-1/4" : "left-3/4"
                }`}
                style={{
                  top: `${idx * 70 + 50}px`,
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Connection line to main path */}
                <div className={`absolute h-1 w-12 bg-cyan-400  ${idx % 2 === 0 ? '-right-12' : '-left-12'}`}></div>
                
                {/* Level circle */}
                <div className={`w-20 h-20 flex items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-300 group-hover:shadow-cyan-400/50 relative ${
                  isCompleted ? "ring-4 ring-yellow-400 ring-opacity-70" : ""
                }`}
                style={{
                  background: isVideoLevel
                    ? "linear-gradient(145deg, #34d399, #059669)"
                    : "linear-gradient(145deg, #06b6d4, #0ea5e9)",
                  color: "#fff",
                  boxShadow: isCompleted 
                    ? "0 0 25px rgba(250, 204, 21, 0.8)" 
                    : "0 0 25px rgba(16,185,129,0.8)",
                }}
                >
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      <Star size={16} className="text-yellow-800 fill-yellow-800" />
                    </div>
                  )}
                  
                  {isVideoLevel ? (
                    <div className="flex flex-col items-center">
                      <Play size={24} className="mb-1" />
                      <span className="text-xs">Video {idx/2 + 1}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Brain size={24} className="mb-1" />
                      <span className="text-xs">Quiz {Math.floor(idx/2) + 1}</span>
                    </div>
                  )}
                </div>
                
                {/* Level number */}
                <div className={`absolute -bottom-6 text-sm font-bold ${
                  isCompleted ? "text-yellow-400" : "text-white"
                }`}>
                  Level {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[50%] border border-cyan-500"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-400">Learning Video</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-4">
              <video controls autoPlay className="w-full rounded-lg" src={activeVideo} />
            </div>
          </motion.div>
        </div>
      )}

      {/* QUIZ POPUP */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
            <motion.div
              key={currentQ}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg text-center relative text-white border border-cyan-400"
            >
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute top-3 right-3 text-gray-200 hover:text-white transition-all bg-red-600 rounded-full p-1"
              >
                ✕
              </button>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold bg-cyan-700 px-3 py-1 rounded-full">
                  Question {currentQ + 1} of {quizQuestions.length}
                </div>
                <div className="text-sm font-semibold bg-purple-700 px-3 py-1 rounded-full">
                  Score: {score}
                </div>
              </div>

              <h2 className="text-xl font-bold text-cyan-300 mb-4">
                {quizQuestions[currentQ].question}
              </h2>

              <div className="grid gap-3">
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    whileHover={{ scale: 1.05, backgroundColor: "#22d3ee", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl border border-cyan-400 bg-blue-700 hover:bg-blue-600 transition-all font-semibold text-left"
                  >
                    <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
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
                className="absolute bg-gradient-to-br from-green-700 to-green-800 border-2 border-green-400 p-6 rounded-2xl shadow-xl text-center w-80 text-white"
              >
                <div className="text-5xl mb-2">🎉</div>
                <h3 className="text-2xl font-bold text-green-300">Correct!</h3>
                <p className="mt-2 text-green-200">Well done!</p>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-green-500 rounded-lg font-semibold shadow hover:bg-green-400"
                >
                  Next Question
                </motion.button>
              </motion.div>
            )}

            {showPopup === "wrong" && lastWrongAnswer && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute bg-gradient-to-br from-red-800 to-red-900 border-2 border-red-400 p-6 rounded-2xl shadow-xl text-center w-96 text-white"
              >
                <div className="text-5xl mb-2">❌</div>
                <h3 className="text-2xl font-bold text-red-300">Try Again!</h3>
                <p className="mt-2 text-red-200">That's not quite right</p>
                <p className="mt-2 text-sm font-semibold text-red-100">
                  Correct Answer: {lastWrongAnswer.correctOption}
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
                className="absolute bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6 rounded-2xl shadow-2xl text-center w-96 text-white border border-cyan-400"
              >
                <div className="text-5xl mb-2">🏆</div>
                <h3 className="text-2xl font-bold mb-2 text-cyan-300">Level Complete!</h3>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      size={32}
                      className={stars >= s ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                    />
                  ))}
                </div>
                <p className="text-cyan-200 mb-4">
                  You scored {score}/{quizQuestions.length}
                </p>
                <motion.button
                  onClick={() => setShowQuiz(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-cyan-500 rounded-lg font-semibold shadow hover:bg-cyan-400"
                >
                  Continue Journey
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