import Header from '../components/Header'

import React from 'react'
import Head from 'next/head'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const amp = query.amp == '1'
    const url = req ? req.url : window.location.href
    const ampUrl = amp ? url.replace('?amp=1', '') : url + '?amp=1'
    return { amp, ampUrl }
  }

  render() {
    const {amp, ampUrl} = this.props
    return (
      <div className="page">
        <Head>
          {
            amp ? (
              <link rel="canonical" href={ampUrl} />
            ) : (
              <link rel="amphtml" href={ampUrl} />
            )
          }
          <style amp-custom="">{`
            body {
              margin: 0;
            }
            .page {
              margin: 5px;
            }
            .header a {
              margin-right: 20px
            }
          `}</style>
        </Head>
        <Header/>
        <p>Hello Next.js</p>
      </div>
    )
  }
}
