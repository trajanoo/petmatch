'use client';

import { Heart, PawPrint } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUser } = useUser();

    function handleConfirmPassword(e: React.FormEvent) {
        e.preventDefault();
        if(password !== confirmPassword) {
            return alert('As senhas não coincidem!');
        }

        handleRegister(e)
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json();
            if(res.ok && data.user !== false) {
                setUser({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email
                })
                router.push('/discover')
            } else {
                alert('Registro falhou: ' + data.message);
            }
        } catch(err) {
            console.error(err)
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
        <form action="" onSubmit={handleConfirmPassword} className="flex flex-col gap-5 mb-5">
            <input onChange={(e) => setName(e.target.value)} className="h-16 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Nome de usuário" />
            <input onChange={(e) => setEmail(e.target.value)} className="h-16 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="h-16 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Senha" />
            <input onChange={(e) => setConfirmPassword(e.target.value)} className="h-16 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Confirmar senha" />
            <button type="submit" value="Entrar" className="bg-[#EE6724] hover:bg-[#d95a1f] transition cursor-pointer h-18 mx-5 rounded-2xl text-white font-bold">Cadastrar</button>
        </form>

        <div>
            <p className="text-[#6A7282] text-center mt-10">Já tem uma conta? <Link href='/login'><span className="text-[#EE6724] cursor-pointer">Login</span></Link></p>
        </div>

        <div className="absolute bottom-8 flex gap-2 opacity-20">
        <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
        <PawPrint className="w-6 h-6 text-[#EE6724]" />
        <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
      </div>
    </div>
    )
}