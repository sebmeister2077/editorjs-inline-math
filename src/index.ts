import { API, InlineTool, InlineToolConstructable, InlineToolConstructorOptions, SanitizerConfig } from '@editorjs/editorjs'
import { MATH_ICON } from './icons'

export default class TestTool implements InlineTool {
    shortcut?: string | undefined
    public static get isInline() {
        return true
    }
    sanitize?: SanitizerConfig | undefined
    public static get title() {
        return 'Math'
    }
    private api: API
    private tag: string
    constructor({ api, config }: InlineToolConstructorOptions) {
        this.api = api
        this.tag = 'span'
    }
    public render(): HTMLElement {
        return new DOMParser().parseFromString(
            /*html */ `
            <button type='button' class='${this.api.styles.inlineToolButton}'>
            ${MATH_ICON}
        </button>`,
            'text/html',
        ).body.firstChild as HTMLElement
    }
    public surround(range: Range): void {
        if (!range) return
        const termWrapper = this.api.selection.findParentTag(this.tag)

        if (termWrapper) this.unwrap(range)
        else this.wrap(range)
    }
    public checkState(selection: Selection): boolean {
        return Boolean(this.api.selection.findParentTag(this.tag))
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
    private get CSS() {
        return {
            inlineMath: 'editorjs-inline-math',
        }
    }

    private wrap(range: Range) {
        const selectedText = range.extractContents()

        const mathContainer = new DOMParser().parseFromString(
            /*html*/ `
        <${this.tag} contenteditable='false'>
            <math-field virtual-keyboard-mode='onfocus'
            keypress-sound='none'
            plonk-sound='none'
            class='${this.CSS.inlineMath}'>
            ${selectedText.textContent}
            </math-field>
            <span>&nbsp;</span>
        </${this.tag}>
        `,
            'text/html',
        ).body.firstChild as HTMLElement

        range.insertNode(mathContainer)

        const formula = mathContainer.querySelector('math-field') as HTMLInputElement
        formula.addEventListener('blur', (e) => {
            formula.textContent = formula.value
        })

        this.api.selection.expandToTag(formula)
    }

    private unwrap(range: Range) {
        const formula = this.api.selection.findParentTag(this.tag, this.CSS.inlineMath)
        const text = range.extractContents()

        formula?.remove()
        range.insertNode(text)
    }
}
