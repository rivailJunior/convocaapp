declare module 'expo-file-system/next' {
  export class Paths {
    static get cache(): Directory;
    static get document(): Directory;
    static get bundle(): Directory;
    static join(...parts: (string | File | Directory)[]): string;
  }

  export class File {
    constructor(...uris: (string | File | Directory)[]);
    readonly uri: string;
    readonly name: string;
    readonly extension: string;
    readonly parentDirectory: Directory;
    write(content: string): void;
    text(): string;
    exists: boolean;
    delete(): void;
    create(): void;
  }

  export class Directory {
    constructor(...uris: (string | Directory)[]);
    readonly uri: string;
    exists: boolean;
    create(): void;
    delete(): void;
  }
}
