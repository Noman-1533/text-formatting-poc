// import { useRef, useState } from "react";
// import ReactQuill from "react-quill";

// const TextFormatter2 = () => {
//   const quillRef = useRef<ReactQuill | null>(null);
//   const [content, setContent] = useState<string>("");
//   const [formattedOutput, setFormattedOutput] = useState<string>("");

//   const formatChar = (char: string, formats: string[]): string => {
//     // Map each format type to its corresponding Unicode range
//     const formatMap: { [key: string]: string } = {
//       bold: "\u1D400", // Bold characters
//       italic: "\u1D434", // Italic characters
//       underline: "\u0332", // Underline (combining character)
//     };

//     // Combine formats and apply accordingly
//     let formattedChar = char;
//     formats.forEach((format) => {
//       if (format === "underline") {
//         formattedChar = formattedChar + formatMap[format];
//       } else {
//         formattedChar = `${formatMap[format]}${formattedChar}`;
//       }
//     });

//     return formattedChar;
//   };

//   const convertFormat = (): void => {
//     const quill = quillRef.current?.getEditor();
//     if (!quill) return;

//     const delta = quill.getContents();
//     let result: string = "";

//     delta.ops?.forEach(
//       (op: {
//         insert?: string;
//         attributes?: { bold?: boolean; italic?: boolean; underline?: boolean };
//       }) => {
//         if (typeof op.insert === "string") {
//           const charStr = op.insert;
//           const chars: string[] = Array.from(charStr);
//           chars.forEach((char: string) => {
//             const formats: string[] = [];

//             // Check if each format is applied and add to the formats array
//             if (op.attributes?.bold) formats.push("bold");
//             if (op.attributes?.italic) formats.push("italic");
//             if (op.attributes?.underline) formats.push("underline");

//             // Apply the format for this character
//             result += formatChar(char, formats);
//           });
//         }
//       }
//     );

//     setFormattedOutput(result);
//   };

//   const copyText = (): void => {
//     if (formattedOutput) {
//       navigator.clipboard
//         .writeText(formattedOutput)
//         .then(() => alert("Copied to clipboard!"))
//         .catch(() =>
//           alert(
//             "Failed to copy text. Please try selecting and copying manually."
//           )
//         );
//     }
//   };

//   const clearAll = (): void => {
//     setContent("");
//     setFormattedOutput("");
//   };

//   return (
//     <div className="container">
//       <h1>Text Formatter</h1>
//       <div className="label">Format your text:</div>
//       <div className="editor-container">
//         <ReactQuill
//           ref={quillRef}
//           value={content}
//           onChange={setContent}
//           modules={{
//             toolbar: [["bold", "italic", "underline"], ["clean"]],
//           }}
//           style={{ height: "20vh", marginBottom: "40px" }}
//         />
//         <div className="word-count">
//           {quillRef.current?.editor?.getText().length || 0} Characters
//         </div>
//       </div>
//       <div className="button-group">
//         <button className="primary-button" onClick={convertFormat}>
//           Convert Format
//         </button>
//         <button className="secondary-button" onClick={copyText}>
//           Copy Text
//         </button>
//         <button className="secondary-button" onClick={clearAll}>
//           Clear
//         </button>
//       </div>
//       <div className="label">Formatted Output:</div>
//       <div className="output">{formattedOutput}</div>
//     </div>
//   );
// };

// export default TextFormatter2;

// import { useRef, useState } from "react";
// import ReactQuill from "react-quill";

// const TextFormatter2 = () => {
//   const quillRef = useRef<ReactQuill | null>(null);
//   const [content, setContent] = useState<string>("");
//   const [formattedOutput, setFormattedOutput] = useState<string>("");

//   const formatChar = (char: string, formats: string[]): string => {
//     // Map each format type to its corresponding Unicode range
//     const formatMap: { [key: string]: string } = {
//       bold: "\u1D400", // Bold characters
//       italic: "\u1D434", // Italic characters
//       underline: "\u0332", // Underline (combining character)
//     };

//     let formattedChar = char;

//     // Apply each format dynamically
//     formats.forEach((format) => {
//       if (format === "underline") {
//         // Combine the original char with the Unicode for underline
//         formattedChar = formattedChar + formatMap[format];
//       } else {
//         // Apply the Unicode format (e.g., bold or italic) to the character
//         formattedChar = `${formatMap[format]}${formattedChar}`;
//       }
//     });

//     return formattedChar;
//   };

//   const convertFormat = (): void => {
//     const quill = quillRef.current?.getEditor();
//     if (!quill) return;

//     const delta = quill.getContents();
//     let result: string = "";

//     delta.ops?.forEach(
//       (op: {
//         insert?: string;
//         attributes?: { bold?: boolean; italic?: boolean; underline?: boolean };
//       }) => {
//         if (typeof op.insert === "string") {
//           const charStr = op.insert;
//           const chars: string[] = Array.from(charStr);
//           chars.forEach((char: string) => {
//             const formats: string[] = [];

//             // Check if each format is applied and add to the formats array
//             if (op.attributes?.bold) formats.push("bold");
//             if (op.attributes?.italic) formats.push("italic");
//             if (op.attributes?.underline) formats.push("underline");

//             // Apply the format for this character
//             result += formatChar(char, formats);
//           });
//         }
//       }
//     );

//     setFormattedOutput(result);
//   };

//   const copyText = (): void => {
//     if (formattedOutput) {
//       navigator.clipboard
//         .writeText(formattedOutput)
//         .then(() => alert("Copied to clipboard!"))
//         .catch(() =>
//           alert(
//             "Failed to copy text. Please try selecting and copying manually."
//           )
//         );
//     }
//   };

//   const clearAll = (): void => {
//     setContent("");
//     setFormattedOutput("");
//   };

//   return (
//     <div className="container">
//       <h1>Text Formatter</h1>
//       <div className="label">Format your text:</div>
//       <div className="editor-container">
//         <ReactQuill
//           ref={quillRef}
//           value={content}
//           onChange={setContent}
//           modules={{
//             toolbar: [["bold", "italic", "underline"], ["clean"]],
//           }}
//           style={{ height: "20vh", marginBottom: "40px" }}
//         />
//         <div className="word-count">
//           {quillRef.current?.editor?.getText().length || 0} Characters
//         </div>
//       </div>
//       <div className="button-group">
//         <button className="primary-button" onClick={convertFormat}>
//           Convert Format
//         </button>
//         <button className="secondary-button" onClick={copyText}>
//           Copy Text
//         </button>
//         <button className="secondary-button" onClick={clearAll}>
//           Clear
//         </button>
//       </div>
//       <div className="label">Formatted Output:</div>
//       <div className="output">{formattedOutput}</div>
//     </div>
//   );
// };

// export default TextFormatter2;

// import React, { useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const TextFormatter2: React.FC = () => {
//   const quillRef = useRef<ReactQuill>(null);
//   const [content, setContent] = useState<string>("");
//   const [formattedOutput, setFormattedOutput] = useState<string>("");

//   // Helper function to format characters based on the given format
//   const formatChar = (char: string, format: string): string => {
//     if (char === " ") return char;
//     switch (format) {
//       case "bold":
//         return String.fromCodePoint(char.charCodeAt(0) + 0x1d400 - 0x41); // Mathematical Bold
//       case "italic":
//         return String.fromCodePoint(char.charCodeAt(0) + 0x1d434 - 0x41); // Mathematical Italic
//       case "boldItalic":
//         return String.fromCodePoint(char.charCodeAt(0) + 0x1d468 - 0x41); // Mathematical Bold Italic
//       default:
//         return char;
//     }
//   };

//   // Convert Quill delta to formatted Unicode string
//   const convertFormat = (): void => {
//     const quill = quillRef.current?.getEditor();
//     if (!quill) return;

//     const delta = quill.getContents();
//     let result: string = "";

//     delta.ops?.forEach(
//       (op: {
//         insert?: string;
//         attributes?: { bold?: boolean; italic?: boolean; underline?: boolean };
//       }) => {
//         if (typeof op.insert === "string") {
//           const chars: string[] = Array.from(op.insert);
//           chars.forEach((char: string) => {
//             let formattedChar = char;

//             // Handle combinations of formats
//             if (op.attributes) {
//               if (op.attributes.bold && op.attributes.italic) {
//                 formattedChar = formatChar(formattedChar, "boldItalic");
//               } else if (op.attributes.bold) {
//                 formattedChar = formatChar(formattedChar, "bold");
//               } else if (op.attributes.italic) {
//                 formattedChar = formatChar(formattedChar, "italic");
//               }

//               // Handle underline
//               if (op.attributes.underline) {
//                 formattedChar = formattedChar + "\u0332"; // Combining underline character
//               }
//             }

//             result += formattedChar;
//           });
//         }
//       }
//     );

//     setFormattedOutput(result);
//   };

//   // Copy formatted text to clipboard
//   const copyText = (): void => {
//     if (formattedOutput) {
//       navigator.clipboard
//         .writeText(formattedOutput)
//         .then(() => alert("Copied to clipboard!"))
//         .catch(() =>
//           alert(
//             "Failed to copy text. Please try selecting and copying manually."
//           )
//         );
//     }
//   };

//   // Clear all content and output
//   const clearAll = (): void => {
//     setContent("");
//     setFormattedOutput("");
//   };

//   return (
//     <div className="container">
//       <h1>Text Formatter</h1>
//       <div className="label">Format your text:</div>
//       <div className="editor-container">
//         <ReactQuill
//           ref={quillRef}
//           value={content}
//           onChange={setContent}
//           modules={{
//             toolbar: [["bold", "italic", "underline"], ["clean"]],
//           }}
//           style={{ height: "20vh", marginBottom: "40px" }}
//         />
//         <div className="word-count">
//           {quillRef.current?.editor?.getText().length || 0} Characters
//         </div>
//       </div>
//       <div className="button-group">
//         <button className="primary-button" onClick={convertFormat}>
//           Convert Format
//         </button>
//         <button className="secondary-button" onClick={copyText}>
//           Copy Text
//         </button>
//         <button className="secondary-button" onClick={clearAll}>
//           Clear
//         </button>
//       </div>
//       <div className="label">Formatted Output:</div>
//       <div className="output">{formattedOutput}</div>
//     </div>
//   );
// };

// export default TextFormatter2;

import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextFormatter2: React.FC = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [content, setContent] = useState<string>("");
  const [formattedOutput, setFormattedOutput] = useState<string>("");

  // Helper function to format characters based on the given format
  const formatChar = (char: string, format: string): string => {
    if (char === " ") return char; // Preserve spaces
    switch (format) {
      case "bold":
        return String.fromCodePoint(char.charCodeAt(0) + 0x1d400 - 0x41); // Mathematical Bold
      case "italic":
        return String.fromCodePoint(char.charCodeAt(0) + 0x1d434 - 0x41); // Mathematical Italic
      case "boldItalic":
        return String.fromCodePoint(char.charCodeAt(0) + 0x1d468 - 0x41); // Mathematical Bold Italic
      default:
        return char;
    }
  };

  // Convert Quill delta to formatted Unicode string
  const convertFormat = (): void => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const delta = quill.getContents();
    let result: string = "";

    delta.ops?.forEach(
      (op: {
        insert?: string;
        attributes?: { bold?: boolean; italic?: boolean; underline?: boolean };
      }) => {
        if (typeof op.insert === "string") {
          const chars: string[] = Array.from(op.insert);
          chars.forEach((char: string) => {
            let formattedChar = char;

            // Handle combinations of formats
            if (op.attributes) {
              if (op.attributes.bold && op.attributes.italic) {
                formattedChar = formatChar(formattedChar, "boldItalic");
              } else if (op.attributes.bold) {
                formattedChar = formatChar(formattedChar, "bold");
              } else if (op.attributes.italic) {
                formattedChar = formatChar(formattedChar, "italic");
              }

              // Handle underline (appended to the formatted character)
              if (op.attributes.underline) {
                formattedChar = formattedChar + "\u0332"; // Combining underline character
              }
            }

            result += formattedChar;
          });
        }
      }
    );

    setFormattedOutput(result);
  };

  // Copy formatted text to clipboard
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

  // Clear all content and output
  const clearAll = (): void => {
    setContent("");
    setFormattedOutput("");
  };

  return (
    <div className="container">
      <h1>Text Formatter</h1>
      <div className="label">Format your text:</div>
      <div className="editor-container">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [["bold", "italic", "underline"], ["clean"]],
          }}
          style={{ height: "20vh", marginBottom: "40px" }}
        />
        <div className="word-count">
          {quillRef.current?.editor?.getText().length || 0} Characters
        </div>
      </div>
      <div className="button-group">
        <button className="primary-button" onClick={convertFormat}>
          Convert Format
        </button>
        <button className="secondary-button" onClick={copyText}>
          Copy Text
        </button>
        <button className="secondary-button" onClick={clearAll}>
          Clear
        </button>
      </div>
      <div className="label">Formatted Output:</div>
      <div className="output">{formattedOutput}</div>
    </div>
  );
};

export default TextFormatter2;
