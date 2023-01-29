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