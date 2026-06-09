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
    message: "An official message from the President of TeLSA will be published soon."
  },
  { name: "Ayan Yadav", position: "Vice President", roleType: "core", image: "/images/committee/vice_president.jpeg" },
  { name: "Amar Yadav", position: "Secretary", roleType: "core", image: "/images/committee/secretary.jpeg" },
  { name: "Sachin Kumar Sah", position: "Joint Secretary", roleType: "core", image: "/images/committee/joint_secretary.jpeg" },
  { name: "Shova Yadav", position: "Treasurer", roleType: "core", image: "/images/committee/treasurer.jpeg" },
  { name: "Nitesh Kumar Yadav", position: "Executive Member", roleType: "executive" },
  { name: "Richa Patel", position: "Executive Member", roleType: "executive", image: "/images/committee/richa.jpeg" },
  { name: "Madhumitta Yadav", position: "Executive Member", roleType: "executive" },
  { name: "Surendra Kumar Paswan", position: "Executive Member", roleType: "executive", image: "/images/committee/surendra.jpeg" },
];

export const getPresident = () => committeeMembers.find(m => m.position === "President");
