'use client'

import { 
  User, Bell, Shield, HelpCircle, LogOut, ChevronRight, 
  Moon, Globe, Heart, Camera, X 
} from "lucide-react";
import { Card } from "../components/Card";
import { Avatar, AvatarFallback } from "../components/Avatar";
import Switch from "../components/Switch";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { Label } from "../components/Label";
import BottomNavigation from "../components/BottomNavigation";
import { redirect } from "next/navigation";
import { useUser } from "../context/UserContext";
import { img } from "motion/react-client";

export default function SettingsPage() {
  const { user, setUser } = useUser();

  const [profileData, setProfileData] = useState({
    name: user?.name || "Usuário Pet",
    email: user?.email || "usuario@petmatch.com",
    phone: "+55 11 98765-4321",
    bio: ""
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveProfile = () => {

    console.log("Perfil salvo:", profileData);
    setIsEditingProfile(false);
  };

  type SettingItem = {
    icon: any;
    label: string;
    action?: boolean;
    toggle?: boolean;
    enabled?: boolean;
    value?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
  };

  type SettingSection = {
    title: string;
    items: SettingItem[];
  };

  const settingsSections: SettingSection[] = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Editar Perfil", action: true, onClick: () => setIsEditingProfile(true) },
        { icon: Shield, label: "Privacidade e Segurança", action: true },
        { icon: Bell, label: "Notificações", toggle: true, enabled: true },
      ]
    },
    {
      title: "Preferências",
      items: [
        { icon: Moon, label: "Modo Escuro", toggle: true, enabled: false },
        { icon: Globe, label: "Idioma", action: true, value: "Português" },
      ]
    },
    {
      title: "Suporte",
      items: [
        { icon: HelpCircle, label: "Central de Ajuda", action: true },
        { icon: Heart, label: "Sobre o Projeto Pet", action: true },
      ]
    }
  ];

  const userInitials = (user?.name || "Usuário Pet")
    .split(' ')
    .map(n => n[0])
    .join('');

  if (isEditingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-[#EE6724] text-white p-6 rounded-b-3xl shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-white flex-1 text-center">Editar Perfil</h2>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          <div className="flex flex-col items-center mb-8">
  <div className="relative">
    {/* Avatar */}
    <Avatar className="w-24 h-24 bg-orange-100 overflow-hidden">
      {user?.profile_pic ? (
        <img
          src={`http://localhost:3001/uploads/${user.profile_pic}`}
          alt="Foto de perfil"
          className="object-cover w-full h-full"
        />
      ) : (
        <AvatarFallback className="bg-orange-100 text-[#EE6724] text-2xl">
          {user?.name
            ? user.name.split(' ').map(n => n[0]).join('')
            : '?'}
        </AvatarFallback>
      )}
    </Avatar>

    <button
      onClick={() => document.getElementById("fileInput")?.click()}
      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#EE6724] text-white flex items-center justify-center shadow-lg hover:bg-[#d95a1f] transition-colors"
    >
      <Camera className="w-4 h-4" />
    </button>

    <input
      type="file"
      id="fileInput"
      accept="image/*"
      className="hidden"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        const formData = new FormData();
        formData.append("arquivo", file);

        try {
          setProfileData(prev => ({ ...prev, uploading: true }));

          const res = await fetch(`http://localhost:3001/users/${user.id}/profile-image`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            alert("Erro ao enviar imagem");
            return;
          }

          const updatedUser = await res.json();

          if (updatedUser[0]) {
            setUser(prev => ({ ...prev, profile_pic: updatedUser[0].profile_pic }));
          }

          alert("Foto de perfil atualizada!");
        } catch (err) {
          console.error(err);
          alert("Erro ao enviar imagem");
        } finally {
          setProfileData(prev => ({ ...prev, uploading: false }));
        }
      }}
    />
  </div>
  <p className="text-gray-500 mt-3">Toque para alterar foto</p>
</div>

          <Card className="rounded-2xl border-0 shadow-sm p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Nome completo</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="h-12 rounded-xl border-gray-200 focus:border-[#EE6724] focus:ring-[#EE6724] text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="h-12 rounded-xl border-gray-200 focus:border-[#EE6724] focus:ring-[#EE6724] text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="h-12 rounded-xl border-gray-200 focus:border-[#EE6724] focus:ring-[#EE6724] text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700">Sobre mim</Label>
              <textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EE6724] focus:ring-2 focus:ring-[#EE6724] focus:outline-none resize-none text-black"
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </Card>

          <Button
            onClick={handleSaveProfile}
            className="w-full h-14 bg-[#EE6724] hover:bg-[#d95a1f] text-white rounded-2xl shadow-lg"
          >
            Salvar Alterações
          </Button>

          <Button
            onClick={() => setIsEditingProfile(false)}
            variant="outline"
            className="w-full h-14 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50"
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-[#EE6724] text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h2 className="text-white mb-6">Configurações</h2>

        <Card
  className="rounded-2xl border-0 shadow-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow"
  onClick={() => setIsEditingProfile(true)}
>
  <div className="flex items-center gap-4">
    <Avatar className="w-16 h-16 bg-orange-100 overflow-hidden">
      {user?.profile_pic ? (
        <img
          src={`http://localhost:3001/uploads/${user.profile_pic}`}
          alt="Foto de perfil"
          className="object-cover w-full h-full"
        />
      ) : (
        <AvatarFallback className="bg-orange-100 text-[#EE6724] text-xl">
          {userInitials}
        </AvatarFallback>
      )}
    </Avatar>

    <div className="flex-1">
      <h4 className="text-gray-800 mb-1">{profileData.name}</h4>
      <p className="text-gray-500">{profileData.email}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
</Card>
      </div>

      <div className="px-6 space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h4 className="text-gray-600 mb-3 px-2">{section.title}</h4>
            <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div
                    className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={item.onClick}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#EE6724]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{item.label}</p>
                      {item.value && <p className="text-gray-500">{item.value}</p>}
                    </div>
                    {item.toggle && (
                      <Switch defaultChecked={item.enabled} className="data-[state=checked]:bg-[#EE6724]" />
                    )}
                    {item.action && !item.toggle && <ChevronRight className="w-5 h-5 text-gray-400" />}
                  </div>
                  {itemIndex < section.items.length - 1 && <Separator className="ml-16" />}
                </div>
              ))}
            </Card>
          </div>
        ))}

        <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
          <button className="w-full p-4 flex items-center gap-4 hover:bg-red-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-red-500 flex-1 text-left">Sair da Conta</p>
          </button>
        </Card>

        <p className="text-center text-gray-400 mt-8">
          Projeto Pet v1.0.0
        </p>
      </div>

      <BottomNavigation 
        activeScreen="settings"
        onNavigate={(screen) => redirect(`/${screen}`)}
      />
    </div>
  );
}
