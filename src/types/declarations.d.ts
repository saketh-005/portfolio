declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.gif';

// Component declarations
declare module './components/Header/Header';
declare module './components/Home/Home';
declare module './components/About/About';
declare module './components/Projects/Projects';
declare module './components/Skills/Skills';
declare module './components/Contact/Contact';
declare module './components/Footer/Footer';
