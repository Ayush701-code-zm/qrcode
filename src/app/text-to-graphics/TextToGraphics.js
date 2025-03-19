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
import { Download, Image as ImageIcon, Cog, Printer, Wand2, Layout, Code, Type, Palette } from 'lucide-react';

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
  
  // New state for font customization
  const [fontColor, setFontColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState('bold');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  
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
                setLoderMsg('Succesfuly Created mockups Now Getting Images...')
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
      // console.log('final:', lettersWithNewLineBreak)
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
        console.error('Error fetching font metadata:', error);
      }
    };

    fetchFontVersion();
  }, []);

  // Apply font
  useEffect(() => {
    if (fontUrl) {
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

  // Calculate box size
  useEffect(() => {
    if (!textRef.current) return;

    let textWidth = textRef.current.clientWidth;
    let textHeight = textRef.current.clientHeight;
    
    if (config?.format === 'center') {
      const newSize = textWidth + textHeight + 18 + spacingBuffer;
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize);
        setQrSize(newSize - (textHeight + spacingBuffer) * 2);
      }
    } else {
      const newSize = textWidth + textHeight + spacingBuffer;
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize);
        setQrSize(newSize - (textHeight + spacingBuffer) * 2);
      }
    }
  }, [text, spacingBuffer, config?.format, defaultBoxSize, fontSize]);

  // Custom styles from CSS file with added dynamic style properties
  const customStyles = {
    qrBox: {
      position: 'relative',
      color: fontColor,
      backgroundColor: backgroundColor,
      textAlign: 'left',
      transform: 'rotate(45deg)',
      fontFamily: 'Megafont',
      lineHeight: '0.76',
      fontWeight: fontWeight,
      fontSize: `${fontSize}px`,
    },
    qrBoxCentered: {
      position: 'relative',
      backgroundColor: backgroundColor,
      color: fontColor,
      transform: 'rotate(45deg)',
      fontFamily: 'Megafont',
      lineHeight: '0.76',
      fontWeight: fontWeight,
      fontSize: `${fontSize}px`,
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
      color: fontColor,
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
      color: fontColor,
    },
  };

  // Font weight options
  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
    { value: '900', label: 'Black' },
  ];

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
                <div className="relative">
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

              {/* Font Customization Section */}
              <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Type size={16} className="mr-2" />
                  Font Customization
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Font Size
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 w-8 text-center">{fontSize}</span>
                    </div>
                  </div>
                  
                  {/* Font Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Font Weight
                    </label>
                    <select
                      value={fontWeight}
                      onChange={(e) => setFontWeight(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                    >
                      {fontWeightOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Font Color */}
                  <div>
                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Palette size={16} className="mr-1" /> Font Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="h-9 w-9 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="flex-1 ml-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  {/* Background Color */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Palette size={16} className="mr-1" /> Background
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="h-9 w-9 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 ml-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                      />
                    </div>
                  </div>
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
                      <div style={{...customStyles.textCentered, transform: 'rotate(270deg)'}} className="right">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockupUrl?.map((url, i) => {
                  return url.mockupUrl ? (
                    <div key={i} className="overflow-hidden rounded-lg shadow-md">
                      <img
                        className="w-full h-auto object-cover"
                        src={url.mockupUrl}
                        alt="Generated Product Mockup"
                      />
                    </div>
                  ) : (
                    <div key={i} className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900 rounded-lg">
                      <span className="text-red-600 dark:text-red-300">Unable to load image</span>
                    </div>
                  );
                })}
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
                className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Go to Editor
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} 8-Bit Pixel Graphics Generator. All rights reserved.</p>
      </div>
    </div>
  </div>
);
};

export default TextToGraphics;