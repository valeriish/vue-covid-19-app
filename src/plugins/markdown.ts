import type { Ref } from 'vue'
import MarkdownIt from 'markdown-it'

/**
 * Add markdown directive to Application
 */
export default {
  install: (app: any) => {
    const md = new MarkdownIt()

    app.directive('markdown', (el: HTMLElement, binding: Ref) => {
      el.innerHTML = md.render(binding.value)
    })
  }
}
