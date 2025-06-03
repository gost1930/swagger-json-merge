export interface MergeOptions {
    base: string;
    folder: string;
  }
  
  export interface SwaggerPaths {
    [path: string]: any;
  }
  
  export interface SwaggerBase {
    paths: SwaggerPaths;
    [key: string]: any;
  }
  
  /**
   * Merge function: accepts options and returns a Promise resolving
   * to the merged SwaggerBase object.
   */
  export function merge(options: MergeOptions): Promise<SwaggerBase>;
  
  /**
   * Convert JSON object to YAML string.
   */
  export function toYAML(json: object): string;
  