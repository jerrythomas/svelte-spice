import { alpha, beta, charlie, delta, echo, foxtrot } from './raw'
const lookup = {
	1: 'One',
	2: 'Two',
	3: 'Three'
}

const whiskey = { id: 3, name: 'Whiskey', lookup_id: 2 }
const tango = { id: 2, name: 'Tango', lookup_id: 1 }
const zulu = { id: 6, name: 'Zulu', lookup_id: 1 }

const items = [alpha, beta, charlie, delta, echo, foxtrot, whiskey, tango, zulu]

const start = [charlie, beta, foxtrot]

const modifications = [
	{
		item: whiskey,
		result: {
			data: {
				unsorted: [whiskey, beta, foxtrot],
				sorted: [beta, foxtrot, whiskey]
			},
			grouped: {
				data: [beta, foxtrot, whiskey],
				unsorted: [
					{ key: '2', name: 'Two', data: [whiskey, foxtrot] },
					{ key: '1', name: 'One', data: [beta] }
				],
				sorted: [
					{ key: '1', name: 'One', data: [beta] },
					{ key: '2', name: 'Two', data: [foxtrot, whiskey] }
				]
			}
		}
	},
	{
		item: tango,
		result: {
			data: {
				unsorted: [whiskey, tango, foxtrot],
				sorted: [foxtrot, tango, whiskey]
			},
			grouped: {
				data: [tango, foxtrot, whiskey],
				unsorted: [
					{ key: '2', name: 'Two', data: [whiskey, foxtrot] },
					{ key: '1', name: 'One', data: [tango] }
				],
				sorted: [
					{ key: '1', name: 'One', data: [tango] },
					{ key: '2', name: 'Two', data: [foxtrot, whiskey] }
				]
			}
		}
	},
	{
		item: zulu,
		result: {
			data: {
				unsorted: [whiskey, tango, zulu],
				sorted: [tango, whiskey, zulu]
			},
			grouped: {
				data: [tango, zulu, whiskey],
				unsorted: [
					{ key: '2', name: 'Two', data: [whiskey] },
					{ key: '1', name: 'One', data: [tango, zulu] }
				],
				sorted: [
					{ key: '1', name: 'One', data: [tango, zulu] },
					{ key: '2', name: 'Two', data: [whiskey] }
				]
			}
		}
	}
]

export default { lookup, items, start, modifications }
