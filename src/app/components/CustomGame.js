"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smile, ThumbsUp, RefreshCw, Award, Heart  ,Trophy  ,Clock} from "lucide-react";

export default function BubblePopGame() {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("Pop bubbles to relax and win rewards!");
  const [congratsMessage, setCongratsMessage] = useState("");
  
  // Bubble colors in brand theme
  const bubbleColors = [
    "bg-gradient-to-r from-purple-500 to-blue-400",
    "bg-gradient-to-r from-pink-500 to-purple-400",
    "bg-gradient-to-r from-blue-500 to-indigo-400",
    "bg-gradient-to-r from-indigo-500 to-purple-400",
    "bg-gradient-to-r from-purple-600 to-blue-500",
  ];
  
  // Emoji options for bubble content
  const emojis = ["🎁", "👕", "👔", "👗", "🧥", "👚", "🧢", "🥾", "👘", "👜", "🧣", "✨"];
  
  // Create initial bubbles
  const createBubbles = () => {
    const newBubbles = [];
    const count = 12 + (level * 2); // More bubbles at higher levels
    
    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 90, // % of container width
        y: Math.random() * 90, // % of container height
        size: Math.floor(Math.random() * 3) + 2, // sizes 2-4rem
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        points: Math.floor(Math.random() * 5) + 1, // 1-5 points
        popped: false
      });
    }
    
    setBubbles(newBubbles);
  };
  
  // Start game
  const startGame = () => {
    createBubbles();
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameComplete(false);
    setShowReward(false);
  };
  
  // Reset game
  const resetGame = () => {
    setGameActive(false);
    setGameComplete(false);
    setLevel(1);
    setMessage("Pop bubbles to relax and win rewards!");
  };
  
  // Next level
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    startGame();
  };
  
  // Timer effect
  useEffect(() => {
    let timerId;
    
    if (gameActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameComplete(true);
      
      // Calculate reward based on score
      let reward;
      if (score >= 50) {
        reward = "15% OFF";
        setCongratsMessage("Amazing! You've earned a special discount!");
      } else if (score >= 30) {
        reward = "10% OFF";
        setCongratsMessage("Great job! You've earned a discount!");
      } else {
        reward = "5% OFF";
        setCongratsMessage("Nice effort! You've earned a small discount!");
      }
      
      // Generate coupon code
      const couponChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let coupon = "QR";
      for (let i = 0; i < 6; i++) {
        coupon += couponChars.charAt(Math.floor(Math.random() * couponChars.length));
      }
      
      setMessage(`Use code: ${coupon} for ${reward} your next purchase!`);
      setShowReward(true);
    }
    
    return () => clearInterval(timerId);
  }, [gameActive, timeLeft, score]);
  
  // Pop a bubble
  const popBubble = (id) => {
    if (!gameActive) return;
    
    const bubbleIndex = bubbles.findIndex(b => b.id === id && !b.popped);
    if (bubbleIndex !== -1) {
      const newBubbles = [...bubbles];
      newBubbles[bubbleIndex].popped = true;
      setBubbles(newBubbles);
      
      // Add points
      setScore(prev => prev + newBubbles[bubbleIndex].points);
      
      // Create a new bubble after a delay
      setTimeout(() => {
        if (gameActive) {
          const newBubbles = [...bubbles];
          newBubbles[bubbleIndex] = {
            id: Date.now() + bubbleIndex,
            x: Math.random() * 90,
            y: Math.random() * 90,
            size: Math.floor(Math.random() * 3) + 2,
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            points: Math.floor(Math.random() * 5) + 1,
            popped: false
          };
          setBubbles(newBubbles);
        }
      }, 500);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <motion.h2 
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fashion Bubble Pop
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pop the bubbles, relax your mind, earn rewards!
        </motion.p>
      </div>
      
      {/* Game Status Bar */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-yellow-500" />
          <span className="font-medium">Score: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-blue-500" />
          <span className="font-medium">Time: {timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Award size={18} className="text-purple-500" />
          <span className="font-medium">Level: {level}</span>
        </div>
      </div>
      
      {/* Game Area */}
      {!gameActive && !gameComplete ? (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-center mb-8"
          >
            <Smile size={64} className="mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Ready for a quick break?</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Pop colorful bubbles to release stress and earn exclusive discounts for your QR fashion items!
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg"
            onClick={startGame}
          >
            Start Popping!
          </motion.button>
        </div>
      ) : gameComplete ? (
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-center mb-8"
          >
            <ThumbsUp size={64} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">{congratsMessage}</h3>
            <div className="bg-white dark:bg-gray-800 py-3 px-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 mb-4">
              <p className="text-gray-800 dark:text-gray-200 font-medium">{message}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Final Score: <span className="font-bold text-purple-600">{score}</span> points
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 px-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg"
              onClick={nextLevel}
            >
              Next Level
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 px-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
              onClick={resetGame}
            >
              Exit Game
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-96 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-inner overflow-hidden">
          {bubbles.map(bubble => !bubble.popped && (
            <motion.div
              key={bubble.id}
              className={`absolute rounded-full flex items-center justify-center ${bubble.color} shadow-lg cursor-pointer select-none`}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}rem`,
                height: `${bubble.size}rem`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => popBubble(bubble.id)}
            >
              <span className="text-white text-lg">{bubble.emoji}</span>
              <span className="absolute text-xs text-white font-bold opacity-80">+{bubble.points}</span>
            </motion.div>
          ))}
          
          {bubbles.map(bubble => bubble.popped && (
            <motion.div
              key={`pop-${bubble.id}`}
              className="absolute"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Bubble pop effect - little particles */}
              {Array(5).fill().map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: '6px',
                    height: '6px',
                  }}
                  initial={{ x: 0, y: 0 }}
                  animate={{ 
                    x: (Math.random() * 50 - 25), 
                    y: (Math.random() * 50 - 25),
                    opacity: 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Game Controls */}
      {gameActive && (
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 font-medium flex items-center gap-2"
            onClick={resetGame}
          >
            <RefreshCw size={16} />
            Reset Game
          </motion.button>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
        <Heart size={14} className="mr-1 text-pink-500" />
        <span>Take a moment to relax while shopping for your custom QR fashion!</span>
      </div>
    </div>
  );
}