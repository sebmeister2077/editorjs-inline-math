import { InlineTool, InlineToolConstructorOptions, SanitizerConfig } from '@editorjs/editorjs';
import 'mathlive';
import './index.css';
export default class MathTool implements InlineTool {
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
    private get CSS();
    private wrap;
    private unwrap;
}
