import { Heart, PawPrint } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    return (
        <div className='flex flex-col justify-center h-dvh items-center bg-white'>
        <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#EE6724] mb-4 shadow-lg">
                <PawPrint className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-[#EE6724] font-extrabold mb-2">PetMatch</h1>
            <p className="text-gray-500">Descubra seu novo amigo!</p>
        </div>
        <form action="" className="flex flex-col gap-5 mb-5">
            <input className="h-18 w-90 mx-5 bg-[#F3F3F5] rounded-2xl pl-4 text-black" type="text" placeholder="Email" />
    
            <input type="submit" value="Enviar e-mail de recuperação" className="bg-[#EE6724] hover:bg-[#d95a1f] transition cursor-pointer h-18 mx-5 rounded-2xl text-black font-bold" />
        </form>

        <div>
            
            <p className="text-[#6A7282] text-center mt-10">Não tem uma conta? <Link href={'/register'}><span  className="text-[#EE6724] cursor-pointer">Cadastre-se</span></Link></p>
        </div>

        <div className="absolute bottom-8 flex gap-2 opacity-20">
    <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
    <PawPrint className="w-6 h-6 text-[#EE6724]" />
    <Heart className="w-6 h-6 text-[#EE6724]" fill="#EE6724" />
  </div>
    </div>
    )
}