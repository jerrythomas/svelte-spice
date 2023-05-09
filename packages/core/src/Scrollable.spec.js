import { describe, expect, it, beforeEach } from 'vitest'
import { cleanup, render } from '@testing-library/svelte'

import Scrollable from './Scrollable.svelte'

describe('Scrollable.svelte', () => {
	beforeEach(() => cleanup())

	it('Should render', () => {
		const { container } = render(Scrollable)
		expect(container).toBeTruthy()
		expect(container).toMatchSnapshot()
	})

	it('Should render with custom class', () => {
		const { container } = render(Scrollable, { class: 'custom-class' })
		expect(container).toBeTruthy()
		expect(container).toMatchSnapshot()
	})
})
