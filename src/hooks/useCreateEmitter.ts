export type EventType = string | symbol;

export type Handler<T = unknown> = (event: T) => void;
export type WildcardHandler<T = Record<string, unknown>> = (
	type: keyof T,
	event: T[keyof T]
) => void;

export type EventHandlerList<T = unknown> = Array<Handler<T>>;
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;

export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
	keyof Events | '*',
	EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
	/**
	 * 事件处理器映射map
	 */
	all: EventHandlerMap<Events>;

	/**
	 * 注册一个事件处理器。
	 * @param type 要监听的事件类型，或 `'*'` 表示所有事件
	 * @param handler 响应给定事件时调用的函数
	 */
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
	on(type: '*', handler: WildcardHandler<Events>): void;

	/**
	 * 移除指定事件处理器。
	 * 如果省略 `handler`，则移除给定类型的所有处理器。
	 * @param type 要取消注册 `handler` 的事件类型（`'*'` 用于移除通配符处理器）
	 * @param handler 要移除的处理函数
	 */
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
	off(type: '*', handler: WildcardHandler<Events>): void;

	/**
	 * 调用给定类型的所有处理器。
	 * 如果存在，`'*'` 处理器将在类型匹配的处理器之后被调用。
	 *
	 * 注意：不支持手动触发 '*' 处理器。
	 *
	 * @param type 要调用的事件类型
	 * @param event 传递给每个处理器的任意值（推荐使用对象，功能强大）
	 */
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
	emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}

/**
 * 创建一个事件发射器
 * @param all - 事件处理器映射map
 * @example
 * ```ts
 * const emitter = useCreateEmitter<{
 *  name: string
 *  age: number
 * }>()
 *
 * const evt = e => { console.log(e) }
 * emitter.on('name', evt)
 * emitter.emit('name', 'Jaye')
 * emitter.off('name', evt) || emitter.off('name')
 * emitter.all.clear() // 移除所有事件
 * ```
 */
export default function useCreateEmitter<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>
): Emitter<Events> {
	type GenericEventHandler =
		| Handler<Events[keyof Events]>
		| WildcardHandler<Events>;
	all = all || new Map()

	return {
	  all,

	  on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
	    const handlers: Array<GenericEventHandler> | undefined = all!.get(type)
	    handlers
	      ? handlers.push(handler)
	      : all.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
	  },

	  off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
	    const handlers: Array<GenericEventHandler> | undefined = all.get(type)
	    if (handlers) {
	      handler
				 ? handlers.splice(handlers.indexOf(handler) >>> 0, 1)
				 : all.delete(type)
	    }
	  },

	  emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
	    (all.get(type) as EventHandlerList<Events[keyof Events]>)
	      ?.forEach((handler) => {
	        handler(evt!)
	      })

	    ;(all.get('*') as WildCardEventHandlerList<Events>)
	      ?.forEach((handler) => {
	        handler(type, evt!)
	      })
	  }
	}
}
