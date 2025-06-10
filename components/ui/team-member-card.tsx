"use client"

import { useState } from "react"
import ProfileAvatar from "@/components/ui/profile-avatar"

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
  description?: string;
  index: number;
}

export default function TeamMemberCard({
  name,
  role,
  image = "/placeholder-user.jpg",
  description,
  index
}: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="bg-[#201f1b] rounded-3xl p-8 text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#fbc63d]/10 hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-labelledby={`team-member-name-${index}`}
      aria-describedby={`team-member-role-${index} team-member-desc-${index}`}
    >
      <div className="overflow-hidden rounded-2xl">
        <ProfileAvatar
          name={name}
          src={image}
          width={200}
          height={250}
          className={`rounded-2xl mx-auto mb-6 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
      <p className={`text-[#fbc63d] text-sm mb-4 transition-all duration-300 ${isHovered ? 'translate-y-[-5px]' : ''}`}>{role}</p>
      <p className="text-[#d9d9d9] text-sm leading-relaxed overflow-hidden transition-all duration-500" style={{ maxHeight: isHovered ? '200px' : '80px' }}>
        {description || "Passionné par la création de solutions innovantes et la livraison de résultats exceptionnels pour chaque projet."}
      </p>
    </div>
  );
}
