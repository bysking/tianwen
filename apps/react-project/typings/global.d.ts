declare module "process" {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        BASE_ENV: "development" | "test" | "production";
        NODE_ENV: "development" | "production";
      }
    }
  }
}

// src/typings/global.d.ts

/* CSS MODULES */
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.less" {
  const classes: { [key: string]: string };
  export default classes;
}
