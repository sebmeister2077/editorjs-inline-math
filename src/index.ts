import { type API, type InlineTool, type InlineToolConstructorOptions, type SanitizerConfig } from '@editorjs/editorjs'
import { MATH_ICON } from './icons'
import { MathfieldElement } from 'mathlive'
import './index.css'

export type InlineMathConfig = {
    mode: 'onfocus' | 'manual'
}
export default class InlineMath implements InlineTool {
    public static get isInline() {
        return true
    }
    public static get title() {
        return 'Math'
    }

    private api: API
    private tag: string = 'span'
    private config: InlineMathConfig
    constructor({ api, config }: InlineToolConstructorOptions) {
        this.api = api
        const defaultConfig: Partial<InlineMathConfig> = {
            mode: 'onfocus',
        }
        this.config = { ...defaultConfig, ...(config ?? {}) }
    }
    public render(): HTMLElement {
        return new DOMParser().parseFromString(
            /*html */ `
        <button type='button' class='${this.api.styles.inlineToolButton}'>
            ${MATH_ICON}
        </button>`,
            'text/html',
        ).body.firstElementChild as HTMLElement
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

    public static get sanitize(): SanitizerConfig {
        return {
            'math-field': {
                'keypress-sound': true,
                'virtual-keyboard-mode': true,
                'plonk-sound': true,
                class: true,
            },
        }
    }

    public static hydrate(api: Pick<API, 'blocks'>, ...elements: HTMLElement[]) {
        const allFormulas = elements.length ? elements : document.querySelectorAll('math-field')
        allFormulas.forEach((el) => {
            if (!(el instanceof MathfieldElement)) return
            el.addEventListener('input', (e) => {
                el.textContent = el.value
            })
            el.addEventListener('blur', () => {
                const blockId = InlineMath.getElementBlockId(el)
                if (!blockId) {
                    console.warn(
                        "Parent block not found for <math-field/>, can't propagate changes to editor. This may occur if you hydrate an element that is not inside your editor.",
                    )
                    return
                }
                api.blocks.getById(blockId)?.dispatchChange()
            })
        })
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

        const mathContainer = document.createElement(this.tag)
        mathContainer.setAttribute('contenteditable', 'false')

        const formulaElement = new MathfieldElement({ virtualKeyboardMode: this.config.mode, plonkSound: 'none', keypressSound: 'none' })

        formulaElement.classList.add(this.CSS.inlineMath)
        formulaElement.textContent = selectedText.textContent
        mathContainer.append(formulaElement)

        const spanAfter = document.createElement('span')
        spanAfter.innerHTML = '&nbsp;'

        mathContainer.append(spanAfter)
        range.insertNode(mathContainer)

        InlineMath.hydrate(this.api, formulaElement)

        this.api.selection.expandToTag(formulaElement)
    }

    private unwrap(range: Range) {
        const formula = this.api.selection.findParentTag(this.tag, this.CSS.inlineMath)
        const text = range.extractContents()

        formula?.remove()
        range.insertNode(text)
    }

    private static getElementBlockId(element: HTMLElement): string | null {
        let el: HTMLElement = element
        const blockIdAttributeName = 'data-id'

        const isBlockElement = (el: HTMLElement) => el.classList.contains('ce-block') && el.hasAttribute(blockIdAttributeName)
        while (el && !isBlockElement(el) && el.parentElement) {
            el = el.parentElement
        }
        if (!el) return null

        const blockId = el.parentElement?.getAttribute(blockIdAttributeName)
        if (!blockId) return null
        return blockId
    }
}
