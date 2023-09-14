declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// Описание css модуля

declare module '*.svg' {
  const content: string;
  export default content;
}
