import React, { Component } from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import PropTypes from 'prop-types'
import htmlescape from 'htmlescape'
import flush from 'styled-jsx/server'

export default class HybridDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    let amp = false
    head.forEach(element => {
      if (element.type == 'link' && element.props.rel == 'canonical') {
          amp = true
      }
    })
    return { html, head, errorHtml, chunks, styles, amp }
  }

  static childContextTypes = {
    _documentProps: PropTypes.any
  }

  getChildContext () {
    return { _documentProps: this.props }
  }

  render () {
    if (this.props.amp) {
      return <html amp="">
        <AmpHead />
        <body>
          <Main />
        </body>
      </html>
    } else {
      return <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    }
  }
}

export class AmpHead extends Component {
  static contextTypes = {
    _documentProps: PropTypes.any
  }

  render () {
    const { head, styles, __NEXT_DATA__ } = this.context._documentProps
    const { pathname, buildId, assetPrefix, nextExport } = __NEXT_DATA__
    const pagePathname = getPagePathname(pathname, nextExport)

    return <head {...this.props}>
      <meta name='viewport' content='width=device-width,minimum-scale=1' />
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
      <style amp-boilerplate=''>{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style><noscript><style amp-boilerplate=''>{`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}</style></noscript>
      <script async src='https://cdn.ampproject.org/v0.js' />
      {(head || []).map((h, i) => React.cloneElement(h, { key: i }))}
      {styles || null}
      {this.props.children}
    </head>
  }
}

function getPagePathname (pathname, nextExport) {
  if (!nextExport) return pathname
  if (pathname === '/') return '/index.js'
  return `${pathname}/index.js`
}