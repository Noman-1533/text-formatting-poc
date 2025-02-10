import { useEffect, useRef, useState } from "react";
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
  // const [isBanglaMode, setIsBanglaMode] = useState(false);

  // useEffect(() => {
  //   console.log(window.Avro);
  //   if (window.Avro) {
  //     console.log("init");
  //     window.Avro.init();
  //   }
  // }, []);
  // useEffect(() => {
  //   const checkAvroLoaded = setInterval(() => {
  //     if (window.Avro) {
  //       clearInterval(checkAvroLoaded);
  //       window.Avro.init(); // Initialize jsAvroPhonetic
  //     }
  //   }, 500);

  //   return () => clearInterval(checkAvroLoaded);
  // }, []);
  // useEffect(() => {
  //   // Dynamically load the script
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://torifat.github.io/jsAvroPhonetic/libs/avro-keyboard/dist/avro-v1.1.4.min.js";
  //   script.async = true;
  //   script.onload = () => {
  //     console.log("Avro script loaded!", window.Avro);
  //     if (window.Avro) {
  //       console.log("init");
  //       window.Avro.init();
  //     }
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Function to load a script dynamically
  //   const loadScript = (src: string, onLoad?: () => void) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.async = true;
  //     if (onLoad) script.onload = onLoad;
  //     document.body.appendChild(script);
  //   };

  //   // Load jQuery first
  //   loadScript("https://code.jquery.com/jquery-3.6.0.min.js", () => {
  //     console.log("jQuery loaded!");

  //     // Then load Avro after jQuery is available
  //     loadScript(
  //       "https://torifat.github.io/jsAvroPhonetic/libs/avro-keyboard/dist/avro-v1.1.4.min.js",
  //       () => {
  //         console.log("Avro script loaded!", window.Avro);
  //         if (window.Avro) {
  //           window.Avro.init();
  //         }
  //       }
  //     );
  //   });

  //   return () => {
  //     // Cleanup: remove scripts when the component unmounts
  //     document
  //       .querySelectorAll("script[src*='jquery'], script[src*='avro']")
  //       .forEach((script) => {
  //         document.body.removeChild(script);
  //       });
  //   };
  // }, []);

  //   useEffect(() => {
  //     <script
  //   src="https://torifat.github.io/jsAvroPhonetic/libs/avro-keyboard/dist/avro-v1.1.4.min.js"
  //   type="text/javascript"
  //   // charset="utf-8"
  // >

  // $(function () {

  //         $("textarea, input[type=text]").avro();
  //       });
  // </script>;
  // <script type="text/javascript" >

  //     </script>
  //     // Function to dynamically load scripts
  //     const loadScript = (src: string, onLoad?: () => void) => {
  //       const existingScript = document.querySelector(`script[src="${src}"]`);
  //       if (!existingScript) {
  //         const script = document.createElement("script");
  //         script.src = src;
  //         script.async = true;
  //         if (onLoad) script.onload = onLoad;
  //         document.body.appendChild(script);
  //       } else if (onLoad) {
  //         onLoad();
  //       }
  //     };

  //     // Load jQuery first
  //     loadScript("https://code.jquery.com/jquery-3.6.0.min.js", () => {
  //       console.log("✅ jQuery loaded!");

  //       // Load Avro AFTER jQuery is ready
  //       const val = loadScript(
  //         "https://torifat.github.io/jsAvroPhonetic/libs/avro-keyboard/dist/avro-v1.1.4.min.js",
  //         () => {
  //           console.log("loaded", val);
  //           console.log("✅ Avro script loaded!");

  //           // Check Avro after script is loaded
  //           // setTimeout(() => {
  //           if (window.Avro) {
  //             console.log("✅ Avro initialized:", window.Avro);
  //             window.Avro.init();
  //           } else {
  //             console.error("❌ Avro is still undefined!");
  //           }
  //           // }, 500); // Give some time for script execution
  //         }
  //       );
  //     });

  //     return () => {
  //       // Cleanup scripts when component unmounts
  //       document
  //         .querySelectorAll("script[src*='jquery'], script[src*='avro']")
  //         .forEach((script) => {
  //           document.body.removeChild(script);
  //         });
  //     };
  //   }, []);
  // const handleFontChange = (font: string) => {
  //   if (font === "bangla") {
  //     setIsBanglaMode(true);
  //   } else {
  //     setIsBanglaMode(false);
  //   }
  // };
  // const handleSelectionChange = (event: any) => {
  // console.log(event);
  // const quill = quillRef.current?.getEditor();
  // if (quill) {
  //   const currentFormat = quill.getFormat();
  //   console.log("font is", currentFormat.font);
  //   if (banglaFont.includes(currentFormat.font)) {
  //     isBanglaMode = true;
  //   } else if (isBanglaMode && event.key === "Enter") {
  //     console.log("isBanglaMode");
  //     isBanglaMode = true;
  //   } else {
  //     console.log("make it false");
  //     isBanglaMode = false;
  //   }
  // }
  // };
  // useEffect(() => {
  //   const quillInstance = quillRef.current?.getEditor();
  //   if (!quillInstance) return;
  //   // if (isBanglaMode)
  //   {
  //     const handleKeyDown = (event: any) => {
  //       console.log(isBanglaMode);
  //       console.log(event.key);
  //       if (event.key !== " " && event.key !== "Enter") return;
  //       const selection = quillInstance.getSelection();
  //       console.log("selecting", selection);
  //       if (!selection) return;
  //       const currentFormat = quillInstance.getFormat(selection);
  //       if (!banglaFont.includes(currentFormat.font)) return;
  //       const index = selection.index;
  //       let textBeforeCursor = quillInstance
  //         .getText(0, index)
  //         .replace(/\n$/, "");
  //       const match = textBeforeCursor.match(/(\S+)$/); // Match last word

  //       if (match) {
  //         const lastWord = match[1];
  //         const wordStartIndex = index - lastWord.length;
  //         const replacement = OmicronLab.Avro.Phonetic.parse(lastWord); // Your custom conversion logic

  //         event.preventDefault();

  //         if (event.key === " ") {
  //           // quillInstance.root.style.fontFamily = "bangla";
  //           quillInstance.deleteText(wordStartIndex, lastWord.length);
  //           quillInstance.insertText(
  //             wordStartIndex,
  //             replacement,
  //             currentFormat
  //           );
  //           quillInstance.insertText(
  //             wordStartIndex + replacement.length,
  //             " ",
  //             currentFormat
  //           );
  //           // quillInstance.setSelection(
  //           //   wordStartIndex,
  //           //   wordStartIndex + replacement.length + 1
  //           // );
  //         } else if (event.key === "Enter") {
  //           // console.log("enter");
  //           // quillInstance.root.style.fontFamily = "bangla";
  //           quillInstance.deleteText(wordStartIndex - 1, lastWord.length);
  //           quillInstance.insertText(
  //             wordStartIndex - 1,
  //             replacement,
  //             currentFormat
  //           );
  //           // quillInstance.insertText(wordStartIndex + replacement.length, "\n");
  //           // quillInstance.setSelection(
  //           //   wordStartIndex,
  //           //   wordStartIndex + replacement.length + 1
  //           // );
  //         }
  //       }
  //     };

  //     quillInstance.root.addEventListener("keydown", handleKeyDown);

  //     return () => {
  //       quillInstance.root.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }
  // }, []);
  // useEffect(() => {
  //   const quillInstance = quillRef.current?.getEditor();
  //   if (!quillInstance) return;

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     const selection = quillInstance.getSelection();
  //     if (!selection) return;
  //     const currentFormat = quillInstance.getFormat(selection.index - 1, 1);
  //     if (banglaFont.includes(currentFormat.font)) return;

  //     if (event.key === "Enter") {
  //       event.preventDefault(); // Prevent the default behavior

  //       // Get the format of the current line
  //       const currentFont = currentFormat.font; // Get the current font

  //       // Insert a new line with the same font
  //       quillInstance.insertText(selection.index, "", { font: currentFont });
  //       quillInstance.setSelection(selection.index + 1, 0); // Move the cursor to the new line
  //     }
  //   };

  //   quillInstance.root.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     quillInstance.root.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  // useEffect(() => {
  //   const quillInstance = quillRef.current?.getEditor();
  //   if (!quillInstance) return;

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     const selection = quillInstance.getSelection();
  //     if (!selection || selection.index === 0) return;

  //     const index = selection.index;
  //     const currentFormat = quillInstance.getFormat(selection.index - 1, 1);
  //     const currentFont = currentFormat.font; // Store current font

  //     // ✅ Font retention for all fonts when Enter is pressed
  //     if (event.key === "Enter" && !isBanglaMode) {
  //       console.log("enter");
  //       event.preventDefault(); // Prevent default behavior
  //       quillInstance.insertText(selection.index, "", currentFormat);
  //       // quillInstance.setSelection(selection.index + 1, 0,currentFormat);
  //       return; // Prevent further execution
  //     }

  //     // ✅ Avro conversion (Only if isBanglaMode is true and font is Bangla)
  //     if (isBanglaMode && (event.key === " " || event.key === "Enter")) {
  //       console.log(event.key);
  //       let textBeforeCursor = quillInstance
  //         .getText(0, index)
  //         .replace(/\n$/, "");
  //       const match = textBeforeCursor.match(/(\S+)$/); // Match last word

  //       if (match) {
  //         const lastWord = match[1];
  //         const wordStartIndex = index - lastWord.length;
  //         const replacement = OmicronLab.Avro.Phonetic.parse(lastWord);

  //         event.preventDefault(); // Prevent default behavior

  //         // quillInstance.deleteText(wordStartIndex, lastWord.length);
  //         // quillInstance.insertText(wordStartIndex, replacement, {
  //         //   font: currentFont,
  //         // }); // Preserve font
  //         // quillInstance.insertText(
  //         //   wordStartIndex + replacement.length,
  //         //   event.key === " " ? " " : "\n",
  //         //   { font: currentFont }
  //         // );

  //         // // Set selection at the end
  //         // quillInstance.setSelection(
  //         //   wordStartIndex + replacement.length + 1,
  //         //   0
  //         // );
  //         if (event.key === " ") {
  //           // quillInstance.root.style.fontFamily = "bangla";
  //           quillInstance.deleteText(wordStartIndex, lastWord.length);
  //           quillInstance.insertText(
  //             wordStartIndex,
  //             replacement,
  //             currentFormat
  //           );
  //           quillInstance.insertText(
  //             wordStartIndex + replacement.length,
  //             " ",
  //             currentFormat
  //           );
  //           // quillInstance.setSelection(
  //           //   wordStartIndex,
  //           //   wordStartIndex + replacement.length + 1
  //           // );
  //         } else if (event.key === "Enter") {
  //           // quillInstance.root.style.fontFamily = "bangla";
  //           quillInstance.deleteText(wordStartIndex - 1, lastWord.length);
  //           quillInstance.insertText(
  //             wordStartIndex - 1,
  //             replacement,
  //             currentFormat
  //           );
  //           // quillInstance.insertText(wordStartIndex + replacement.length, "\n");
  //           // quillInstance.setSelection(
  //           //   wordStartIndex,
  //           //   wordStartIndex + replacement.length + 1
  //           // );
  //         }
  //       }
  //     } else console.log("from outside", event.key);
  //   };

  //   quillInstance.root.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     quillInstance.root.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isBanglaMode]);

  useEffect(() => {
    const quillInstance = quillRef.current?.getEditor();
    if (!quillInstance) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("key ", event.key);
      if (event.key !== " " && event.key !== "Enter") return;
      console.log("enter in effect");
      const selection = quillInstance.getSelection();
      if (!selection || selection.index === 0) return;

      const index = selection.index;
      const currentFormat = quillInstance.getFormat(selection);
      let textBeforeCursor = quillInstance.getText(0, index).replace(/\n$/, "");
      console.log("text before cursor", textBeforeCursor);
      const match = textBeforeCursor.match(/(\S+)$/); // Match last word

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

    quillInstance.root.addEventListener("keydown", handleKeyDown);

    return () => {
      quillInstance.root.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBanglaMode]);

  // useEffect(() => {
  //   const quillInstance = quillRef.current?.getEditor();
  //   if (!quillInstance) return;
  //   const handleKeyDown = (event: any) => {
  //     if (event.key === "Enter") {
  //       const selection = quillInstance.getSelection();
  //       if (!selection || selection.length == 0) return;
  //       const currentFormat = quillInstance.getFormat(selection);
  //       quillInstance.deleteText(selection.length - 1, selection.length);
  //       quillInstance.insertText(selection.length - 1, "\n", currentFormat);
  //     }
  //   };
  //   quillInstance.root.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     quillInstance.root.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [currentFont]);

  // useAvro(quillRef, { bangla: isBanglaMode, fontName: currentFont });

  // useEffect(() => {
  //   const quillInstance = quillRef.current?.getEditor();
  //   if (!quillInstance) return;

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault(); // Prevent default behavior

  //       const selection = quillInstance.getSelection();
  //       if (!selection) return;

  //       const currentFormat = quillInstance.getFormat(selection.index - 1, 1); // Get current formatting
  //       const currentFont = currentFormat.font; // Get current font
  //       console.log("current font", currentFormat.font);
  //       // Handle Avro conversion if in Bangla mode
  //       if (banglaFont.includes(currentFont)) {
  //         const textBeforeCursor = quillInstance
  //           .getText(0, selection.index)
  //           .replace(/\n$/, ""); // Get text before cursor
  //         const match = textBeforeCursor.match(/(\S+)$/); // Match the last word
  //         console.log("enter key press");
  //         if (match) {
  //           const lastWord = match[1];
  //           const wordStartIndex = selection.index - lastWord.length;
  //           const replacement = OmicronLab.Avro.Phonetic.parse(lastWord); // Convert to Bangla

  //           // Replace the last word with the converted Bangla text
  //           quillInstance.deleteText(wordStartIndex, lastWord.length);
  //           quillInstance.insertText(
  //             wordStartIndex,
  //             replacement,
  //             currentFormat
  //           );
  //         }
  //       }

  //       // Insert a new line with the current font
  //       quillInstance.insertText(selection.index, "", { font: currentFont });
  //       quillInstance.setSelection(selection.index + 1, 0); // Move cursor to the new line
  //     }
  //   };

  //   quillInstance.root.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     quillInstance.root.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []); // Re-run effect when Bangla mode changes

  const [currentLength, setCurrentLength] = useState(0);
  const handleKeyUp = () => {
    if (quillRef.current) {
      const text = quillRef.current.getEditor().getText();

      setCurrentLength(
        text[text.length - 1] === "\n" ? text.length - 1 : text.length
      );
    }
    // if(isBanglaMode())
    // if (isBanglaMode && window.Avro) {
    //   const quill = quillRef.current?.getEditor();
    //   if (quill) {
    //     const range = quill.getSelection();
    //     if (range) {
    //       const text = quill.getText(range.index - 10, 10);
    //       const transformed = window.Avro.phonetic(text);
    //       quill.deleteText(range.index - text.length, text.length);
    //       quill.insertText(
    //         range.index - text.length,
    //         transformed,
    //         "font",
    //         "bangla"
    //       );
    //       // quill.setSelection(range.index - text.length + transformed.length);
    //     }
    //   }
    // }
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
