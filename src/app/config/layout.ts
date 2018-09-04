export class LayoutConfig {
	public config: any = {
		demo: 'default',

		// == BASE LAYOUT
		self: {
			layout: 'fluid', // Tipo de ancho de la página: fluid|boxed
			//background: './assets/images/bg/bg-4.jpg' // boxed layout background
		},

		// == PAGE LOADER SPLASH
		loader: {
			enabled: true, // HABILITAR SPLAH
			image: './assets/images/logo/logo_large.png'
		},

		// == HEADER
		header: {
			// Header itself
			self: {
				// Fixed header(sticky) mode
				fixed: {
					desktop: true, // Enable fixed mode for desktop
					mobile: true, // Enable fixed mode for mobile

					// Minimize header on scroll
					minimize: {
						// Desktop mode
						desktop: {
							enabled: false, // Enable header minimize for desktop mode
							offset: 200 // Offset(in px) to start header minimization
						},
						// Mobile mode
						mobile: {
							enabled: false, // Enable header minimize for mobile mode
							offset: 200 // Offset(in px) to start header minimization
						}
					}
				},
				logo: {
					dark: './assets/images/logo/logo_default_dark.png',
					light: './assets/images/logo/logo_default_light.png'
				}
			},

			// Header search(quicksearch)
			search: {
				type: 'search-dropdown', //  Select header search type from available options: search-default|search-dropdown
				// Header search results dropdown
				dropdown: {
					skin: 'light' // Select results dropdown skin from available options:  light|dark
				}
			}
		},

		// == Asides(left, right and mobile asides)
		aside: {
			// Left aside(used for left aside menu)
			left: {
				display: true, //  Display or hide  left aside
				fixed: true, //  Establecer modo fijo a la izquierda
				skin: 'dark', //  Select left aside skin from available options:  light|dark
				push_footer: true, // Tire hacia la izquierda hasta el final y empuje el footer de página hacia la derecha

				//  Left aside minimize toggle
				minimize: {
					toggle: true, //  Allow minimize toggle(supported for desktop mode only)
					default: false // Set left aside minimized by default
				}
			},

			// Right aside(used for blank right aside)
			right: {
				display: false //  Display or hide right aside
			}
		},

		// == MENUS
		menu: {
			header: {
				display: true, // MOSTRAR U OCULTAR HEADER

				//  header menu desktop mode
				desktop: {
					skin: 'dark',
					arrow: true,
					toggle: 'click',
					submenu: {
						skin: 'light', // Select header menu submenu skin from available options:  light|dark
						arrow: true // Enable header menu submenu arrow
					}
				},

				//  header menu mobile mode
				mobile: {
					skin: 'dark' // Select header menu skin from available options:  light|dark
				}
			},

			// MENU DE LA IZQUIERDA
			aside: {
				// Display or hide header menu
				display: true,

				// left aside menu desktop and mobile modes
				desktop_and_mobile: {
					// Left aside menu submenu settings
					submenu: {
						skin: 'light', // Select left aside menu skin from available options: light|dark|inherit(from aside left skin)

						accordion: true, // Set accordion submenu toggle mode(set to fasle to enable submenu dropdown mode)

						dropdown: {
							// Set submenu dropdown mode(for minimized left aside mode and or submenu dropdown mode activated when accordion: false set)
							arrow: true, // Display arrows for dropdown submenu
							hover_timeout: 500 // Timeout to auto hide the opened submenu dropdown
						}
					},
					// Minimized left aside menu
					minimize: {
						submenu_type: 'default' // Select submenu type for minimized left aside mode from available options: default/compact
					}
				}
			}
		},

		// == Content
		content: { //LIGHT 2 ES EL PLOMITO
			skin: 'light2' // Select main content skin from available options: light|light2,
		},

		// == FOOTER
		footer: {
			fixed: false // Set fixed footer layout
		},

		// == Quick Sidebar
		quicksidebar: {
			display: true // Display or hide quicksidebar
		},

		// == Portlet Plugin
		portlet: {
			sticky: {
				offset: 50
			}
		}
	};


	//CAMBIO LA CONFIGURACIÓN
	constructor(config?: any) {
		if (config) {
			this.config = config;
		}
	}
}
