/**@jsxImportSource @emotion/react */
import React from 'react'
import { Global } from '@emotion/react'
import { styles, utils } from './styles/ReferenceFormStyles'

function ReferenceForm() {
  return (

    <div>
      <Global styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        body: {
          height: '100vh',
          backgroundColor: styles.colors['bg-primary'],
          fontFamily: 'Inter, sans-serif'
        },

        /* center the form */
        "#root": {
          height: "100%",
          ...utils.flexCenter
        }
      }}/>

      <main className="reference-form">here goes the form</main>
    </div>
  )
}

export default ReferenceForm