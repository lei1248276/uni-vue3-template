import type { Plugin } from 'vite'

type Options = {
  include?: string[]
}

export default function removeConsole({
  include = ['js', 'ts', 'vue', 'nvue']
}: Options = {}): Plugin {
  return {
    name: 'vite-plugin-remove-console',
    enforce: 'pre',
    apply: 'build',
    transform(code, id) {
      if (include.some(ext => id.endsWith('.' + ext))) {
        const modifiedCode = code
          .replace(
            /\bconsole\./g,
            'import.meta.env.DEV && console.'
          )
        return {
          code: modifiedCode,
          map: null
        }
      }
      return null
    }
  }
}
