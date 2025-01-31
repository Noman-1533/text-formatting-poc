// import { useState, useRef } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// // import "./TextFormatter.css";

// const TextFormatter = () => {
//   const [content, setContent] = useState<string>("");
//   const [formattedOutput, setFormattedOutput] = useState<string>("");
//   const quillRef = useRef<ReactQuill>(null);
//   const Font = Quill.import("formats/font");
//   Font.whitelist = ["Sans Serif", "Lobster", "Raleway", "bangla"];
//   Quill.register(Font, true);
//   const modules = {
//     toolbar: [
//       [{ font: Font.whitelist }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["clean"],
//     ],
//   };

//   const normalChars: string[] = Array.from(
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
//   );
//   const boldChars: string[] = Array.from(
//     "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
//   );
//   const italicChars: string[] = Array.from(
//     "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789"
//   );
//   const boldItalicChars: string[] = Array.from(
//     "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
//   );

//   const formatChar = (
//     char: string,
//     format: "bold" | "italic" | "boldItalic"
//   ): string => {
//     const index: number = normalChars.indexOf(char);
//     if (index === -1) return char;

//     switch (format) {
//       case "bold":
//         return boldChars[index];
//       case "italic":
//         return italicChars[index];
//       case "boldItalic":
//         return boldItalicChars[index];
//       default:
//         return char;
//     }
//   };

//   const convertFormat = (): void => {
//     const quill = quillRef.current?.getEditor();
//     if (!quill) return;

//     const delta = quill.getContents();
//     let result: string = "";
//     console.log("delta is", delta);
//     delta.ops?.forEach(
//       (op: {
//         insert?: string;
//         attributes?: { bold?: boolean; italic?: boolean; underline?: boolean };
//       }) => {
//         if (typeof op.insert === "string") {
//           const chars: string[] = Array.from(op.insert);
//           chars.forEach((char: string) => {
//             if (op.attributes) {
//               if (op.attributes.bold && op.attributes.italic) {
//                 char = formatChar(char, "boldItalic");
//               } else if (op.attributes.bold) {
//                 char = formatChar(char, "bold");
//               } else if (op.attributes.italic) {
//                 char = formatChar(char, "italic");
//               }
//               if (op.attributes.underline) {
//                 char = char + "\u0332";
//               }
//             }
//             result += char;
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
//           modules={modules} // Use the updated modules
//           formats={["font", "bold", "italic", "underline", "list", "bullet"]}
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

// export default TextFormatter;

import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextFormatter = () => {
  const [content, setContent] = useState<string>("");
  const [formattedOutput, setFormattedOutput] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  const Font = Quill.import("formats/font");
  Font.whitelist = ["Sans Serif", "Lobster", "Raleway", "bangla"];
  Quill.register(Font, true);

  const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
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

  // Add font-specific Unicode characters
  const fontMappings: { [key: string]: string[] } = {
    "Sans Serif": normalChars,
    Lobster: Array.from(
      "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    ),
    Raleway: Array.from(
      "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
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
          modules={modules}
          formats={["font", "bold", "italic", "underline", "list", "bullet"]}
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

export default TextFormatter;
