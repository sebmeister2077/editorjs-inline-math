import { API, InlineTool, InlineToolConstructable, InlineToolConstructorOptions, SanitizerConfig } from '@editorjs/editorjs'

export default class TestTool implements InlineTool {
    shortcut?: string | undefined
    static get isInline() {
        return true
    }
    sanitize?: SanitizerConfig | undefined
    static get title() {
        return 'Math'
    }
    private api: API
    constructor({ api, config }: InlineToolConstructorOptions) {
        this.api = api
    }
    render(): HTMLElement {
        return new DOMParser().parseFromString(
            /*html */ `
            <button type='button' class='${this.api.styles.inlineToolButton}'>
            
        </button>`,
            'text/html',
        ).body.firstChild as HTMLElement
    }
    surround(range: Range): void {
        // throw new Error('Method not implemented.')
    }
    checkState(selection: Selection): boolean {
        // throw new Error('Method not implemented.')
        return true
    }
    // renderActions?(): HTMLElement {
    //     throw new Error('Method not implemented.')
    // }
    // clear?(): void {
    //     throw new Error('Method not implemented.')
    // }

    // prepare?(data: { toolName: string; config: any }): void | Promise<void> {
    //     throw new Error('Method not implemented.')
    // }
    // reset?(): void | Promise<void> {
    //     throw new Error('Method not implemented.')
    // }
}
