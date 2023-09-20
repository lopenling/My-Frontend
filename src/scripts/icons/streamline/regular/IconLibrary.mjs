
export const IconLibrary = ({
  fill = "none",
  stroke = "currentColor",
  className = "",
  ariaHidden = "",
} = {}) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" ${
      (fill ? ` fill="${fill}"` : "") +
      (stroke ? ` stroke="${stroke}"` : "") +
      (className ? ` class="${className}"` : "") +
      (ariaHidden ? ` aria-hidden="${ariaHidden}"` : "")
    }><defs></defs><title>library</title><path d="M3.515625 0.7040625h15.46875s1.40625 0 1.40625 1.40625v18.28125s0 1.40625 -1.40625 1.40625H3.515625s-1.40625 0 -1.40625 -1.40625v-18.28125s0 -1.40625 1.40625 -1.40625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m2.109375 10.5478125 18.28125 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M6.796875 14.7665625h2.34375l0 0v7.03125l0 0h-1.875a0.9375 0.9375 0 0 1 -0.9375 -0.9375v-5.625a0.46875 0.46875 0 0 1 0.46875 -0.46875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M2.109375 4.2196875h2.8125v6.328125h-2.8125Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M4.921875 3.5165625h2.8125v7.03125h-2.8125Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M7.734375 3.5165625h2.34375a0.46875 0.46875 0 0 1 0.46875 0.46875v6.5625l0 0h-2.8125l0 0v-7.03125l0 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m15.28125 9.85875 -1.9190625000000001 0.6890625 -2.0728125 -5.8125a0.706875 0.706875 0 0 1 0.429375 -0.9009375l1.2571875 -0.45187499999999997a0.703125 0.703125 0 0 1 0.8990625 0.4265625l1.835625 5.1478125a0.706875 0.706875 0 0 1 -0.429375 0.901875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m17.578125 21.797812500000003 0 -7.03125 2.8125 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M14.765625 14.7665625h2.8125v7.03125h-2.8125Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M9.609375 13.3603125h2.34375l0 0v8.4375l0 0h-2.8125l0 0v-7.96875a0.46875 0.46875 0 0 1 0.46875 -0.46875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M11.953125 13.3603125h2.34375a0.46875 0.46875 0 0 1 0.46875 0.46875v7.96875l0 0h-2.8125l0 0v-8.4375l0 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};