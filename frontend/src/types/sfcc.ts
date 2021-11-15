// subscribe:Interface
export type SandboxSubscribe<Config extends Record<string, any>> = (
  type: string,
  callback: (
    payload: {
      // config and value are user defined, can be anything
      value: Object;
      config: Config;
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
