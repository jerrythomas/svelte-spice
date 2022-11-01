const ROOT = '/'

const __base__ = Symbol('base')
const __roles__ = Symbol('roles')
const __routes__ = Symbol('routes')
const __allowedRoutes__ = Symbol('allowed-routes')
const __authenticated__ = Symbol('authenticated')

export class Router {
	constructor(options) {
		options = options || {}
		this[__base__] = {
			homePage: ROOT,
			loginPage: '/auth',
			loginEndpoint: '/auth/signin',
			logoutEndpoint: '/auth/logout',
			sessionEndpoint: '/auth/session'
		}
		this[__routes__] = {
			public: [],
			authenticated: []
		}

		this[__authenticated__] = false
		this[__allowedRoutes__] = []

		this[__roles__] = null

		Object.keys(this[__base__]).map((key) => {
			if (key in options) this[__base__][key] = options[key]
		})

		const routes = Object.assign(this[__routes__], options.routes || {})
		Object.keys(routes).map((role) => {
			this.add(role, routes[role])
		})
	}

	get homePage() {
		return this[__base__].homePage
	}
	get loginPage() {
		return this[__base__].loginPage
	}
	get logoutEndpoint() {
		return this[__base__].logoutEndpoint
	}
	get sessionEndpoint() {
		return this[__base__].sessionEndpoint
	}
	get loginEndpoint() {
		return this[__base__].loginEndpoint
	}
	get routes() {
		return this[__routes__]
	}
	get isAuthenticated() {
		return this[__authenticated__]
	}
	get allowedRoutes() {
		return this[__allowedRoutes__]
	}

	/**
	 * @param {string|string[]} roles
	 */
	set authRoles(roles) {
		this[__authenticated__] = roles && roles !== '' ? true : false
		this[__roles__] = (Array.isArray(roles) ? roles : [roles]).filter(
			(role) => role && role !== ''
		)
		this[__roles__] = ['public', ...this[__roles__]]
		this[__allowedRoutes__] = []

		if (this[__authenticated__]) {
			this[__roles__].map((role) => {
				if (role in this.routes)
					this[__allowedRoutes__] = [
						...this[__allowedRoutes__],
						...this.routes[role]
					]
			})

			this[__allowedRoutes__] = [
				...new Set([...this[__allowedRoutes__], this.logout, this.session])
			]
				.filter((route) => route !== this.login && route !== this.authUrl)
				.sort()
		} else {
			this[__allowedRoutes__] = this.routes['public']
		}
	}

	add(role, routes) {
		if (role === 'public') {
			let publicRoutes = [
				this.loginPage,
				this.loginEndpoint,
				this.sessionEndpoint
			]
			publicRoutes = [...new Set([...publicRoutes, ...routes])]
			this[__routes__][role] = publicRoutes.sort()
		} else {
			this[__routes__][role] = [...new Set([...routes, this.homePage])].sort()
		}
		// Remove child routes if parent is already in the list
		for (let i = 0; i < this[__routes__][role].length; i++) {
			const current = this[__routes__][role][i]
			for (let j = i + 1; j < this[__routes__][role].length; j++) {
				while (
					j < this[__routes__][role].length &&
					this[__routes__][role][j].startsWith(current + '/')
				) {
					this[__routes__][role].splice(j, 1)
				}
			}
		}
	}

	/**
	 *
	 * @param {string} route
	 * @returns {string}
	 */
	redirect(route) {
		let isAllowed = false

		if (route !== this.logoutEndpoint || this.isAuthenticated) {
			for (let i = 0; i < this.allowedRoutes.length && !isAllowed; i++) {
				isAllowed =
					route === this.allowedRoutes[i] ||
					route.startsWith(this.allowedRoutes[i] + '/')
			}
		}
		return isAllowed
			? route
			: this[__authenticated__]
			? this.homePage
			: this.loginPage
	}
}
