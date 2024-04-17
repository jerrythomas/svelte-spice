import { describe, it, expect } from 'vitest'
// skipcq: JS-C1003 - Importing all components for verification
import * as utilities from '../src'

describe('utilities', () => {
	it('should contain all exported utilities', () => {
		expect(Object.keys(utilities)).toEqual([
			'defaultColors',
			'syntaxColors',
			'shades',
			'defaultPalette',
			'defaultFields',
			'defaultIcons',
			'defaultOptions',
			'defaultKeyMap',
			'defaultThemeMapping',
			'stateIconsFromNames',
			'defaultStateIcons',
			'flattenNestedList',
			'findValueFromPath',
			'getComponent',
			'getIcon',
			'getValue',
			'getText',
			'getFormattedText',
			'getAttribute',
			'hasChildren',
			'isExpanded',
			'isNested',
			'findItemByValue',
			'findItemByIndexArray',
			'findNearestItemBefore',
			'findLastVisibleChild',
			'findNearestItemAfter',
			'mappedList',
			'getLineTypes',
			'generateTicks',
			'weekdays',
			'getCalendarDays',
			'noop',
			'id',
			'isObject',
			'toString',
			'iconShortcuts',
			'scaledPath',
			'shadesOf',
			'stateColors',
			'themeColors',
			'contrastColors',
			'themeRules',
			'getRegex',
			'parseFilters',
			'toInitCapCase',
			'toPascalCase',
			'toHyphenCase',
			'sortByParts',
			'compareStrings',
			'uniqueId',
			'compact',
			'toHexString'
		])
	})
})
