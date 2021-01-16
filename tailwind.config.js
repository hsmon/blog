const typography = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: "class",
  important: true,
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1120px',
    },
    fontFamily: {
      sans: [
        "Helvetica Neue",
        "Helvetica , Arial",
        "Verdana",
        "Roboto",
        "游ゴシック",
        "Yu Gothic",
        "游ゴシック体",
        "YuGothic",
        "ヒラギノ角ゴ Pro W3",
        "Hiragino Kaku Gothic Pro",
        "Meiryo UI",
        "メイリオ",
        "Meiryo",
        "ＭＳ Ｐゴシック",
        "MS PGothic",
        "sans-serif",
      ],
    },
    fill: () => ({
      'black': colors.gray[900],
      'white': colors.gray[100],
    }),
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            a: {
              color: colors.blue[700],
              "&:hover": {
                color: colors.blue[700],
                textDecoration: "none",
              },
            },
          },
        },
        dark: {
          css: {
            a: {
              color: colors.red[400],
              "&:hover": {
                color: colors.red[400],
              },
            }
          }
        }
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    typography
  ],
}
