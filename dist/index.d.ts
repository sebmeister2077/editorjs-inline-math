import { type API, type InlineTool, type InlineToolConstructorOptions, type SanitizerConfig } from '@editorjs/editorjs';
import { MathfieldElement } from 'mathlive';
import './index.css';
export type InlineMathConfig = {
    mode: 'onfocus' | 'manual';
    allowSpace: boolean;
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
    /** Bind event listeners to the formula elements */
    static hydrate(api: Pick<API, 'blocks'>, ...elements: HTMLElement[]): void;
    /** Use this method to toggle the readonly state of the formulas inside of the editor */
    static toggleReadonly(editorHolderOrFormula: string | MathfieldElement, value?: boolean): void;
    private get CSS();
    private wrap;
    private unwrap;
    private static getElementBlockId;
    private static tryDispatchChangeForBlock;
}
