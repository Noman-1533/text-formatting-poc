import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import html2canvas from "html2canvas";

import OmicronLab from "./avro-lib";
let isBanglaMode = false;
export default function TextStyleComponent() {
  const quillRef = useRef<ReactQuill>(null);
  const [appliedStyles, setAppliedStyles] = useState<Map<number, string>>(
    new Map()
  );
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formattedOutput, setFormattedOutput] = useState<string>("");

  const unicodeStyles = {
    circle: {
      a: "🅐",
      b: "🅑",
      c: "🅒",
      d: "🅓",
      e: "🅔",
      f: "🅕",
      g: "🅖",
      h: "🅗",
      i: "🅘",
      j: "🅙",
      k: "🅚",
      l: "🅛",
      m: "🅜",
      n: "🅝",
      o: "🅞",
      p: "🅟",
      q: "🅠",
      r: "🅡",
      s: "🅢",
      t: "🅣",
      u: "🅤",
      v: "🅥",
      w: "🅦",
      x: "🅧",
      y: "🅨",
      z: "🅩",
      A: "🅐",
      B: "🅑",
      C: "🅒",
      D: "🅓",
      E: "🅔",
      F: "🅕",
      G: "🅖",
      H: "🅗",
      I: "🅘",
      J: "🅙",
      K: "🅚",
      L: "🅛",
      M: "🅜",
      N: "🅝",
      O: "🅞",
      P: "🅟",
      Q: "🅠",
      R: "🅡",
      S: "🅢",
      T: "🅣",
      U: "🅤",
      V: "🅥",
      W: "🅦",
      X: "🅧",
      Y: "🅨",
      Z: "🅩",
    },
    doubleStruck: {
      a: "𝕒",
      b: "𝕓",
      c: "𝕔",
      d: "𝕕",
      e: "𝕖",
      f: "𝕗",
      g: "𝕘",
      h: "𝕙",
      i: "𝕚",
      j: "𝕛",
      k: "𝕜",
      l: "𝕝",
      m: "𝕞",
      n: "𝕟",
      o: "𝕠",
      p: "𝕡",
      q: "𝕢",
      r: "𝕣",
      s: "𝕤",
      t: "𝕥",
      u: "𝕦",
      v: "𝕧",
      w: "𝕨",
      x: "𝕩",
      y: "𝕪",
      z: "𝕫",
      A: "𝔸",
      B: "𝔹",
      C: "ℂ",
      D: "𝔻",
      E: "𝔼",
      F: "𝔽",
      G: "𝔾",
      H: "ℍ",
      I: "𝕀",
      J: "𝕁",
      K: "𝕂",
      L: "𝕃",
      M: "𝕄",
      N: "ℕ",
      O: "𝕆",
      P: "ℙ",
      Q: "ℚ",
      R: "ℝ",
      S: "𝕊",
      T: "𝕋",
      U: "𝕌",
      V: "𝕍",
      W: "𝕎",
      X: "𝕏",
      Y: "𝕐",
      Z: "ℤ",
    },
    square: {
      a: "🄰",
      b: "🄱",
      c: "🄲",
      d: "🄳",
      e: "🄴",
      f: "🄵",
      g: "🄶",
      h: "🄷",
      i: "🄸",
      j: "🄹",
      k: "🄺",
      l: "🄻",
      m: "🄼",
      n: "🄽",
      o: "🄾",
      p: "🄿",
      q: "🅀",
      r: "🅁",
      s: "🅂",
      t: "🅃",
      u: "🅄",
      v: "🅅",
      w: "🅆",
      x: "🅇",
      y: "🅈",
      z: "🅉",
      A: "🄰",
      B: "🄱",
      C: "🄲",
      D: "🄳",
      E: "🄴",
      F: "🄵",
      G: "🄶",
      H: "🄷",
      I: "🄸",
      J: "🄹",
      K: "🄺",
      L: "🄻",
      M: "🄼",
      N: "🄽",
      O: "🄾",
      P: "🄿",
      Q: "🅀",
      R: "🅁",
      S: "🅂",
      T: "🅃",
      U: "🅄",
      V: "🅅",
      W: "🅆",
      X: "🅇",
      Y: "🅈",
      Z: "🅉",
    },
    script: {
      a: "𝒶",
      b: "𝒷",
      c: "𝒸",
      d: "𝒹",
      e: "ℯ",
      f: "𝒻",
      g: "ℊ",
      h: "𝒽",
      i: "𝒾",
      j: "𝒿",
      k: "𝓀",
      l: "𝓁",
      m: "𝓂",
      n: "𝓃",
      o: "ℴ",
      p: "𝓅",
      q: "𝓆",
      r: "𝓇",
      s: "𝓈",
      t: "𝓉",
      u: "𝓊",
      v: "𝓋",
      w: "𝓌",
      x: "𝓍",
      y: "𝓎",
      z: "𝓏",
      A: "𝒜",
      B: "ℬ",
      C: "𝒞",
      D: "𝒟",
      E: "ℰ",
      F: "ℱ",
      G: "𝒢",
      H: "ℋ",
      I: "ℐ",
      J: "𝒥",
      K: "𝒦",
      L: "ℒ",
      M: "ℳ",
      N: "𝒩",
      O: "𝒪",
      P: "𝒫",
      Q: "𝒬",
      R: "ℛ",
      S: "𝒮",
      T: "𝒯",
      U: "𝒰",
      V: "𝒱",
      W: "𝒲",
      X: "𝒳",
      Y: "𝒴",
      Z: "𝒵",
    },
  };

  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "sans-serif",
    "Roboto",
    "stencil",
    "Lobster",
    "Raleway",
    "kalpurush",
    "বাংলা",
  ];
  Quill.register(Font, true);
  const banglaFont = ["বাংলা", "kalpurush"];

  const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const normalChars: string[] = Array.from(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  );
  const boldChars: string[] = Array.from(
    "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
  );
  const italicChars: string[] = Array.from(
    "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789"
  );
  const boldItalicChars: string[] = Array.from(
    "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
  );

  const fontMappings: { [key: string]: string[] } = {
    "Sans Serif": normalChars,
    Lobster: Array.from(
      "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    ),
    Raleway: Array.from(
      "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    ),
    Roboto: Array.from(
      "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    ),
    bangla: Array.from(
      "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়০১২৩৪৫৬৭৮৯"
    ),
  };

  const formatChar = (
    char: string,
    format: "bold" | "italic" | "boldItalic" | "normal",
    font?: string
  ): string => {
    const index: number = normalChars.indexOf(char);
    if (index === -1) return char;

    if (font && fontMappings[font]) {
      return fontMappings[font][index];
    }

    switch (format) {
      case "bold":
        return boldChars[index];
      case "italic":
        return italicChars[index];
      case "boldItalic":
        return boldItalicChars[index];
      default:
        return char;
    }
  };

  const convertFormat = (): void => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const delta = quill.getContents();
    let result: string = "";

    delta.ops?.forEach(
      (op: {
        insert?: string;
        attributes?: {
          bold?: boolean;
          italic?: boolean;
          underline?: boolean;
          font?: string;
        };
      }) => {
        if (typeof op.insert === "string") {
          const chars: string[] = Array.from(op.insert);
          chars.forEach((char: string) => {
            if (op.attributes) {
              if (op.attributes.bold && op.attributes.italic) {
                char = formatChar(char, "boldItalic", op.attributes.font);
              } else if (op.attributes.bold) {
                char = formatChar(char, "bold", op.attributes.font);
              } else if (op.attributes.italic) {
                char = formatChar(char, "italic", op.attributes.font);
              } else if (op.attributes.font) {
                char = formatChar(char, "normal", op.attributes.font);
              }
              if (op.attributes.underline) {
                char = char + "\u0332";
              }
            }
            result += char;
          });
        }
      }
    );

    setFormattedOutput(result);
  };

  const copyText = (): void => {
    if (formattedOutput) {
      navigator.clipboard
        .writeText(formattedOutput)
        .then(() => alert("Copied to clipboard!"))
        .catch(() =>
          alert(
            "Failed to copy text. Please try selecting and copying manually."
          )
        );
    }
  };

  const clearAll = (): void => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.setText("");
    }
    setFormattedOutput("");
    setPreviewImage("");
  };

  const toggleStyle = (style: keyof typeof unicodeStyles) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        const text = editor.getText(range.index, range.length);
        if (appliedStyles.has(range.index)) {
          const originalText = appliedStyles.get(range.index);
          editor.deleteText(range.index, range.length);
          editor.insertText(range.index, originalText || "");
          appliedStyles.delete(range.index);
          setAppliedStyles(new Map(appliedStyles));
        } else {
          const styledText = text
            .split("")
            .map((char) => {
              const key = char as keyof (typeof unicodeStyles)[typeof style];
              return unicodeStyles[style][key] || char;
            })
            .join("");
          editor.deleteText(range.index, range.length);
          editor.insertText(range.index, styledText);
          appliedStyles.set(range.index, text);
          setAppliedStyles(new Map(appliedStyles));
        }
      }
    }
  };

  const convertToImage = () => {
    // const previewOutput = document.getElementById("preview-output");
    // if (previewOutput) {
    //   html2canvas(previewOutput).then((canvas) => {
    //     const image = canvas.toDataURL("image/png");
    //     setPreviewImage(image);
    //   });
    // }
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();
      const htmlContent = quillInstance.root.innerHTML; // Extract formatted HTML

      // Create a temporary div element to store the extracted content
      const hiddenDiv = document.createElement("div");
      hiddenDiv.innerHTML = htmlContent;
      // hiddenDiv.style.position = "absolute";
      hiddenDiv.style.width = "400px";
      hiddenDiv.style.padding = "10px";
      hiddenDiv.style.left = "-9999px"; // Hide the div off-screen
      document.body.appendChild(hiddenDiv); // Append it to the body temporarily

      // Convert the hidden div into an image
      html2canvas(hiddenDiv).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        setPreviewImage(image); // Store the image in state

        // Remove the temporary div after capturing
        document.body.removeChild(hiddenDiv);
      });
    }
  };

  const [styledButtons, setStyledButtons] = useState<string[]>([]);

  const handleStyledButtonClick = (buttonName: string) => {
    setStyledButtons((prev) =>
      prev.includes(buttonName)
        ? prev.filter((item) => item !== buttonName)
        : [...prev, buttonName]
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const quillInstance = quillRef.current?.getEditor();
    if (!quillInstance) return;
    console.log("key ", event.key);
    if (event.key !== " " && event.key !== "Enter") return;
    console.log("enter in effect");
    const selection = quillInstance.getSelection();
    if (!selection || selection.index === 0) return;

    const index = selection.index;
    const currentFormat = quillInstance.getFormat(selection);
    let textBeforeCursor = quillInstance.getText(0, index).replace(/\n$/, "");
    console.log("text before cursor", textBeforeCursor);
    const match = textBeforeCursor.match(/(\S+)$/);

    console.log("match", match);
    if (match) {
      const lastWord = match[1];
      const wordStartIndex = index - lastWord.length;
      const replacement = OmicronLab.Avro.Phonetic.parse(lastWord);
      event.preventDefault();

      if (event.key === " " && banglaFont.includes(currentFormat.font)) {
        quillInstance.deleteText(wordStartIndex, lastWord.length);
        quillInstance.insertText(wordStartIndex, replacement, currentFormat);
        quillInstance.insertText(
          wordStartIndex + replacement.length,
          " ",
          currentFormat
        );
      } else if (event.key === "Enter") {
        console.log("is Bangla mode", isBanglaMode);
        if (banglaFont.includes(currentFormat.font)) {
          quillInstance.deleteText(wordStartIndex - 1, lastWord.length);
          quillInstance.insertText(
            wordStartIndex - 1,
            replacement,
            currentFormat
          );
          quillInstance.insertText(selection.index, "", currentFormat);
        } else quillInstance.insertText(selection.index, "", currentFormat);
      }
    }
  };

  const [currentLength, setCurrentLength] = useState(0);
  const handleKeyUp = () => {
    if (quillRef.current) {
      const text = quillRef.current.getEditor().getText();

      setCurrentLength(
        text[text.length - 1] === "\n" ? text.length - 1 : text.length
      );
    }
  };

  return (
    <div>
      <header>
        <h1>TextStyle.com</h1>
        <p>
          Style your text in Bangla and English for social media and online
          platforms.
        </p>
      </header>

      <div className="container">
        {/* Text Editor */}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          // onChangeSelection={handleSelectionChange}
          style={{ height: "20vh", marginBottom: "40px" }}
        />
        <div className="word-count">{currentLength || 0} Characters</div>

        {/* Unicode Style Buttons */}
        <div className="font-icons">
          <button
            className={`${
              styledButtons.includes("circle") ? "font-icons-active" : ""
            }`}
            onClick={() => {
              toggleStyle("circle");
              handleStyledButtonClick("circle");
            }}
          >
            <span>🅐 circle</span>
          </button>
          <button
            className={`${
              styledButtons.includes("doubleStruck") ? "font-icons-active" : ""
            }`}
            onClick={() => {
              toggleStyle("doubleStruck");
              handleStyledButtonClick("doubleStruck");
            }}
          >
            <span>𝔸 double-struck</span>
          </button>
          <button
            className={`${
              styledButtons.includes("square") ? "font-icons-active" : ""
            }`}
            onClick={() => {
              toggleStyle("square");
              handleStyledButtonClick("square");
            }}
          >
            <span>🄰 square</span>
          </button>
          <button
            className={`${
              styledButtons.includes("script") ? "font-icons-active" : ""
            }`}
            onClick={() => {
              toggleStyle("script");
              handleStyledButtonClick("script");
            }}
          >
            <span>𝒜 script</span>
          </button>
          {/* <button onClick={toggleBanglaConversion}>Write Bangla</button> */}
        </div>

        {/* Subscription Plans */}
        {/* <div className="subscription-plans">
          <div className="plan">
            <h3>Free Trial</h3>
            <p>7 days full features</p>
            <button onClick={() => alert("Selected Free Trial")}>Select</button>
          </div>
          <div className="plan">
            <h3>Premium</h3>
            <p>Full features without color picking</p>
            <button onClick={() => alert("Selected Premium")}>Select</button>
          </div>
          <div className="plan">
            <h3>Full Features</h3>
            <p>All features including color picking</p>
            <button onClick={() => alert("Selected Full Features")}>
              Select
            </button>
          </div>
        </div> */}

        {/* Preview Box */}
        <div className="preview-box">
          <h3>Preview Output</h3>
          <div id="preview-output">{formattedOutput}</div>
        </div>

        {/* Image Preview */}
        <div id="image-preview">
          <h3>Image Preview</h3>
          {previewImage && <img src={previewImage} alt="Image Preview" />}
        </div>

        {/* Buttons */}
        <div className="style-buttons" style={{ marginTop: "10px" }}>
          <button onClick={convertFormat}>Convert Format</button>
          <button onClick={copyText}>Copy Text</button>
          <button onClick={clearAll}>Clear</button>
          <button onClick={convertToImage}>Convert to Image</button>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 TextStyle.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
