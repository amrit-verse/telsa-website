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
    image: "/images/committee/president.jpeg",
    message: "Welcome to the Terai Law Students' Association. As President, I am honored to lead this esteemed body of scholars in our shared pursuit of academic excellence, legal literacy, and social justice. Together, we shall elevate the standards of legal discourse and ensure that every voice from the Terai region resonates powerfully within the halls of justice."
  },
  { name: "Ayan Yadav", position: "Vice President", roleType: "core", image: "/images/committee/vice_president.jpeg" },
  { name: "Amar Yadav", position: "Secretary", roleType: "core", image: "/images/committee/secretary.jpeg" },
  { name: "Shova Yadav", position: "Treasurer", roleType: "core", image: "/images/committee/treasurer.jpeg" },
  { name: "Sachin Kumar Sah", position: "Joint Secretary", roleType: "core", image: "/images/committee/joint_secretary.jpeg" },
  { name: "Nitesh Kr. Sah", position: "Executive Member", roleType: "executive", image: "/images/committee/nitesh.jpeg" },
  { name: "Richa Patel", position: "Executive Member", roleType: "executive", image: "/images/committee/richa.jpeg" },
  { name: "Madhumitta Yadav", position: "Executive Member", roleType: "executive", image: "/images/committee/madhumitta.jpeg" },
  { name: "Surendra Kumar Paswan", position: "Executive Member", roleType: "executive", image: "/images/committee/surendra.jpeg" },
];

export const getPresident = () => committeeMembers.find(m => m.position === "President");
