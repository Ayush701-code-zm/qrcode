'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import domtoimage from 'dom-to-image';
import download from 'downloadjs';
import axios from 'axios';
import { generateFileName } from '../../components/utils/helpers';
import {
  lettersPerRowMapCenter,
  lettersPerRowMapCenter_withQr,
  lettersPerRowMapLeft,
  lettersPerRowMapLeft_withQr,
} from './help';
import Loading from '../../components/commons/loading';
import bwipjs from 'bwip-js';
import { Download, Image as ImageIcon, Cog, Printer, Wand2, Layout, Code, ShoppingCart, Check,  Info } from 'lucide-react';


const TextToGraphics = ({ config, text, setText, textInput, setTextInput, navigate }) => {
  let defaultBoxSize = 60;
  const [printifyStatus, setPrintifyStatus] = useState(false);
  const [spacingBuffer, setSpacingBuffer] = useState(5);
  const [mockupUrl, setMockupUrl] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const qrRef = useRef();
  const textRef = useRef();
  const [url, setUrl] = useState('');
  const [aztecBarcode, setAztecBarcode] = useState('');
  const [boxSize, setBoxSize] = useState(defaultBoxSize);
  const [qrSize, setQrSize] = useState(defaultBoxSize);
  const [fontUrl, setFontUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [loderMsg, setLoderMsg] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductSelector, setShowProductSelector] = useState(false);
  
  // Product options
  const productOptions = [
    { id: 1, name: "T-Shirt", price: 24.99, image: "/api/placeholder/100/100" },
    { id: 2, name: "Mug", price: 14.99, image: "/api/placeholder/100/100" },
    { id: 3, name: "Sticker Pack", price: 9.99, image: "/api/placeholder/100/100" },
    { id: 4, name: "Tote Bag", price: 19.99, image: "/api/placeholder/100/100" },
    { id: 5, name: "Hoodie", price: 39.99, image: "/api/placeholder/100/100" },
    { id: 6, name: "Phone Case", price: 19.99, image: "/api/placeholder/100/100" }
  ];

  // Download function for PNG
  const downloadPng = async () => {
    let graphic = document.getElementById('graphic-parent')
    if (graphic) {
      setSpacingBuffer(5)

      setTimeout(() => {
        domtoimage.toPng(graphic, { quality: 0.3 })
          .then((dataUrl) => {
            download(dataUrl, `${generateFileName(text)}.png`)
            setSpacingBuffer(5)
          })
          .catch((err) => {
            console.error('Oops, something went wrong!', err)
          })
      }, 1000)
    }
  }

  // Function to handle SVG download
  const downloadSvg = () => {
    let graphic = document.getElementById('graphic-parent')
    if (graphic) {
      setSpacingBuffer(5)

      setTimeout(() => {
        domtoimage.toSvg(graphic)
          .then((dataUrl) => {
            download(dataUrl, `${generateFileName(text)}.svg`)
            setSpacingBuffer(5)
          })
          .catch((err) => {
            console.error('Oops, something went wrong!', err)
          })
      }, 1000)
    }
  }

  const timer = (ms) => new Promise((res) => setTimeout(res, ms))

  const sendToPrintify = async () => {
    setMockupUrl([])
    setLoderMsg('Generating Mockup...')
    setLoader(true)
    setErrorMsg('')
    let graphic = document.getElementById('graphic-parent')
    if (graphic) {
      setSpacingBuffer(2)

      setTimeout(() => {
        domtoimage.toPng(graphic, { quality: 0.3 })
          .then(async (dataUrl) => {
            setSpacingBuffer(5)
            // let data_ = dataUrl.replace("data:image/png;base64,", "");
            console.log(dataUrl)
            let body = {
              file_name: `${generateFileName(text)}.png`,
              contents: dataUrl,
            }

            try {
              const response = await axios.post(
                //"http://localhost:3001/uploadImage",
                'https://font-file-server.vercel.app/uploadImage',
                body,
              )
              if (response.status === 200) {
                setPrintifyStatus(true)
                setLoderMsg('Successfully Created mockups, Now Getting Images...')
                const payload = encodeURIComponent(JSON.stringify(response.data.successfulMockups))
                console.log(payload)
                await timer(5000)
                const successfulUrls = await axios.get(
                  `https://font-file-server.vercel.app/getMockup?payload=${payload}`,
                )
                setLoader(false)
                if (successfulUrls.status === 200) setMockupUrl(successfulUrls.data)
                else setErrorMsg(successfulUrls.message)

                console.log(successfulUrls)
              }
              console.log(mockupUrl)
              if (response.status !== 200) {
                setLoader(false)
                setErrorMsg(response.data.error)
              }

              return response.data
            } catch (error) {
              console.error('Error uploading image:', error)
              setLoader(false)
              setErrorMsg(error.message)
              setPrintifyStatus(false)
            }
          })
          .catch((err) => {
            console.error('Oops, something went wrong!', err)
          })
      }, 1000)
    }
  }

  const onChangeTextHandler = useCallback(
    (value, aztecBarcode) => {
      let inputWithoutSpace = value.replace(/\s/g, '')
      let maxLength = config.format === 'center' ? 45 : 41
      if (inputWithoutSpace.length > maxLength) return
      if (inputWithoutSpace.replace('\n', '').length > 36) return
      setTextInput(value)

      let lettersWithoutLineBreak = inputWithoutSpace.replace('\n', '')

      let lettersPerRowMap = !aztecBarcode
        ? config.format === 'center'
          ? lettersPerRowMapCenter
          : lettersPerRowMapLeft
        : config.format === 'center'
          ? lettersPerRowMapCenter_withQr
          : lettersPerRowMapLeft_withQr

      let spacingArr = lettersPerRowMap[lettersWithoutLineBreak?.length]
      let lettersWithNewLineBreak = ''
      lettersWithoutLineBreak?.split('').forEach((element, index) => {
        lettersWithNewLineBreak = `${lettersWithNewLineBreak}${element}${
          spacingArr?.includes(index + 1) ? '\n' : ''
        }`
      })
      console.log('final:', lettersWithNewLineBreak)
      console.log(boxSize , "Box size")
      setText(lettersWithNewLineBreak)
    },
    [config?.format, setText, setTextInput],
  )

  const generateAztecBarcode = useCallback(async () => {
    try {
      if (!url) {
        setAztecBarcode('')
        return
      }

      const canvas = document.createElement('canvas')

      bwipjs.toCanvas(canvas, {
        bcid: 'azteccode',
        text: url,
        scale: 3,
        width: 300,
        height: 300,
        includetext: false,
      })
      const dataUrl = canvas.toDataURL('image/png')
      setAztecBarcode(dataUrl)
    } catch (err) {
      console.error('Error generating Aztec barcode:', err)
    }
  }, [url])

  // Fetch font
  useEffect(() => {
    const fetchFontVersion = async () => {
      try {
        const version = Math.floor(Date.now() / 1000);
        const fontUrlWithVersion = `https://peflgfeieqtklcpkhszz.supabase.co/storage/v1/object/public/fonts/user-font.ttf?v=${version}`;

        setFontUrl(fontUrlWithVersion);
      } catch (error) {
        console.log('Error fetching font metadata:', error);
      }
    };

    fetchFontVersion();
  }, []);

  // Apply font
  useEffect(() => {
    if (!fontUrl) {
      // If no external font URL is available, use the local megafont from public folder
    
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @font-face {
          font-family: 'Megafont';
          src: url('${fontUrl}') format('truetype');
          font-weight: bold;
          font-style: normal;
          font-display: fallback;
        }
      `;
      document.head.appendChild(styleSheet);
      if (qrRef.current) {
        qrRef.current.style.fontFamily = 'Megafont';
      }
    } else {
      // Original code for when fontUrl is present
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @font-face {
          font-family: 'Megafont';
          src: url('${fontUrl}') format('truetype');
          font-weight: bold;
          font-style: normal;
          font-display: fallback;
        }
      `;
      document.head.appendChild(styleSheet);
      if (qrRef.current) {
        qrRef.current.style.fontFamily = 'Megafont';
      }
    }
  }, [fontUrl]);



  useEffect(() => {
    if (!textRef.current) return

    // const textLength = text.length;
    let textWidth = textRef.current.clientWidth
    let textHeigh = textRef.current.clientHeight
    console.log(textWidth  ,   textHeigh  , "text releted thing")
    if (config?.format === 'center') {
      const newSize = textWidth + textHeigh + 18 + spacingBuffer 
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize)
        setQrSize(newSize - (textHeigh + spacingBuffer) * 2)
        console.log(newSize , "new size")
      }
    } else {
      const newSize = textWidth + textHeigh + spacingBuffer 
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize)
        setQrSize(newSize - (textHeigh + spacingBuffer) * 2)
        console.log(newSize , "new size 1 ")
      }
    }
  }, [text, spacingBuffer, config?.format, defaultBoxSize])

  // Add product to cart
  const addToCart = (productId) => {
    const product = productOptions.find(p => p.id === productId);
    if (product) {
      setCart([...cart, { ...product, designText: text, designUrl: url }]);
    }
  };

  // Handle order submission
  const placeOrder = async () => {
    setLoderMsg('Processing your order...');
    setLoader(true);
    
    // Simulate order processing
    await timer(2000);
    
    setLoader(false);
    setOrderPlaced(true);
    setActiveTab('confirmation');
  };

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Add selected products to cart
  const addSelectedToCart = () => {
    selectedProducts.forEach(productId => {
      addToCart(productId);
    });
    setShowProductSelector(false);
    setSelectedProducts([]);

    // Show a brief success message
    setLoderMsg('Products added to cart');
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  

  const customStyles = {
    qrBox: {
      position: 'relative',
      color: 'black',
      backgroundColor: 'white',
      textAlign: 'left',
      transform: 'rotate(45deg)',
      fontFamily: 'Megafont',
      lineHeight: '0.76',
      fontWeight: 'bold',
    },
    qrBoxCentered: {
      position: 'relative',
      backgroundColor: 'white',
      transform: 'rotate(45deg)',
      fontFamily: 'Megafont',
      lineHeight: '0.76',
    },
    textTop: {
      position: 'absolute',
      top: '0px',
      right: '4px',
      rotate: '180deg',
      whiteSpace: 'break-spaces',
      wordWrap: 'break-word',
    },
    textBottom: {
      position: 'absolute',
      bottom: '0px',
      left: '3px',
      whiteSpace: 'break-spaces',
      wordWrap: 'break-word',
    },
    textLeft: {
      position: 'absolute',
      top: '3px',
      left: '0px',
      writingMode: 'vertical-rl',
      wordWrap: 'break-word',
      whiteSpace: 'break-spaces',
    },
    textRight: {
      position: 'absolute',
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
      textAlign: 'left',
      bottom: '3px',
      right: '1px',
      whiteSpace: 'break-spaces',
      wordWrap: 'break-word',
    },
    textCentered: {
      position: 'absolute',
      inset: '0',
      display: 'flex',
      justifyContent: 'center',
      color: 'black',
      wordWrap: 'break-word',
      whiteSpace: 'break-spaces',
    },
    textCenteredP: {
      margin: '0',
      marginTop: 'auto',
    },
    flexGraphics: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '100px',
      opacity: '1',
      padding: '55px',
    },
    qrImage: {
      width: '100%',
      height: '100%',
    },
    qrTextCenter: {
      position: 'absolute',
      margin: 'auto',
      inset: '0',
      color: 'black',
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            8-Bit Pixel Graphics Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create custom pixel designs with optional QR codes for your projects
          </p>
        </div>

        {/* Cart Indicator */}
        <div className="fixed top-4 right-4 z-10">
          <button 
            onClick={() => setActiveTab('cart')}
            className="flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200"
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="ml-2 bg-white text-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('editor')}
            >
              <Layout className="inline-block w-4 h-4 mr-2" />
              Editor
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'results'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('results')}
            >
              <Code className="inline-block w-4 h-4 mr-2" />
              Print Results
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'cart'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingCart className="inline-block w-4 h-4 mr-2" />
              Cart {cart.length > 0 && `(${cart.length})`}
            </button>
          </div>
        </div>

        {/* Main Content - Editor View */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Design Controls</h2>
              
              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Your Text
                </label>
                <div className="relative ">
                  <textarea
                    rows="3"
                    value={textInput}
                    onChange={(e) => onChangeTextHandler(e.target.value, aztecBarcode)}
                    placeholder="Enter your text here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute right-3 bottom-3 text-sm text-gray-500 dark:text-gray-400">
                    {text.replace(/\n/g, '')?.length} / 36
                  </div>
                </div>
              </div>

              {/* URL Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  QR Code URL (Optional)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <button
                    onClick={() => {
                      generateAztecBarcode();
                      onChangeTextHandler(textInput, true);
                    }}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Wand2 size={16} className="mr-2" />
                    Generate
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={downloadPng}
                  disabled={!text.length}
                  className={`flex items-center justify-center py-2 px-4 ${
                    text.length
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  } text-white font-medium rounded-lg transition-colors duration-200`}
                >
                  <Download size={16} className="mr-2" />
                  PNG
                </button>
                <button
                  onClick={downloadSvg}
                  disabled={!text.length}
                  className={`flex items-center justify-center py-2 px-4 ${
                    text.length
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  } text-white font-medium rounded-lg transition-colors duration-200`}
                >
                  <ImageIcon size={16} className="mr-2" />
                  SVG
                </button>
                <button
                  onClick={sendToPrintify}
                  disabled={!text.length}
                  className={`flex items-center justify-center py-2 px-4 ${
                    text.length
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  } text-white font-medium rounded-lg transition-colors duration-200`}
                >
                  <Printer size={16} className="mr-2" />
                  Print
                </button>
                <button
                  onClick={() => navigate('/config')}
                  className="flex items-center justify-center py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Cog size={16} className="mr-2" />
                  Config
                </button>
              </div>
              
              {/* Order Button */}
              <div className="mt-6">
                <button
                  onClick={() => setShowProductSelector(true)}
                  disabled={!text.length}
                  className={`w-full flex items-center justify-center py-3 px-4 ${
                    text.length
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  } text-white font-medium rounded-lg transition-colors duration-200`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Order Products with This Design
                </button>
              </div>

              {printifyStatus && (
                <div className="mt-4 py-2 px-4 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-lg text-sm">
                  Graphics uploaded to Printful successfully!
                </div>
              )}
            </div>

            {/* Right Column - Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">Preview</h2>
              
              {text.length > 0 ? (
                <div style={customStyles.flexGraphics} id="graphic-parent">
                  {config.format === 'center' ? (
                    <div
                    className="font-custom"
                      ref={qrRef}
                      style={{
                        ...customStyles.qrBoxCentered,
                        height: `${boxSize}px`,
                        width: `${boxSize}px`,
                       
                      }}
                    >
                      
                      <div style={{...customStyles.textCentered, transform: 'rotate(90deg)'}} className="left">
                        <p style={customStyles.textCenteredP}>{text}</p>
                      </div>
                      <div style={{...customStyles.textCentered, transform: 'rotate(180deg)'}} className="top">
                        <p style={customStyles.textCenteredP}>{text}</p>
                      </div>
                      <div style={{...customStyles.textCentered, transform: 'rotate(270deg)'}} className="right font-custom">
                        <p style={customStyles.textCenteredP} ref={textRef}>{text}</p>
                      </div>
                      <div style={customStyles.textCentered} className="bottom">
                        <p style={customStyles.textCenteredP}>{text}</p>
                      </div>
                      <div
                        style={{
                          ...customStyles.qrTextCenter,
                          width: `${qrSize}px`,
                          height: `${qrSize}px`
                        }}
                      >
                        {aztecBarcode && (
                          <img
                            src={aztecBarcode}
                            alt="Generated QR Code"
                            style={customStyles.qrImage}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                  
                    <div
                      ref={qrRef}
                      style={{
                        ...customStyles.qrBox,
                        height: `${boxSize}px`,
                        width: `${boxSize}px`,
                      }}
                    >
                      {console.log(`Height and Width set to ${boxSize}px`)}
                      <div style={customStyles.textTop}>{text}</div>
                      <div style={customStyles.textBottom} ref={textRef}>{text}</div>
                      <div
                        style={{
                          ...customStyles.textLeft,
                          bottom: (textRef?.current?.clientHeight || 0) + (spacingBuffer - 10)
                        }}
                      >
                        {text}
                      </div>
                      <div style={customStyles.textRight}>{text}</div>
                      <div
                        style={{
                          ...customStyles.qrTextCenter,
                          width: `${qrSize}px`,
                          height: `${qrSize}px`
                        }}
                      >
                        {aztecBarcode && (
                          <img
                            src={aztecBarcode}
                            alt="Generated QR Code"
                            style={customStyles.qrImage}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Enter text to see preview
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Print Results View */}
        {activeTab === 'results' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">Print Results</h2>
            
            {loader ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-blue-600 dark:text-blue-400 mb-4">{loderMsg}</p>
                <Loading />
              </div>
            ) : mockupUrl?.length ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockupUrl?.map((url, i) => {
                    return url.mockupUrl ? (
                      <div key={i} className="overflow-hidden rounded-lg shadow-md">
                        <img
                          className="w-full h-auto object-cover"
                          src={url.mockupUrl}
                          alt="Generated Product Mockup"
                        />
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                          <button 
                            onClick={() => {
                              addToCart(i % productOptions.length + 1);
                              setActiveTab('cart');
                            }}
                            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors duration-200"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900 rounded-lg">
                        <span className="text-red-600 dark:text-red-300">Unable to load image</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : errorMsg ? (
              <div className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900 rounded-lg">
                <span className="text-red-600 dark:text-red-300">{errorMsg}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
                  <Printer size={32} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-2">No Print Results Yet</h3>
                <p className="text-gray-500 dark:text-gray-500 max-w-md">
                  Create a design in the editor tab and click "Print" to generate product mockups
                </p>
                <button 
                  onClick={() => setActiveTab('editor')}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Go to Editor
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart View */}
        {/* Cart View */}
        {activeTab === 'cart' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
                  <ShoppingCart size={32} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-2">Your Cart is Empty</h3>
                <p className="text-gray-500 dark:text-gray-500 max-w-md">
                  Add products with your designs to start your order
                </p>
                <button 
                  onClick={() => setActiveTab('editor')}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Back to Designer
                </button>
              </div>
            ) : (
              <div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item, index) => (
                    <div key={index} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Design: {item.designText.substring(0, 20)}{item.designText.length > 20 ? '...' : ''}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.designUrl && `URL: ${item.designUrl.substring(0, 20)}...`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800 dark:text-gray-200 mr-4">
                          ${item.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={() => setCart(cart.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600 dark:text-gray-400">Estimated Shipping</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">$4.99</span>
                  </div>
                  <div className="flex justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Total</span>
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      ${(cart.reduce((total, item) => total + item.price, 0) + 4.99).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={placeOrder}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Confirmation View */}
        {activeTab === 'confirmation' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500 dark:text-green-400">
                <Check size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button 
              onClick={() => {
                setActiveTab('editor');
                setCart([]);
                setOrderPlaced(false);
              }}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Create New Design
            </button>
          </div>
        )}

        {/* Product Selector Modal */}
        {showProductSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Select Products for Your Design
                </h3>
                <button 
                  onClick={() => setShowProductSelector(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {productOptions.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => toggleProductSelection(product.id)}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                        selectedProducts.includes(product.id) 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-md mb-2 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {selectedProducts.includes(product.id) && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{product.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button 
                    onClick={() => setShowProductSelector(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={addSelectedToCart}
                    disabled={selectedProducts.length === 0}
                    className={`px-4 py-2 ${
                      selectedProducts.length > 0
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    } text-white rounded-lg transition-colors duration-200`}
                  >
                    Add to Cart ({selectedProducts.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center">
              <Loading />
              <p className="mt-4 text-gray-600 dark:text-gray-400">{loderMsg}</p>
            </div>
          </div>
        )}
        
        {/* Help Info */}
        <div className="mt-8 text-center">
          <button 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
            onClick={() => window.open('/help', '_blank')}
          >
            <Info size={16} className="mr-1" />
            Need help? View tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToGraphics;