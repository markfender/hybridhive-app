"use client"

import Image from 'next/image'

import TransferMock from '@/public/transfer_mock.svg'

export default function Home() {
  return (
    <>
      <h1>Transfer</h1>
      <Image src={TransferMock} width={600} alt="transfer" className="mt-[70px]"/>
    </>
  )
}
