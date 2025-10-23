'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [user, loading, router])

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (error) {
      console.error("Error signing in with Google: ", error)
    }
  }

  if (loading || user) {
    return <div>Loading...</div> // Or a spinner component
  }

  return (
    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <p className="text-muted-foreground mb-8">오늘 뭐 먹지?를 사용하려면 로그인하세요.</p>
        <Button onClick={handleSignIn}>Google 계정으로 로그인</Button>
      </div>
    </div>
  )
}
