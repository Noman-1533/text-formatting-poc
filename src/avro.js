// avro.js (Modified for React)
import OmicronLab from "./avro-lib";
const AvroPhonetic = {
  init: function (element, options, callback) {
    const defaults = {
      bangla: true,
    };

    if (options) {
      Object.assign(defaults, options);
    }

    if ("bangla" in element) {
      return;
    }

    element.bangla = defaults.bangla;
    element.callback = callback || function () {};

    element.addEventListener("keydown", this.keydown.bind(this));
    element.addEventListener("focus", this.focus.bind(this));
    this.ready(element);
  },

  notify: function (element) {
    if (element.callback) {
      element.callback(element.bangla);
    }
  },

  switchKb: function (element, state) {
    if (typeof state === "undefined") {
      state = !element.bangla;
    }
    element.bangla = state;
    this.notify(element);
  },

  focus: function (event) {
    this.notify(event.target);
  },

  ready: function (element) {
    this.notify(element);
  },

  keydown: function (event) {
    const keycode = event.which;
    const element = event.target;

    if (keycode === 77 && event.ctrlKey && !event.altKey && !event.shiftKey) {
      this.switchKb(element, !element.bangla);
      event.preventDefault();
      return false;
    }

    if (!element.bangla) {
      return;
    }

    if (keycode === 32 || keycode === 13 || keycode === 9) {
      this.replace(element);
    }
  },

  replace: function (element) {
    const cur = this.getCaret(element);
    const last = this.findLast(element, cur);
    const bangla = OmicronLab.Avro.Phonetic.parse(
      element.value.substring(last, cur)
    );

    element.value =
      element.value.substring(0, last) + bangla + element.value.substring(cur);
    element.selectionStart = element.selectionEnd =
      cur - (Math.abs(cur - last) - bangla.length);
  },

  findLast: function (element, cur) {
    let last = cur - 1;
    while (last > 0) {
      const c = element.value.charAt(last);
      if (c.trim() === "") {
        break;
      }
      last--;
    }
    return last;
  },

  getCaret: function (element) {
    if (element.selectionStart) {
      return element.selectionStart;
    }
    return 0;
  },
  replaceSelectedText: function (element, start, end) {
    console.log("from avro", typeof element);
    if (typeof element === "string") {
      console.log("string");
      const selectedText = element;
      console.log("selected text", element);
      const bangla = OmicronLab.Avro.Phonetic.parse(selectedText);
      console.log("bangla", bangla);
      // Replace the selected text with the converted Bangla text
      // element.value =
      //   element.value?.substring(0, start) +
      //   bangla +
      //   element.value?.substring(end);

      // Update the cursor position
      element = bangla;
      return element;
    } else console.log("object type", typeof element);
  },
};

export default AvroPhonetic;
