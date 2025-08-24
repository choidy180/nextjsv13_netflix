<!-- BANNER -->
<p align="center">
  <img src="./public/stream.jpg" alt="stream Clone Banner" width="200px" />
</p>

<h1 align="center">🎬 NEXTJS-NETFLIX-CLONE</h1>
<p align="center">
  <b>Next.js v13+ · Tailwind CSS · Firebase · Stripe · TMDB API</b>
</p>

<p align="center">
  <a href="<!-- 배포 URL 넣기 -->">
    <img src="https://img.shields.io/badge/Live-Demo-blue?logo=vercel&logoColor=white" />
  </a>
  <a href="<!-- GitHub 저장소 URL 넣기 -->">
    <img src="https://img.shields.io/github/stars/choidy180/nextjs-netflix-clone?style=social" />
  </a>
  <img src="https://img.shields.io/github/license/choidy180/nextjs-netflix-clone?color=brightgreen" />
  <img src="https://img.shields.io/badge/PRs-welcome-yellow?logo=github" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-ff69b4" />
</p>

---

## ✨ 기능
- 🔐 **인증/프로필**: Firebase Auth(이메일/소셜) 기반 로그인, 프로필/아바타 관리
- 💳 **구독 결제**: Stripe 결제로 플랜 구독/결제 내역 확인
- 🎞️ **콘텐츠**: TMDB API로 영화/시리즈 목록, 디테일, 카테고리(Trending/Top Rated 등)
- 🧡 **마이 리스트**: 즐겨찾기/최근 시청 저장
- 🔎 **검색/필터**: 제목·장르 기반 검색
- 🚀 **최적화**: Next.js App Router(13+) 기반 SSR/ISR, 이미지 최적화
- 📱 **반응형 UI**: Tailwind CSS로 모바일~데스크톱 대응

> ※ 위 항목은 템플릿입니다. 실제 구현 범위에 맞게 체크/수정하세요.

---

## 🧰 기술 스택
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/TMDB%20API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel&logoColor=white" />
</p>

---

## 📦 설치 & 실행
```bash
# 1) 레포지토리 복제
git clone https://github.com/choidy180/nextjsv13_netflix
cd nextjs-netflix-clone

# 2) 의존성 설치
npm install

# 3) 환경 변수 설정
# .env.local 생성 후 아래 값 채우기 (아래 표 참고)

# 4) 개발 서버 실행
npm run dev
# URL: http://localhost:3000
```

## ✈️ Example Code (Auth Code)
```bash

import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}


const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider =({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    // Persisting the user
    // 사용자 유지
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    // 로그인 시
                    setUser(user)
                    setLoading(false)
                } else {
                    // Not logged in...
                    // 로그아웃시
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }),
            [auth]
    )

    const signUp = async (eamil: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, eamil, password).then(
            (userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoading(false)
            }
        )
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const signIn = async (eamil: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, eamil, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoading(false)
            }
        )
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const logout = async () => {
        setLoading(true)

        signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const memoValue = useMemo(
        () => ({
            user, 
            signUp, 
            signIn, 
            loading, 
            logout,
            error
        }), 
        [user, loading]
    )

    return (
        <AuthContext.Provider value={memoValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}

```
