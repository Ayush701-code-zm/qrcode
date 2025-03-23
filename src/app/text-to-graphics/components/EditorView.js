import React from "react";
import {
  Download,
  Image as ImageIcon,
  Cog,
  Printer,
  Wand2,
  ShoppingCart,
} from "lucide-react";

const EditorView = ({
  textInput,
  onChangeTextHandler,
  text,
  url,
  setUrl,
  generateAztecBarcode,
  downloadPng,
  downloadSvg,
  sendToPrintify,
  navigate,
  setShowProductSelector,
  printifyStatus,
  customStyles,
  config,
  boxSize,
  qrSize,
  qrRef,
  textRef,
  aztecBarcode,
  spacingBuffer,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          Design Controls
        </h2>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Your Text
          </label>
          <div className="relative ">
            <textarea
              rows="3"
              value={textInput}
              onChange={(e) =>
                onChangeTextHandler(e.target.value, aztecBarcode)
              }
              placeholder="Enter your text here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
            <div className="absolute right-3 bottom-3 text-sm text-gray-500 dark:text-gray-400">
              {text.replace(/\n/g, "")?.length} / 36
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
              className="inline-flex cursor-pointer items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
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
            className={`flex items-center justify-center py-2 px-4 cursor-pointer ${
              text.length
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 dark:bg-gray-700  cursor-pointer"
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
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed "
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
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
            } text-white font-medium rounded-lg transition-colors duration-200`}
          >
            <Printer size={16} className="mr-2" />
            Print
          </button>
          <button
            onClick={() => navigate("/config")}
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
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
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
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
          Preview
        </h2>

        {text.length > 0 ? (
          <div style={customStyles.flexGraphics} id="graphic-parent">
            {config.format === "center" ? (
              <div
                className="font-custom"
                ref={qrRef}
                style={{
                  ...customStyles.qrBoxCentered,
                  height: `${boxSize}px`,
                  width: `${boxSize}px`,
                }}
              >
                <div
                  style={{
                    ...customStyles.textCentered,
                    transform: "rotate(90deg)",
                  }}
                  className="left"
                >
                  <p style={customStyles.textCenteredP}>{text}</p>
                </div>
                <div
                  style={{
                    ...customStyles.textCentered,
                    transform: "rotate(180deg)",
                  }}
                  className="top"
                >
                  <p style={customStyles.textCenteredP}>{text}</p>
                </div>
                <div
                  style={{
                    ...customStyles.textCentered,
                    transform: "rotate(270deg)",
                  }}
                  className="right font-custom"
                >
                  <p style={customStyles.textCenteredP} ref={textRef}>
                    {text}
                  </p>
                </div>
                <div style={customStyles.textCentered} className="bottom">
                  <p style={customStyles.textCenteredP}>{text}</p>
                </div>
                <div
                  style={{
                    ...customStyles.qrTextCenter,
                    width: `${qrSize}px`,
                    height: `${qrSize}px`,
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
                <div style={customStyles.textBottom} ref={textRef}>
                  {text}
                </div>
                <div
                  style={{
                    ...customStyles.textLeft,
                    bottom:
                      (textRef?.current?.clientHeight || 0) +
                      (spacingBuffer - 10),
                  }}
                >
                  {text}
                </div>
                <div style={customStyles.textRight}>{text}</div>
                <div
                  style={{
                    ...customStyles.qrTextCenter,
                    width: `${qrSize}px`,
                    height: `${qrSize}px`,
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
  );
};

export default EditorView;
