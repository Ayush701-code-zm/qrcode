'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react'
import domtoimage from 'dom-to-image'
import download from 'downloadjs'




import axios from 'axios'
import { generateFileName } from '../../components/utils/helpers'
import {
  lettersPerRowMapCenter,

  lettersPerRowMapCenter_withQr,
  lettersPerRowMapLeft,
  lettersPerRowMapLeft_withQr,
} from './help'
import Loading from '../../components/commons/loading'
import bwipjs from 'bwip-js'

//font load glitch
// block space removal
// input with space and input without space adjustments

const TextToGraphics = ({ config, text, setText, textInput, setTextInput }) => {
  let defaultBoxSize = 60
  const [printifyStatus, setPrintifyStatus] = useState(false) // Default text
  const [spacingBuffer, setSpacingBuffer] = useState(5) // Default text
  const [mockupUrl, setMockupUrl] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const qrRef = useRef()
  const textRef = useRef()
  const [url, setUrl] = useState('')
  const [aztecBarcode, setAztecBarcode] = useState('')
  const [boxSize, setBoxSize] = useState(defaultBoxSize) // Default square size
  const [qrSize, setQrSize] = useState(defaultBoxSize) // Default square size
 

  const [fontUrl, setFontUrl] = useState('')
  const [loader, setLoader] = useState(false)
  const [loderMsg, setLoderMsg] = useState('')

  const downloadPng = async () => {
    let graphic = document.getElementById('graphic-parent')
    if (graphic) {
      const originalPadding = graphic.style.padding
      const originalMargin = graphic.style.margin
      const originalOverflow = graphic.style.overflow

      setSpacingBuffer(5)

      setTimeout(() => {
        // Calculate scale to achieve 2500px resolution
        const maxDimension = Math.max(graphic.clientWidth, graphic.clientHeight)
        const scale = 2500 / maxDimension

        const computedStyle = window.getComputedStyle(graphic)
        const padding = parseInt(computedStyle.padding, 10) || 0

        graphic.style.padding = '0px'
        graphic.style.margin = '0px'
        graphic.style.overflow = 'visible'

        domtoimage
          .toPng(graphic, {
            quality: 100,
            width: (graphic.clientWidth + padding * 2) * scale,
            height: (graphic.clientHeight + padding * 2) * scale,
            style: {
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              backgroundColor: 'transparent',
            },
          })
          .then((dataUrl) => {
            console.log('Generated PNG:', dataUrl)
            download(dataUrl, `${generateFileName(text)}.png`)

            graphic.style.padding = originalPadding
            graphic.style.margin = originalMargin
            graphic.style.overflow = originalOverflow
            setSpacingBuffer(5)
          })
          .catch((err) => {
            console.error('Oops, something went wrong!', err)
            console.error('Graphic element:', graphic)

            graphic.style.padding = originalPadding
            graphic.style.margin = originalMargin
            graphic.style.overflow = originalOverflow
            setSpacingBuffer(5)
          })
      }, 1000)
    }
  }

  const downloadSvg = async () => {
    let graphic = document.getElementById('graphic-parent')
    if (graphic) {
      const originalPadding = graphic.style.padding
      const originalMargin = graphic.style.margin
      const originalOverflow = graphic.style.overflow

      setSpacingBuffer(5)

      setTimeout(() => {
        // Calculate scale to achieve 1000px resolution
        const maxDimension = Math.max(graphic.clientWidth, graphic.clientHeight)
        const scale = 1000 / maxDimension

        const computedStyle = window.getComputedStyle(graphic)
        const padding = parseInt(computedStyle.padding, 10) || 0

        graphic.style.padding = '0px'
        graphic.style.margin = '0px'
        graphic.style.overflow = 'visible'

        domtoimage
          .toSvg(graphic, {
            width: (graphic.clientWidth + padding * 2) * scale,
            height: (graphic.clientHeight + padding * 2) * scale,
            style: {
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              backgroundColor: 'transparent',
            },
          })
          .then((dataUrl) => {
            console.log('Generated SVG:', dataUrl)
            download(dataUrl, `${generateFileName(text)}.svg`)

            graphic.style.padding = originalPadding
            graphic.style.margin = originalMargin
            graphic.style.overflow = originalOverflow
            setSpacingBuffer(5)
          })
          .catch((err) => {
            console.error('Oops, something went wrong!', err)
            console.error('Graphic element:', graphic)

            graphic.style.padding = originalPadding
            graphic.style.margin = originalMargin
            graphic.style.overflow = originalOverflow
            setSpacingBuffer(5)
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
        domtoimage
          .toPng(graphic, { quality: 0.3 })
          .then(async (dataUrl) => {
            setSpacingBuffer(5)
            // let data_ = dataUrl.replace("data:image/png;base64,", "");
            console.log(dataUrl)
            let body
            body = {
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

  useEffect(() => {
    // Function to get the last modified time or create a version
    const fetchFontVersion = async () => {
      try {
        // Use Axios to send a HEAD request to get the font metadata
        // const response = await axios.head(
        //   "https://peflgfeieqtklcpkhszz.supabase.co/storage/v1/object/public/fonts/user-font.ttf"
        // );

        // Get the 'Last-Modified' header from the response
        // const lastModified = response.headers["last-modified"];
        const version = Math.floor(Date.now() / 1000) // Convert to timestamp

        // Append the version as a query parameter to the font URL
        const fontUrlWithVersion = `https://peflgfeieqtklcpkhszz.supabase.co/storage/v1/object/public/fonts/user-font.ttf?v=${version}`
        setFontUrl(fontUrlWithVersion)
      } catch (error) {
        console.error('Error fetching font metadata:', error)
      }
    }

    fetchFontVersion()
  }, [])

  // Dynamically inject the font-face CSS when the font URL is ready
  useEffect(() => {
    if (fontUrl) {
      const styleSheet = document.createElement('style')
      styleSheet.textContent = `
        @font-face {
          font-family: 'CustomFont';
          src: url('${fontUrl}') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: fallback;
        }
      `
      document.head.appendChild(styleSheet)
      if (qrRef.current) {
        qrRef.current.style.fontFamily = 'CustomFont'
      }
    }
  }, [fontUrl])

  // Calculate the box size dynamically based on text length
  useEffect(() => {
    if (!textRef.current) return

    // const textLength = text.length;
    let textWidth = textRef.current.clientWidth
    let textHeigh = textRef.current.clientHeight
    // const newSize = Math.max(120, textLength * 30); // Adjust size scaling factor
    if (config?.format === 'center') {
      const newSize = textWidth + textHeigh + 18 + spacingBuffer // Adjust size scaling factor
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize)
        setQrSize(newSize - (textHeigh + spacingBuffer) * 2)
      }
    } else {
      const newSize = textWidth + textHeigh + spacingBuffer // Adjust size scaling factor
      if (newSize > defaultBoxSize) {
        setBoxSize(newSize)
        setQrSize(newSize - (textHeigh + spacingBuffer) * 2)
      }
    }
  }, [text, spacingBuffer, config?.format, defaultBoxSize])

  return (
    <>
      <div className="qr-container">
        <h1>8-Bit Pixel Graphic</h1>
        <div className="qr-input-container">
          <textarea
            rows="1"
            // maxLength={36}
            value={textInput}
            onChange={(e) => onChangeTextHandler(e.target.value, aztecBarcode)}
            placeholder="Enter text"
            className="qr-input"
          ></textarea>
          <span className="qr-textLength">{text.replace(/\n/g, '')?.length + ' / ' + 36}</span>
        </div>
        <div className="url-container">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="url-field"
          />
          <button
            onClick={() => {
              generateAztecBarcode()
              onChangeTextHandler(textInput, url)
            }}
            className="url-button"
          >
            Generate
          </button>
        </div>
        <br />
        {text.length > 0 && (
          <div className="formatingDiv">
            {/* format-center */}
            <div className={`flex-graphics  `} id="graphic-parent">
              {config.format === 'center' ? (
                <div
                  ref={qrRef}
                  className={`qr-box-centered`}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    height: `${boxSize}px`, // Dynamically set height based on text length
                    width: `${boxSize}px`, // Dynamically set width based on text length
                    lineHeight: '1ch',
                    // fontFamily: "CustomFont",
                  }}
                >
                  {/* Left text */}
                  <div className="qr-text-bottom-right-centered left" style={{}} id="triangle-left">
                    <p>
                      {/* {getFormattedText()} */}
                      {text}
                    </p>
                  </div>

                  <div className="qr-text-bottom-right-centered top" style={{}} id="triangle-top">
                    <p>
                      {/* {getFormattedText()} */}
                      {text}
                    </p>
                  </div>
                  <div
                    className="qr-text-bottom-right-centered right"
                    style={{}}
                    id="triangle-right"
                  >
                    <p ref={textRef}>
                      {/* {getFormattedText()} */}
                      {text}
                    </p>
                  </div>
                  <div
                    className="qr-text-bottom-right-centered bottom"
                    style={{}}
                    id="triangle-bottom"
                  >
                    <p>
                      {/* {getFormattedText()} */}
                      {text}
                    </p>
                  </div>

                  {/* Center text */}
                  <div
                    className="qr-text-center"
                    style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
                  >
                    {aztecBarcode && (
                      <img
                        src={aztecBarcode}
                        alt="Generated QR Code"
                        // width={300}
                        // height={300}
                        className="qr-image"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div
                  ref={qrRef}
                  className="qr-box"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    height: `${boxSize}px`, // Dynamically set height based on text length
                    width: `${boxSize}px`, // Dynamically set width based on text length
                    // fontFamily: "CustomFont",
                  }}
                >
                  {/* Top text */}
                  <div className="qr-text-top" style={{}}>
                    {text}
                  </div>

                  {/* Bottom text */}
                  <div className="qr-text-bottom" style={{}} ref={textRef}>
                    {text}
                  </div>

                  {/* Left text (rotated) */}
                  <div
                    className="qr-text-left"
                    style={{
                      // fontSize: `${boxSize / fontFactor}px`, // Dynamically adjust font size
                      bottom: textRef?.current?.clientHeight + (spacingBuffer - 10),
                    }}
                  >
                    {text}
                  </div>

                  {/* Right text (rotated) */}
                  <div className="qr-text-right" style={{}}>
                    {text}
                  </div>

                  {/* Center text */}
                  <div
                    className="qr-text-center"
                    style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
                  >
                    {aztecBarcode && (
                      <img
                        src={aztecBarcode}
                        alt="Generated QR Code"
                        // width={300}
                        // height={300}
                        className="qr-image"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            <br />
            <div className="qr-download-buttons">
              <button onClick={downloadPng} className="qr-download-button">
                Download as PNG
              </button>
              <button onClick={downloadSvg}>Download as SVG</button>
              <button onClick={sendToPrintify}>Printful</button>
              <button
                onClick={() => {
                  navigate('/config')
                }}
              >
                Config
              </button>
              {printifyStatus && (
                <div className="status-message">{'Graphics uploaded to Printful Successfully'}</div>
              )}
            </div>
          </div>
        )}
        <div className="horizontolLine"></div>
        <div>Print</div>
        {loader ? (
          <>
            <div style={{ color: 'red', fontWeight: 'normal', fontSize: '15px' }}>{loderMsg}</div>
            <Loading />
          </>
        ) : (
          <></>
        )}
        {mockupUrl?.length ? (
          <div className="images-grid">
            {mockupUrl?.map((url, i) => {
              return url.mockupUrl ? (
                <img
                  key={i}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '5px',
                  }}
                  src={url.mockupUrl}
                  alt="Generated QR Code"
                />
              ) : (
                <div className="error-container">
                 
                  <span className="error-text">Unable to load image...</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ color: 'red', fontWeight: 'normal', fontSize: '15px' }}>{errorMsg}</div>
        )}
      </div>

    </>
  )
}

export default TextToGraphics