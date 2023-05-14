"use client"

import Image from 'next/image'

import NetworkInitial from '@/public/network/initial.svg'
import NetworkTransfer from '@/public/network/transfer.svg'
import NetworkFinal from '@/public/network/final.svg'

export default function Network() {
  return (
    <>
      <h1>Network</h1>

      <h2 className="mt-[40px] mb-[20px] text-3xl">Initial state</h2>
      <Image src={NetworkInitial} alt="network initial" className="mb-[100px]" />

      <h2 className="mt-[40px] mb-[20px] text-3xl">Global transfer</h2>
      <Image src={NetworkTransfer} alt="network transfer" className="mb-[100px]" />

      <h2 className="mt-[40px] mb-[20px] text-3xl">Final state</h2>
      <Image src={NetworkFinal} alt="network final" className="mb-[100px]" />
    </>
  )
}
