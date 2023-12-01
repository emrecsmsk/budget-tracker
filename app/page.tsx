"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

const LoggedInControl = () => {

  const isLoggedIn = false

  useEffect(() => {
    const handleisLoggedIn = () => {
      isLoggedIn
        ?
        redirect("/home")
        :
        redirect("/login")
    }

    handleisLoggedIn()
  }, [])


  return (
    <div />
  )
}

export default LoggedInControl