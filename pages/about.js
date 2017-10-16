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
      <div>
        <Head>
          {
            amp ? (
              <link rel="canonical" href={ampUrl} />
            ) : (
              <link rel="amphtml" href={ampUrl} />
            )
          }
        </Head>
        <p>This is the about page</p>
      </div>
    )
  }
}
