interface Colors {
  [key: string]: string
}

const lightColors: Colors = {
  colorPureWhite: '#fff',
  colorWhite: '#fafafa',
  colorPureBlack: '#000',
  colorDarkBlack: '#010101',
  colorDeepBlack: '#111',
  colorBlack: '#212121',
  colorDarkGray: '#303030',
  colorGray: '#555',
  colorBrightGray: '#f1f1f1',
  colorLightGray: '#cecece',
  colorPurered: '#f00',
  colorRed: '#c00',
}

const darkColors: Colors = {
  colorPureWhite: '#212121',
  colorWhite: '#000',
  colorPureBlack: '#fff',
  colorDarkBlack: 'fafafa',
  colorDeepBlack: '#fcfcfc',
  colorBlack: '#dedede',
  colorDarkGray: '#cecece',
  colorGray: '#f1f1f1',
  colorBrightGray: '#555',
  colorLightGray: '#fff',
  colorPureRed: '#f00',
  colorRed: '#c00',
}

export const applyLightMode = () => {
  Object.keys(lightColors).forEach((color: string) => {
    document.documentElement.style.setProperty(`--${color}`, lightColors[color])
  })
}

export const applyDarkMode = () => {
  Object.keys(darkColors).forEach((color: string) => {
    document.documentElement.style.setProperty(`--${color}`, darkColors[color])
  })
}
