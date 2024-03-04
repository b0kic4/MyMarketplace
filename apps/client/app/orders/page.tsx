"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import useSWR from "swr";
const Orders = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const user = useUser()
  const userId = user.user?.id
  const [orderApiUrl, setOrderApiUrl] = useState<string>("")

  useEffect(() => {
    if (userId) {
      const url = new URLSearchParams({ userId });
      setOrderApiUrl(`${process.env.NEXT_PUBLIC_NESTJS_URL}/payments/getOrderByUserId?${url}`)
    }
  }, [userId])

  const { data: orders, error: orderError } = useSWR(orderApiUrl, fetcher);

  return (
    <div>Orders</div>
  )
}

export default Orders
