"use client"

import Image from 'next/image'

import NetworkInitial from '@/public/network/initial.svg'
import NetworkTransfer from '@/public/network/transfer.svg'
import NetworkFinal from '@/public/network/final.svg'

export default function Network() {
  return (
    <>
      <h1>Network</h1>
      <Image src={NetworkInitial} alt="network initial" />
      <Image src={NetworkTransfer} alt="network transfer" />
      <Image src={NetworkFinal} alt="network final" />
    </>
  )
}
