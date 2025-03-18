'use client';

import TextToGraphics from "./TextToGraphics";
import NavBar from "../components/NavBar";
import FooterSection from "../components/FooterSection";
import { useState } from 'react'

export default function TextToGraphicsPage() {
    const [config, setConfig] = useState({
        format: 'left',
      })
      const [text, setText] = useState('')
      const [textInput, setTextInput] = useState('')

  return (
    <main>
      <NavBar />
      <div className="mt-16 md:mt-20 lg:mt-24 px-4 md:px-8 lg:px-24">
        <TextToGraphics
           config={config}
           text={text}
           setText={setText}
           textInput={textInput}
           setTextInput={setTextInput} />
      </div>
      <FooterSection />
    </main>
  );
}