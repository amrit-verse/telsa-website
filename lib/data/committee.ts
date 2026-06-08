export interface CommitteeMember {
  name: string;
  position: string;
  roleType: "core" | "executive";
  image?: string;
  message?: string;
}

export const committeeMembers: CommitteeMember[] = [
  { 
    name: "Aditya Kumar Raj", 
    position: "President", 
    roleType: "core",
    message: "TeLSA was founded on the belief that every law student from the Terai/Madhesh region deserves a unified platform to excel academically and professionally. We are committed to fostering legal literacy, defending student rights, and building a community rooted in social justice."
  },
  { name: "Ayan Yadav", position: "Vice President", roleType: "core" },
  { name: "Amar Yadav", position: "Secretary", roleType: "core" },
  { name: "Sachin Kumar Sah", position: "Joint Secretary", roleType: "core" },
  { name: "Shova Yadav", position: "Treasurer", roleType: "core" },
  { name: "Nitesh Kumar Yadav", position: "Executive Member", roleType: "executive" },
  { name: "Richa Patel", position: "Executive Member", roleType: "executive" },
  { name: "Madhumitta Yadav", position: "Executive Member", roleType: "executive" },
  { name: "Surendra Kumar Paswan", position: "Executive Member", roleType: "executive" },
];

export const getPresident = () => committeeMembers.find(m => m.position === "President");
