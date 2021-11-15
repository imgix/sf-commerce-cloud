// subscribe:Interface
export type SandboxSubscribe = (
  type: string,
  callback: (
    payload: {
      // value is user defined, can be anything
      value: Object;
      // config is user defined, can be anything
      config: {
        [key: string]: any;
      };
      isRequired: boolean;
      isDisabled: boolean;
      isValid: boolean;
      dataLocale: string;
      displayLocale: string;
    },
    context?: SandboxContext
  ) => void,
  source?: any
) => () => void;

export interface SandboxContext {
  transfer?: Transferable[]; // @see https://developer.mozilla.org/en-US/docs/Web/API/Transferable
  source?: any; // Event sourcing should only be required in rare cases
}
