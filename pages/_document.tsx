import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="de-CH">
        <Head />
        <body>
          <div id="App">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}
