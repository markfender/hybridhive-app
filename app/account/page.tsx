"use client"

import { useAddress } from '@thirdweb-dev/react'

export default function Account() {
  
  //const { address } = useAddress()
  const address = "test"

  if(!address) {
    return (
      <>
        <h1>Account</h1>
        <p>No wallet connected.</p>
      </>
    )
  }

  return (
    <>
      <h1>Account</h1>
      <p>Wallet: {address}</p>

      <p>Total global share: x%</p>
      <table>
        <tr>
          <th>Token</th>
          <th>Balance</th>
          <th>Global share</th>
        </tr>
        <tr>
          <td>Token A</td>
          <td>100</td>
          <td>0.1%</td>
        </tr>
        <tr>
          <td>Token B</td>
          <td>100</td>
          <td>0.1%</td>
        </tr>
      </table>
    </>
  )
}
