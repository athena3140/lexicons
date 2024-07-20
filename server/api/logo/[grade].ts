export default defineEventHandler((event) => {
	const params = event.context.params as { grade: string };
	const { grade } = params;

	const svg = `
    		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1246 350">
	 			<path fill="#fff" fill-rule="evenodd" d="M-0.2,231.87H122.492V212.842H21.388V33.07H-0.2v198.8Zm180.908,0H309.08V212.558H202.3v-71h98.548V122.246H202.3V52.382H309.08V33.07H180.712v198.8Zm395.044,0H597.34V33.07H575.756v198.8Zm125.244,0h85.2l30.1-30.1V183.59H794.72v11.076l-18.176,17.892H710.656L691.344,193.53V71.41l19.312-19.028h65.888L794.72,70.274V81.35H816.3V63.174l-30.1-30.1H701L669.76,64.31V200.63Zm207.6,0h89.744l31.242-31.24V64.31L998.348,33.07H908.6l-31.24,31.24V200.63Zm9.656-19.312L898.948,193.53V71.41L918.26,52.382h70.432L1008,71.41V193.53l-19.308,19.028H918.26Zm182.33,19.312h20.45V68.286h0.56L1225.26,231.87h21.02V33.07h-20.45V196.654h-0.57L1121.6,33.07h-21.01v198.8Z"/>
  				<path fill-rule="evenodd" fill="#00FFFF" d="M357.36,231.87H381.5l55.948-84.348L493.4,231.87h24.14l-67.876-101.1L514.7,33.07h-24.14l-52.824,79.8L384.34,33.07H360.2l65.32,96.56ZM335,254H539v6a5,5,0,0,1-5,5H340a5,5,0,0,1-5-5v-6Zm0-22h10v22H335V232Zm194,0h10v22H529V232ZM539,11H335V5a5,5,0,0,1,5-5H534a5,5,0,0,1,5,5v6Zm0,22H529V11h10V33ZM345,33H335V11h10V33Z"/>
      		<text fill="#00FFFF" font-size="60px" text-anchor="middle" font-family="Poppins" x="1171.403" y="330">
        			<tspan x="1171.403">${grade}</tspan>
      		</text>
    		</svg>
  `;
	setHeader(event, "Content-Type", "image/svg+xml");
	return svg;
});
