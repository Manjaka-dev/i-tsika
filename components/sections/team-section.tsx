"use client";

import { useState, useEffect } from "react";
import TeamMemberCard from "@/components/ui/team-member-card";

// Import du composant depuis l'application existante 
export default function TeamSection({ people }) {
  return (
    <section id="team" className="px-6 py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-white animate-slide-in-left">Notre équipe</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {people.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image || "/placeholder.svg"}
            description={member.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
