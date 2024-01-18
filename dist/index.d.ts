import { type API, type InlineTool, type InlineToolConstructorOptions, type SanitizerConfig } from '@editorjs/editorjs';
import './index.css';
export type InlineMathConfig = {
    mode: 'virtual-keyboard-focus' | 'virtual-keyboard-manual' | 'toolbar-input';
};
export default class InlineMath implements InlineTool {
    static get isInline(): boolean;
    static get title(): string;
    private api;
    private tag;
    private config;
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
