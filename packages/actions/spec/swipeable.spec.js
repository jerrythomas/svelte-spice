import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { swipeable } from '../src/swipeable'
import {
	getMockNode,
	toUseHandlersFor,
	toOnlyTrigger,
	simulateTouchSwipe,
	simulateMouseSwipe
} from 'validators'

expect.extend({ toUseHandlersFor, toOnlyTrigger })

describe('swipable', () => {
	const events = ['touchstart', 'touchend', 'mousedown', 'mouseup']
	let node
	let handlers = {}

	beforeEach(() => {
		node = document.createElement('div')
		handlers = {
			swipeLeft: vi.fn(),
			swipeRight: vi.fn(),
			swipeUp: vi.fn(),
			swipeDown: vi.fn()
		}

		global.Touch = vi.fn().mockImplementation((input) => input)
		Object.entries(handlers).map(([event, handler]) =>
			node.addEventListener(event, handler)
		)
	})

	afterEach(() => {
		Object.entries(handlers).map(([event, handler]) =>
			node.removeEventListener(event, handler)
		)
	})

	it('should cleanup events on destroy', () => {
		expect(swipeable).toUseHandlersFor({}, events)
		expect(swipeable).toUseHandlersFor(
			{ horizontal: false, vertical: true },
			events
		)
	})
	it.each(events)('should not register %s when disabled', (event) => {
		expect(swipeable).not.toUseHandlersFor({ enabled: false }, event)
	})

	it('should dispatch swipeRight event', () => {
		const handle = swipeable(node)

		simulateTouchSwipe(node, { x: 100, y: 10 })
		expect(handlers).toOnlyTrigger('swipeRight')
		simulateMouseSwipe(node, { x: 100, y: 10 })
		expect(handlers).toOnlyTrigger('swipeRight')

		simulateTouchSwipe(node, { x: 90, y: 10 })
		expect(handlers.swipeRight).toHaveBeenCalledTimes(1)
		simulateMouseSwipe(node, { x: 90, y: 10 })
		expect(handlers.swipeRight).toHaveBeenCalledTimes(1)

		handle.destroy()
	})

	it('should dispatch swipeLeft event', () => {
		const handle = swipeable(node)

		simulateTouchSwipe(node, { x: -100, y: 10 })
		expect(handlers).toOnlyTrigger('swipeLeft')
		simulateMouseSwipe(node, { x: -100, y: 10 })
		expect(handlers).toOnlyTrigger('swipeLeft')

		handle.destroy()
	})
	it('should not dispatch swipeLeft event', () => {
		const handle = swipeable(node)

		simulateTouchSwipe(node, { x: -90, y: 10 })
		expect(handlers.swipeLeft).not.toHaveBeenCalled()
		simulateMouseSwipe(node, { x: -90, y: 10 })
		expect(handlers.swipeLeft).not.toHaveBeenCalled()

		handle.destroy()
	})

	it('should dispatch swipeUp event', () => {
		const handle = swipeable(node, { vertical: true, threshold: 100 })

		simulateTouchSwipe(node, { x: 10, y: -100 })
		expect(handlers).toOnlyTrigger('swipeUp')
		simulateMouseSwipe(node, { x: 10, y: -100 })
		expect(handlers).toOnlyTrigger('swipeUp')
		simulateMouseSwipe(node, { x: 10, y: -90 })
		expect(handlers.swipeUp).toHaveBeenCalledTimes(1)

		handle.destroy()
	})

	it('should dispatch swipeDown event', () => {
		const handle = swipeable(node, { vertical: true, horizontal: false })

		simulateTouchSwipe(node, { x: 10, y: 100 })
		expect(handlers).toOnlyTrigger('swipeDown')
		expect(handlers.swipeDown).toHaveBeenCalledTimes(1)
		simulateMouseSwipe(node, { x: 10, y: 100 })
		expect(handlers).toOnlyTrigger('swipeDown')
		expect(handlers.swipeDown).toHaveBeenCalledTimes(1)
		simulateMouseSwipe(node, { x: 10, y: 90 })
		expect(handlers.swipeDown).toHaveBeenCalledTimes(1)

		handle.destroy()
	})

	it('should switch between enabled and disabled', () => {
		const mock = getMockNode(events)
		const handle = swipeable(mock.node)

		events.forEach((event) => expect(mock.listeners[event]).toBe(1))

		// repeat calls should not call addEventListener again
		handle.update({ enabled: true })
		events.forEach((event) => expect(mock.listeners[event]).toBe(1))

		// disabling should remove all event listeners
		handle.update({ enabled: false })
		events.forEach((event) => expect(mock.listeners[event]).toBe(0))

		// repeat calls should not call removeEventListener again
		handle.update({ enabled: false })
		events.forEach((event) => expect(mock.listeners[event]).toBe(0))
	})
})
