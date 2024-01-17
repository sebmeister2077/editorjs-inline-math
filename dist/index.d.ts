import { API, InlineTool, InlineToolConstructorOptions, SanitizerConfig } from '@editorjs/editorjs';
import './index.css';
export default class InlineMath implements InlineTool {
    shortcut?: string | undefined;
    static get isInline(): boolean;
    static get title(): string;
    private api;
    private tag;
    constructor({ api, config }: InlineToolConstructorOptions);
    render(): HTMLElement;
    surround(range: Range): void;
    checkState(selection: Selection): boolean;
    static get sanitize(): SanitizerConfig;
    static hydrate(api: Pick<API, 'blocks'>, ...elements: HTMLElement[]): void;
    private get CSS();
    private wrap;
    private unwrap;
    private static getElementBlockId;
}
