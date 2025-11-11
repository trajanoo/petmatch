'use client'
import { Heart, PawPrint } from 'lucide-react'
import { redirect } from 'next/navigation';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    async function handleLogin(e: React.FormEvent) {
        try {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json();
        if (res.ok && data.user !== false) {
            setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email
            });
            console.log(data.user)
            router.push('/discover');
        } else {
            alert('Login falhou: ' + data.message);
        }
        } catch(err) {
            console.error(err)
            alert('Erro de conexão com o servidor')
        }
    }
        return (
            <div className='flex flex-col justify-center h-dvh items-center bg-white'>
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#EE6724] mb-4 shadow-lg">
                        <PawPrint className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-[#EE6724] font-extrabold mb-2">PetMatch</h1>
                    <p className="text-gray-500">Descubra seu novo amigo!</p>
                </div>
                <form action="" onSubmit={handleLogin} className="flex flex-col gap-5 mb-5">
                    <input onChange={(e) => setEmail(e.target.value)} className="h-18 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="h-18 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="password" placeholder="Senha" />
                    <button type="submit" className="bg-[#EE6724] hover:bg-[#d95a1f] transition cursor-pointer h-18 mx-5 rounded-2xl text-white font-bold">Entrar</button>
                </form>
                <Link href={'/forgot-password'}><span className="mx-5 text-[#6A7282] justify-start w-90 hover:text-[#EE6724] transition cursor-pointer">Esqueceu a senha?</span></Link>

                <div>

                    <p className="text-[#6A7282] text-center mt-10">Não tem uma conta? <Link href={'/register'}><span className="text-[#EE6724] cursor-pointer">Cadastre-se</span></Link></p>
                </div>

                <div className="absolute bottom-8 flex gap-2 opacity-20">
                    <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
                    <PawPrint className="w-6 h-6 text-[#EE6724]" />
                    <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
                </div>
            </div>
        )
}