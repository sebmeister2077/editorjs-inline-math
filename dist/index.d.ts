import { InlineTool, InlineToolConstructorOptions, SanitizerConfig } from '@editorjs/editorjs';
export default class TestTool implements InlineTool {
    shortcut?: string | undefined;
    static get isInline(): boolean;
    sanitize?: SanitizerConfig | undefined;
    static get title(): string;
    private api;
    private tag;
    constructor({ api, config }: InlineToolConstructorOptions);
    render(): HTMLElement;
    surround(range: Range): void;
    checkState(selection: Selection): boolean;
    private get CSS();
    private wrap;
    private unwrap;
}
