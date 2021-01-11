module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
