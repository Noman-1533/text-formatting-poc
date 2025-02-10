export {};

declare global {
  interface Window {
    Avro: {
      init: () => void;
      setup: () => void;
      phonetic: (input: string) => string;
    };
  }
}
