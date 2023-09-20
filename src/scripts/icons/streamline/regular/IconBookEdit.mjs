
export const IconBookEdit = ({
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
    }><path d="M7.733437500000001 21.796875H2.8125A2.109375 2.109375 0 0 1 0.7040625 19.6875" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M17.579062500000003 8.4375V1.40625A0.703125 0.703125 0 0 0 16.875 0.703125H3.5165625a2.8125 2.8125 0 0 0 -2.8125 2.8125V19.6875A2.109375 2.109375 0 0 1 2.8125 17.578125h5.625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M21.2146875 13.940624999999999 14.0625 21.09375l-3.515625 0.703125 0.703125 -3.515625 7.153125 -7.153125a1.9818749999999998 1.9818749999999998 0 0 1 2.805 0l0.0075 0.0075a1.9837500000000001 1.9837500000000001 0 0 1 -0.0009375 2.805Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};