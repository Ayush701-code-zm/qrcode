"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import domtoimage from "dom-to-image";
import download from "downloadjs";
import axios from "axios";
import { generateFileName } from "../../components/utils/helpers";
import {
  lettersPerRowMapCenter,
  lettersPerRowMapCenter_withQr,
  lettersPerRowMapLeft,
  lettersPerRowMapLeft_withQr,
} from "./help";
import Loading from "../../components/commons/loading";
import bwipjs from "bwip-js";
import {
  Download,
  Image as ImageIcon,
  Cog,
  Printer,
  Wand2,
  Layout,
  Code,
  ShoppingCart,
  Check,
  Info,
} from "lucide-react";
import Cart from "./components/Cart";
import PrintResults from "./components/PrintResults";
import ProductSelectorModal from "./components/ProductSelectorModal";
import EditorView from "./components/EditorView";

const TextToGraphics = ({
  config,
  text,
  setText,
  textInput,
  setTextInput,
  navigate,
}) => {
  let defaultBoxSize = 60;
  const [printifyStatus, setPrintifyStatus] = useState(false);
  const [spacingBuffer, setSpacingBuffer] = useState(5);
  const [mockupUrl, setMockupUrl] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const qrRef = useRef();
  const textRef = useRef();
  const [url, setUrl] = useState("");
  const [aztecBarcode, setAztecBarcode] = useState("");
  const [boxSize, setBoxSize] = useState(defaultBoxSize);
  const [qrSize, setQrSize] = useState(defaultBoxSize);
  const [fontUrl, setFontUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [loderMsg, setLoderMsg] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [fontLoading, setFontLoading] = useState(true);
  const [productOptions, setProductOptions] = useState([]);
  const [productLoading, setProductLoading] = useState(true);


  const downloadPng = async () => {
    let graphic = document.getElementById("graphic-parent");
    if (graphic) {
      setSpacingBuffer(5);

      setTimeout(() => {
        domtoimage
          .toPng(graphic, { quality: 0.3 })
          .then((dataUrl) => {
            download(dataUrl, `${generateFileName(text)}.png`);
            setSpacingBuffer(5);
          })
          .catch((err) => {
            console.error("Oops, something went wrong!", err);
          });
      }, 1000);
    }
  };


  const downloadSvg = () => {
    let graphic = document.getElementById("graphic-parent");
    if (graphic) {
      setSpacingBuffer(5);

      setTimeout(() => {
        domtoimage
          .toSvg(graphic)
          .then((dataUrl) => {
            download(dataUrl, `${generateFileName(text)}.svg`);
            setSpacingBuffer(5);
          })
          .catch((err) => {
            console.error("Oops, something went wrong!", err);
          });
      }, 1000);
    }
  };

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const sendToPrintify = async () => {
    setMockupUrl([]);
    setLoderMsg("Generating Mockup...");
    setLoader(true);
    setErrorMsg("");
    let graphic = document.getElementById("graphic-parent");
    if (graphic) {
      setSpacingBuffer(2);

      setTimeout(() => {
        domtoimage
          .toPng(graphic, { quality: 0.3 })
          .then(async (dataUrl) => {
            setSpacingBuffer(5);
            // let data_ = dataUrl.replace("data:image/png;base64,", "");
           
            let body = {
              file_name: `${generateFileName(text)}.png`,
              contents: dataUrl,
            };

            try {
              const response = await axios.post(
                "http://localhost:3001/uploadImage/mockups",
              
                body
              );
              if (response.status === 200) {
                setPrintifyStatus(true);
                setLoderMsg(
                  "Successfully Created mockups, Now Getting Images..."
                );
                // const payload = encodeURIComponent(
                //   JSON.stringify(response.data.successful_mockups)
                // );

                const payload = JSON.stringify(response.data.results.successful_mockups)
             


                console.log(payload);
                await timer(5000);

                const successfulUrls = await axios.get(
                  `http://localhost:3001/uploadImage/mockup-results?payload=${payload}`
                );
                setLoader(false);
                if (successfulUrls.status === 200)
                {
                  setActiveTab("results");
                  setMockupUrl(successfulUrls.data);
                }
                 
                else setErrorMsg(successfulUrls.message);

                
              }
            
              if (response.status !== 200) {
                setLoader(false);
                setErrorMsg(response.data.error);
              }

              return response.data;
            } catch (error) {
              console.error("Error uploading image:", error);
              setLoader(false);
              setErrorMsg(error.message);
              setPrintifyStatus(false);
            }
          })
          .catch((err) => {
            console.error("Oops, something went wrong!", err);
          });
      }, 1000);
    }
  };

  const onChangeTextHandler = useCallback(
    (value, aztecBarcode) => {
      let inputWithoutSpace = value.replace(/\s/g, "");
      let maxLength = config.format === "center" ? 45 : 41;
      if (inputWithoutSpace.length > maxLength) return;
      if (inputWithoutSpace.replace("\n", "").length > 36) return;
      setTextInput(value);

      let lettersWithoutLineBreak = inputWithoutSpace.replace("\n", "");

      let lettersPerRowMap = !aztecBarcode
        ? config.format === "center"
          ? lettersPerRowMapCenter
          : lettersPerRowMapLeft
        : config.format === "center"
        ? lettersPerRowMapCenter_withQr
        : lettersPerRowMapLeft_withQr;

      let spacingArr = lettersPerRowMap[lettersWithoutLineBreak?.length];
      let lettersWithNewLineBreak = "";
      lettersWithoutLineBreak?.split("").forEach((element, index) => {
        lettersWithNewLineBreak = `${lettersWithNewLineBreak}${element}${
          spacingArr?.includes(index + 1) ? "\n" : ""
        }`;
      });

      setText(lettersWithNewLineBreak);
    },
    [config?.format, setText, setTextInput]
  );

  const generateAztecBarcode = useCallback(async () => {
    try {
      if (!url) {
        setAztecBarcode("");
        return;
      }

      const canvas = document.createElement("canvas");

      bwipjs.toCanvas(canvas, {
        bcid: "azteccode",
        text: url,
        scale: 3,
        width: 300,
        height: 300,
        includetext: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setAztecBarcode(dataUrl);
    } catch (err) {
      console.error("Error generating Aztec barcode:", err);
    }
  }, [url]);



  useEffect(() => {
    if (!textRef.current) return;
    
    let textWidth = textRef.current.clientWidth;
    let textHeight = textRef.current.clientHeight;
    
    let newSize;
    
    // Special case for exactly 3 characters
    if (text.length === 3) {
      newSize = 58;
      setBoxSize(newSize);
      setQrSize(newSize - (textHeight + spacingBuffer) * 2);
      return;
    }
    
    if (config?.format === "center") {
      // Calculate size for centered format
      const lineCount = (text.match(/\n/g) || []).length + 1;
      
      if (text.length <= 1) {
        newSize = defaultBoxSize;
      } else if (lineCount === 1) {
        // Single line of text
        newSize = Math.max(defaultBoxSize, textWidth + 20 + spacingBuffer);
      } else {
        newSize = Math.max(
          defaultBoxSize,
          textWidth + textHeight + 18 + spacingBuffer
        );
      }
      
      // Set both box and QR size
      setBoxSize(newSize);
      setQrSize(newSize - (textHeight + spacingBuffer) * 2);
    } else {
      const lineCount = (text.match(/\n/g) || []).length + 1;
      
      if (text.length <= 1) {
        newSize = defaultBoxSize;
      } else if (lineCount === 1) {
        newSize = Math.max(defaultBoxSize, textWidth + 15 + spacingBuffer);
      } else {
        newSize = Math.max(
          defaultBoxSize,
          textWidth + textHeight + spacingBuffer
        );
      }
      
      // Set both box and QR size
      setBoxSize(newSize);
      setQrSize(newSize - (textHeight + spacingBuffer) * 2);
    }
  }, [text, spacingBuffer, config?.format, defaultBoxSize]);

// Updated addToCart function
const addToCart = (cartItem) => {
  // Simply add the received cart item to the cart
  setCart([...cart, cartItem]);
};

  // Handle order submission
  const placeOrder = async () => {
    setLoderMsg("Processing your order...");
    setLoader(true);

    // Simulate order processing
    await timer(2000);

    setLoader(false);
    setOrderPlaced(true);
    setActiveTab("confirmation");
  };

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Add selected products to cart
  const addSelectedToCart = () => {
    selectedProducts.forEach((productId) => {
      addToCart(productId);
    });
    setShowProductSelector(false);
    setSelectedProducts([]);

    // Show a brief success message
    setLoderMsg("Products added to cart");
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

const customStyles = {
  qrBox: {
    position: "relative",
    color: "black",
    backgroundColor: "white",
    textAlign: "left",
    transform: "rotate(45deg)",
    lineHeight: "0.76",
    fontWeight: "700",
  },
  qrBoxCentered: {
    width: "330px",
    height: "330px",
    position: "relative",
    backgroundColor: "white",
    transform: "rotate(45deg)",
    lineHeight: "0.76",
  },
  textTop: {
    position: "absolute",
    top: "0px",
    right: "4px",
    rotate: "180deg",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
  },
  textBottom: {
    position: "absolute",
    bottom: "0px",
    left: "3px",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
  },
  textLeft: {
    position: "absolute",
    top: "3px",
    left: "0px",
    writingMode: "vertical-rl",
    wordWrap: "break-word",
    whiteSpace: "break-spaces",
  },
  textRight: {
    position: "absolute",
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    textAlign: "left",
    bottom: "3px",
    right: "1px",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
  },
  textCentered: {
    position: "absolute",
    inset: "0",
    display: "flex",
    justifyContent: "center",
    color: "black",
    wordWrap: "break-word",
    whiteSpace: "break-spaces",
  },
  textCenteredP: {
    margin: "0",
    marginTop: "auto",
  },
  flexGraphics: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "100px",
    opacity: "1",
    padding: "55px",
  },
  qrImage: {
    width: "100%",
    height: "100%",
  },
  qrTextCenter: {
    position: "absolute",
    margin: "auto",
    inset: "0",
    color: "black",
  },
  triangle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontSize: "15px",
    borderRadius: "10px",
  },
  qrTextBottomRightCentered: {
    color: "black",
    wordWrap: "break-word",
    whiteSpace: "break-spaces",
    position: "absolute",
    inset: "0",
    display: "flex",
    justifyContent: "center",
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
        <div className="fixed top-4 right-4 z-10 cursor-pointer">
          <button
            onClick={() => setActiveTab("cart")}
            className="flex items-center justify-center px-3 cursor-pointer py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200"
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
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("editor")}
            >
              <Layout className="inline-block w-4 h-4 mr-2" />
              Editor
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === "results"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("results")}
            >
              <Code className="inline-block w-4 h-4 mr-2" />
              Print Results
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === "cart"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm cursor-pointer"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              <ShoppingCart className="inline-block w-4 h-4 mr-2" />
              Cart {cart.length > 0 && `(${cart.length})`}
            </button>
          </div>
        </div>

        {/* Main Content - Editor View */}
        {activeTab === "editor" && (
          <EditorView
            textInput={textInput}
            onChangeTextHandler={onChangeTextHandler}
            text={text}
            url={url}
            setUrl={setUrl}
            generateAztecBarcode={generateAztecBarcode}
            downloadPng={downloadPng}
            downloadSvg={downloadSvg}
            sendToPrintify={sendToPrintify}
            navigate={navigate}
            setShowProductSelector={setShowProductSelector}
            printifyStatus={printifyStatus}
            customStyles={customStyles}
            config={config}
            boxSize={boxSize}
            qrSize={qrSize}
            qrRef={qrRef}
            textRef={textRef}
            aztecBarcode={aztecBarcode}
            spacingBuffer={spacingBuffer}
          />
        )}

        {/* Print Results View */}
        {activeTab === "results" && (
          <PrintResults
            loader={loader || productLoading}
            loderMsg={productLoading ? "Loading products..." : loderMsg}
            mockupUrl={mockupUrl}
            errorMsg={errorMsg}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
            productOptions={productOptions}
          />
        )}

        {/* Cart View */}
        {(activeTab === "cart" || activeTab === "confirmation") && (
          <Cart
            cart={cart}
            setCart={setCart}
            setActiveTab={setActiveTab}
            placeOrder={placeOrder}
            orderPlaced={orderPlaced}
            setOrderPlaced={setOrderPlaced}
          />
        )}

        <ProductSelectorModal
          isOpen={showProductSelector}
          onClose={() => setShowProductSelector(false)}
          productOptions={productOptions}
          selectedProducts={selectedProducts}
          toggleProductSelection={toggleProductSelection}
          addSelectedToCart={addSelectedToCart}
          loading={productLoading}
        />
        {/* Loading Overlay */}
        {loader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center">
              <Loading message={loderMsg} />
         
            </div>
          </div>
        )}

        {/* New font loading overlay */}


        {/* Help Info */}
        <div className="mt-8 text-center">
          <button
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
            onClick={() => window.open("/help", "_blank")}
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
