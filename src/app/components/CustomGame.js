"use client";

import React, { useState, useEffect } from "react";
import { Wand2, Download, RefreshCw, ShoppingBag, Share2 } from "lucide-react";

export default function QRCustomizationGame() {
  const [qrColor, setQrColor] = useState("#6366f1");
  const [bgColor, setBgColor] = useState("#f3f4f6");
  const [pattern, setPattern] = useState("dots");
  const [item, setItem] = useState("tshirt");
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const patterns = ["dots", "rounded", "classy", "modern"];
  const items = ["tshirt", "hoodie", "tote", "cap"];
  
  const itemNames = {
    tshirt: "T-Shirt",
    hoodie: "Hoodie",
    tote: "Tote Bag",
    cap: "Cap"
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const randomizeQR = () => {
    const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"];
    const randomQrColor = colors[Math.floor(Math.random() * colors.length)];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    setQrColor(randomQrColor);
    setPattern(randomPattern);
    
    // Add points for customization
    setPoints(prev => prev + 5);
    triggerConfetti();
  };

  const selectItem = (newItem) => {
    setItem(newItem);
    setPoints(prev => prev + 2);
  };

  const saveDesign = () => {
    setPoints(prev => prev + 10);
    setModalMessage("Design saved! You earned 10 points!");
    setShowModal(true);
    triggerConfetti();
  };

  const shareDesign = () => {
    setPoints(prev => prev + 15);
    setModalMessage("Design shared! You earned 15 bonus points!");
    setShowModal(true);
    triggerConfetti();
  };

  const addToCart = () => {
    setPoints(prev => prev + 25);
    setModalMessage("Added to cart! You earned 25 points! Use your points for a discount at checkout.");
    setShowModal(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
  };

  // Create QR code pattern based on selected style
  const renderQRCode = () => {
    if (pattern === "dots") {
      return (
        <div className="grid grid-cols-7 gap-1">
          {Array(49).fill().map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full ${
                [0,1,2,4,5,6,14,42,12,16,18,20,21,22,24,25,26,28,30,32,34,36,38,40,48].includes(i) ? 
                'bg-white' : `bg-current`
              }`}
            />
          ))}
        </div>
      );
    } else if (pattern === "rounded") {
      return (
        <div className="grid grid-cols-7 gap-1">
          {Array(49).fill().map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-md ${
                [0,1,2,4,5,6,14,42,12,16,18,20,21,22,24,25,26,28,30,32,34,36,38,40,48].includes(i) ? 
                'bg-white' : `bg-current`
              }`}
            />
          ))}
        </div>
      );
    } else if (pattern === "classy") {
      return (
        <div className="grid grid-cols-7 gap-0.5">
          {Array(49).fill().map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 ${
                [0,1,2,4,5,6,14,42,12,16,18,20,21,22,24,25,26,28,30,32,34,36,38,40,48].includes(i) ? 
                'bg-white' : `bg-current`
              }`}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-7 gap-1">
          {Array(49).fill().map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 ${i % 3 === 0 ? 'rounded-full' : 'rounded-sm'} ${
                [0,1,2,4,5,6,14,42,12,16,18,20,21,22,24,25,26,28,30,32,34,36,38,40,48].includes(i) ? 
                'bg-white' : `bg-current`
              }`}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Design Your QR Fashion</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Customize your QR code and see it on different products</p>
        <div className="mt-2 flex items-center justify-center">
          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full font-semibold text-sm flex items-center">
            <span className="mr-1">✨</span> Points: {points}
          </span>
        </div>
      </div>

      {/* Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Customization Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">QR Code Customizer</h3>
          
          {/* QR Preview */}
          <div className="flex justify-center mb-6">
            <div 
              className="p-4 rounded-lg shadow-inner flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <div className="text-center" style={{ color: qrColor }}>
                {renderQRCode()}
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">QR Color</label>
              <div className="flex space-x-2">
                {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"].map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full transition-transform ${qrColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setQrColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
              <div className="flex space-x-2">
                {["#f3f4f6", "#ffffff", "#e0f2fe", "#fef3c7", "#f1f5f9"].map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full transition-transform ${bgColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBgColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pattern Style</label>
              <div className="grid grid-cols-2 gap-2">
                {patterns.map(p => (
                  <button
                    key={p}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      pattern === p ? 
                      'bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-200' : 
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setPattern(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium transition-transform hover:scale-105"
              onClick={randomizeQR}
            >
              <RefreshCw size={16} className="mr-2" />
              Randomize Design
            </button>
          </div>
        </div>
        
        {/* Product Preview Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Preview on Products</h3>
          
          {/* Product Selection */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {items.map(i => (
              <button
                key={i}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  item === i ? 
                  'bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-200' : 
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
                onClick={() => selectItem(i)}
              >
                {itemNames[i]}
              </button>
            ))}
          </div>
          
          {/* Product Preview */}
          <div className="flex justify-center mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Product Silhouette */}
              <div className={`absolute inset-0 ${
                item === 'tshirt' ? 'bg-gray-200 mask-tshirt' : 
                item === 'hoodie' ? 'bg-gray-200 mask-hoodie' : 
                item === 'tote' ? 'bg-gray-200 mask-tote' : 
                'bg-gray-200 mask-cap'
              }`}>
                <div className="h-full w-full flex items-center justify-center">
                  <div className="absolute" style={{ 
                    top: item === 'cap' ? '40%' : '30%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    width: item === 'cap' ? '30%' : '40%'
                  }}>
                    <div style={{ color: qrColor }}>
                      {renderQRCode()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
              onClick={saveDesign}
            >
              <Download size={20} />
              <span className="text-xs mt-1">Save</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
              onClick={shareDesign}
            >
              <Share2 size={20} />
              <span className="text-xs mt-1">Share</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              onClick={addToCart}
            >
              <ShoppingBag size={20} />
              <span className="text-xs mt-1">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array(30).fill().map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-70"
              style={{
                backgroundColor: ['#ff718d', '#fdff6a', '#5ff5d2', '#6e7eff', '#ffb468'][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall-${i} 3s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Great job!</h3>
            <p className="text-gray-600 dark:text-gray-300">{modalMessage}</p>
            <button 
              className="mt-4 w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md"
              onClick={() => setShowModal(false)}
            >
              Continue Designing
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .mask-tshirt {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,20 L35,10 H65 L80,20 L90,40 V90 H10 V40 Z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
        .mask-hoodie {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,5 C40,5 30,10 25,20 L10,30 L20,50 V95 H80 V50 L90,30 L75,20 C70,10 60,5 50,5 Z M50,5 C45,5 40,10 40,15 C40,20 45,25 50,25 C55,25 60,20 60,15 C60,10 55,5 50,5 Z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
        .mask-tote {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25,20 H75 L85,90 H15 Z M30,10 V20 M70,10 V20'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
        .mask-cap {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15,50 Q15,30 50,30 Q85,30 85,50 L95,50 L85,70 L15,70 L5,50 Z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
        
        @keyframes fall-0 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-1 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-2 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-3 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-4 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-5 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-6 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-7 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-8 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-9 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-10 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-11 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-12 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-13 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-14 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-15 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-16 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-17 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-18 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-19 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-20 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-21 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-22 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-23 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-24 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-25 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-26 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-27 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-28 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
        @keyframes fall-29 { 0% { transform: translateY(-10px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); } }
      `}</style>
    </div>
  );
}