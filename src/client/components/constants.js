const constants = {
  unit: 8,

  colors: {
    white: '#FFFFFF',
    black: '#222222',
    blue: '#108EE9',
    darkishBlue: '#0000ff',
    grey: '#E6E6E6',
    brand: '#E66902',

    // Error colors
    error: '#D95767',
    errorToned: '#E48994'
  },

  // fonts
  // fontSans: "'Gt America Web', sans-serif",
  // fontMono: "'Gt America mono Web', monospace",

  // Boundaries
  padding: '10px',
  selectHeight: '30px',

  // Sizes are in units of 8px
  areas: {
    xsm: 8,
    sm: 16,
    md: 32,
    lg: 48,
    xlg: 64
  },
  widths: {
    xsm: 8,
    sm: 16,
    md: 32,
    lg: 48,
    xlg: 64
  },

  fontSizes: {
    size3: 24,
    size2: 20,
    size1: 16,
    size0: 14,
    sizeN1: 12,
    sizeN2: 10
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700
  },

  lineHeights: {
    size3: 32,
    size2: 28,
    size1: 24,
    size0: 20,
    sizeN1: 18,
    sizeN2: 16
  },

  shadows: {
    shadow1: '0 2px 4px rgba(0,0,0, .08)',
    shadow2: '0 2px 4px rgba(0,0,0,.08), 0 2px 12px rgba(0,0,0,0.06)',
    shadow3:
      '0 2px 4px rgba(0,0,0,.08), 0 2px 12px rgba(0,0,0,0.06), 0 8px 14px rgba(0,0,0,0.04), 0 12px 16px rgba(0,0,0,.02)'
  },

  innerSpaces: {
    none: 'padding: initial;',
    sm: 'padding: 12px 16px;',
    md: 'padding: 24px 32px;'
  },

  borderRadiuses: {
    sm: 'border-radius: 2px;',
    md: 'border-radius: 3px;',
    lg: 'border-radius: 4px;'
  },

  unitize(quantity) {
    return quantity ? quantity * this.unit + 'px' : null
  }
}

export default constants
