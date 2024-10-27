import { type InjectionKey, inject, provide } from 'vue'

/**
 * @param providerComponentName 提供 context 的组件名称。在某些情况下，context 可能来自多个组件，在这种情况下，您可能需要给出一系列组件名称以提供您的 context，这时需要使用数组而不是一个字符串
 * @param contextName injection key symbol 的描述.
 */
export function useCreateContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string
) {
  const symbolDescription =
    typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription)

  /**
   * @param fallback 如果 injection 失败，将返回的 context 值。
   * @throws 当 context injection失败并且未指定 fallback 时，当注入 context 的组件不是提供 context 的根组件的子组件时，就会发生这种情况.
   */
  const injectContext = <
    T extends ContextValue | null | undefined = ContextValue,
  >(
      fallback?: T
    ): T extends null ? ContextValue | null : ContextValue => {
    const context = inject(injectionKey, fallback)

    if (context) { return context }

    if (context === null) { return context as any }

    throw new Error(
      `注入的 \`${injectionKey.toString()}\` 没有找到. 组件必须使用在 ${
        Array.isArray(providerComponentName)
          ? `以下组件之一中: ${providerComponentName.join(', ')}`
          : `\`${providerComponentName}\` 组件中`
      }`
    )
  }

  const provideContext = (contextValue: ContextValue) => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}
