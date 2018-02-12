declare namespace process {
  export namespace env {
    export const NODE_ENV: string;
  }
}

interface Window {
  store: any;
}

declare namespace app {
  export const apiBasePath: string;
}

declare module "react-intl"
declare module "react-intl/locale-data/zh"
declare module "react-intl/locale-data/en"
