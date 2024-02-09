import { defaultThemeMapping, defaultColors, themeRules } from '@rokkit/core'

export const colors = {
	...defaultColors,
	shark: {
		DEFAULT: '#677287',
		50: '#ffffff',
		100: '#efefef',
		200: '#E0E0E0',
		300: '#C1C6D0',
		400: '#828C9F',
		500: '#677287',
		600: '#51596A',
		700: '#3B414D',
		800: '#2E323C',
		900: '#20242A',
		950: '#1A1C22'
	},
	norway: {
		DEFAULT: '#83A666',
		50: '#E1EADA',
		100: '#D7E2CE',
		200: '#C2D3B4',
		300: '#ADC49A',
		400: '#98B580',
		500: '#83A666',
		600: '#6F9054',
		700: '#5B7645',
		800: '#475C36',
		900: '#334227',
		950: '#29361F'
	}
}
const mapping = {
	...defaultThemeMapping,
	neutral: 'shark',
	pass: 'norway'
}
export const palette = themeRules('rokkit', mapping, colors)
