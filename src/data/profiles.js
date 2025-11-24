const firstNames = [
  "Aisyah",
  "Siti",
  "Putri",
  "Nur",
  "Indah",
  "Dewi",
  "Rahma",
  "Fitri",
  "Aulia",
  "Sari",
  "Lestari",
  "Maya",
  "Rizky",
  "Mega",
  "Ratna",
  "Eka",
  "Rahayu",
  "Yuni",
  "Laila",
  "Ayu",
  "Citra",
  "Rahmawati",
  "Wulan",
  "Tia",
  "Safira",
  "Zahra",
  "Aulia",
  "Salma",
  "Alya",
  "Keisha",
];
const lastNames = [
  "Aisyah",
  "Sari",
  "Lestari",
  "Rahmawati",
  "Wulandari",
  "Pertiwi",
  "Ramadhani",
  "Putri",
  "Hidayati",
  "Susanti",
  "Novitasari",
  "Anggraeni",
  "Kusuma",
  "Pratiwi",
  "Yulianti",
  "Azzahra",
  "Fadillah",
  "Nurhaliza",
  "Maheswari",
  "Andini",
];
const jobs = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Data Analyst",
  "Marketing Specialist",
  "Sales Executive",
  "Teacher",
  "Doctor",
  "Nurse",
  "Photographer",
  "Barista",
  "Chef",
  "Content Creator",
  "UX Researcher",
  "Accountant",
  "Lawyer",
  "Student",
  "Entrepreneur",
  "Consultant",
  "Architect",
];
const hijabiPhotos = [
  "https://plus.unsplash.com/premium_photo-1676994901426-a61941a52fe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGlqYWJpJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683133405779-081b5e4311e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlqYWJpJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1679064458881-76904cf6d1aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGlqYWJpJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1693633495416-841a500092f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGlqYWJpJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1733217854160-d76db1a19e48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1613447895817-e617a4093f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1661254601903-0edfe1cd736c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1676928553902-99c674bf816a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1657092358800-5fb01872c3f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1633279309534-f761427548b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1678907859661-8aa996c3f337?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1681152299027-17efe7da7081?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1643458180338-02c4fa4be53c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1669366530534-71195410ad23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1683356475999-2549ad63c9ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1683121745598-81209230b130?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1706089846154-b640eea10ecb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1681489830925-d47810835fda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1646935977609-7c3f10fc06c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1684894059566-25ca8b8007bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1705228505666-f9ba2b8b7422?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1716841461071-d4b0c9ce3295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1673546975316-f2a195a08974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1718913134935-3be613693304?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1661634473636-65af61058c29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1667022620566-ba039b72437f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1675302516220-7992b7e1c844?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1650378117249-f5a77fe9786e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1655769711413-a72b7ae8c465?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1696318024580-58b55ed21ab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxoaWphYmklMjBnaXJsfGVufDB8fDB8fHww",
];

const interestsList = [
  "Travel",
  "Music",
  "Movies",
  "Reading",
  "Cooking",
  "Hiking",
  "Gaming",
  "Fitness",
  "Yoga",
  "Photography",
  "Art",
  "Dancing",
  "Cycling",
  "Running",
  "Technology",
  "Coffee",
  "Foodie",
  "Pets",
  "Volunteering",
  "Nature",
  "Meditation",
  "Karaoke",
  "Board Games",
  "Basketball",
  "Football",
  "Tennis",
  "Badminton",
  "Swimming",
  "Drawing",
  "Writing",
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

function pickUnique(arr, k) {
  const set = new Set();
  while (set.size < k) {
    set.add(pick(arr));
  }
  return Array.from(set);
}

const profiles = Array.from({ length: 100 }, (_, i) => {
  const id = `p${String(i + 1).padStart(4, "0")}`;
  const name = `${pick(firstNames)} ${pick(lastNames)}`;
  const age = rand(18, 60);
  const job = pick(jobs);
  const distanceKm = rand(1, 30);
  const bio = `${pick([
    "Suka mencoba hal baru",
    "Pecinta kopi",
    "Penggemar alam",
    "Senang jalan-jalan",
    "Humoris dan spontan",
    "Pencinta seni",
  ])}, cari teman ngobrol dan petualangan.`;
  const interests = pickUnique(interestsList, rand(3, 6));
  const photo = pick(hijabiPhotos);
  const match = Math.random() < 0.25;
  return { id, name, age, job, distanceKm, bio, interests, photo, match };
});

module.exports = { profiles };
