// // useAvro.ts
// import { useEffect, RefObject } from "react";
// import AvroPhonetic from "./avro";

// const useAvro = (
//   elementRef: RefObject<HTMLElement>,
//   options: { bangla: boolean } = { bangla: false }
// ) => {
//   useEffect(() => {
//     if (elementRef.current) {
//       AvroPhonetic.init(elementRef.current, options);
//     }
//   }, [elementRef, options]);

//   return null;
// };

// export default useAvro;

// useAvro.ts
// import { useEffect, RefObject } from "react";
// import AvroPhonetic from "./avro";
// // import OmicronLab from "./avro-lib";

// const useAvro = (
//   quillRef: RefObject<any>, // Ref to the Quill editor instance
//   options: { bangla: boolean; fontName?: string } = {
//     bangla: false,
//     fontName: "default",
//   }
// ) => {
//   useEffect(() => {
//     if (quillRef.current && options.bangla) {
//       const quill = quillRef.current.getEditor();

//       // Listen for text changes
//       quill.on("text-change", () => {
//         console.log(
//           "useAvro is called with",
//           quillRef,
//           options.bangla,
//           "from quill"
//         );
//         const selection = quill.getSelection();
//         if (selection) {
//           const text = quill.getText(selection.index, selection.length);

//           // Check if the selected text has the Bangla font
//           const formats = quill.getFormat(selection.index, selection.length);
//           if (formats.font === "bangla") {
//             const convertedText = AvroPhonetic.replaceSelectedText(
//               text,
//               selection.index,
//               selection.length
//             );
//             console.log("converted text", convertedText);
//             quill.deleteText(selection.index, selection.length); // Remove the original text
//             quill.insertText(selection.index, convertedText); // Insert the converted text
//           }
//         }
//       });
//     }
//   }, [options]);

//   return null;
// };

// export default useAvro;

import { RefObject, useEffect } from "react";
import AvroPhonetic from "./avro";

const useAvro = (
  quillRef: RefObject<any>,
  options: { bangla: boolean; fontName?: string } = {
    bangla: false,
    fontName: "default",
  }
) => {
  useEffect(() => {
    if (quillRef.current && options.bangla) {
      const quill = quillRef.current.getEditor();

      let isProcessing = false; // Flag to prevent recursive calls

      const handleTextChange = () => {
        if (isProcessing) return; // Skip if already processing
        isProcessing = true; // Set flag to true

        const selection = quill.getSelection();
        if (selection) {
          const text = quill.getText(selection.index, selection.length);

          // Check if the selected text has the Bangla font
          const formats = quill.getFormat(selection.index, selection.length);
          if (formats.font === "bangla") {
            const convertedText = AvroPhonetic.replaceSelectedText(
              text,
              selection.index,
              selection.length
            );
            console.log("converted text", convertedText);
            quill.deleteText(selection.index, selection.length); // Remove the original text
            quill.insertText(selection.index, convertedText); // Insert the converted text
            // if (options.fontName) {
            //   quill.root.style.fontFamily = options.fontName; // Set font family
            quill.root.style.fontFamily = "bangla"; // Set font family
            // }
          }
        }

        isProcessing = false; // Reset flag after processing
      };

      quill.on("text-change", handleTextChange);

      // Cleanup the event listener on unmount
      return () => {
        quill.off("text-change", handleTextChange);
      };
    }
  }, [options.bangla, quillRef]);

  return null;
};

export default useAvro;
