export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  category: 'general' | 'sideEffects' | 'painless' | 'missed';
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Why Timely Vaccination Matters',
    author: 'Dr. Meera Kulkarni (Pediatrician)',
    content: 'Vaccines train your child\'s immune system before exposure to dangerous diseases. Delays increase infection risk. Timely vaccination ensures that children develop immunity at the most vulnerable stages of their development. The recommended schedule is designed based on extensive research to provide maximum protection when children need it most.',
    category: 'general'
  },
  {
    id: '2',
    title: 'Can Vaccines Be Given If A Child Has Mild Fever?',
    author: 'Dr. Rohan Shah',
    content: 'Most vaccines can still be given during mild illness. Always consult your doctor before postponing. Minor illnesses like common colds typically don\'t interfere with vaccine effectiveness. However, if your child has a high fever (above 101°F) or moderate to severe illness, it\'s better to wait until they recover.',
    category: 'general'
  },
  {
    id: '3',
    title: 'Understanding Vaccine Side Effects',
    author: 'Dr. Anjali Deshmukh',
    content: 'Vaccine side effects are usually mild and temporary. They indicate that your child\'s immune system is responding and building protection. Common reactions include slight fever, fussiness, and soreness at the injection site. These typically resolve within 1-2 days.',
    category: 'sideEffects'
  },
  {
    id: '4',
    title: 'Building Herd Immunity Through Vaccination',
    author: 'Dr. Vikram Malhotra (Immunologist)',
    content: 'When enough people in a community are vaccinated, it creates "herd immunity" - protecting even those who cannot be vaccinated due to medical reasons. This is why maintaining high vaccination rates is crucial for public health.',
    category: 'general'
  },
  {
    id: '5',
    title: 'Painless vs Standard Vaccines: Making the Right Choice',
    author: 'Dr. Priya Nair',
    content: 'Painless vaccines use acellular formulation, reducing post-vaccination discomfort. While slightly more expensive, they offer the same protection with fewer side effects like fever and pain. Standard whole-cell vaccines are equally effective but may cause more temporary discomfort.',
    category: 'painless'
  }
];

export interface SideEffectGuidance {
  id: string;
  symptom: string;
  care: string;
  whenToSeekHelp: string;
}

export const sideEffectGuidance: SideEffectGuidance[] = [
  {
    id: '1',
    symptom: 'Mild Fever (Below 101°F)',
    care: 'Use paracetamol if prescribed by doctor. Keep child well-hydrated. Dress in light clothing. Monitor temperature every 4 hours.',
    whenToSeekHelp: 'Fever persists beyond 48 hours or exceeds 102°F'
  },
  {
    id: '2',
    symptom: 'Swelling at Injection Site',
    care: 'Apply cold compress for 10-15 minutes several times a day. Avoid massaging the area. Keep the site clean and dry.',
    whenToSeekHelp: 'Swelling increases after 48 hours or shows signs of infection'
  },
  {
    id: '3',
    symptom: 'Irritability and Fussiness',
    care: 'This is a normal immune response. Provide extra comfort and cuddles. Maintain normal feeding schedule. Ensure adequate rest.',
    whenToSeekHelp: 'Child is inconsolable or shows unusual behavior beyond 72 hours'
  },
  {
    id: '4',
    symptom: 'Loss of Appetite',
    care: 'Offer smaller, frequent meals. Keep child hydrated with breast milk, formula, or water. Don\'t force feeding.',
    whenToSeekHelp: 'Child refuses all fluids or shows signs of dehydration'
  },
  {
    id: '5',
    symptom: 'Drowsiness',
    care: 'Allow extra sleep. This is normal as the body builds immunity. Maintain a calm environment.',
    whenToSeekHelp: 'Child is difficult to wake or unusually lethargic beyond 24 hours'
  }
];

export interface VaccineComparison {
  aspect: string;
  painless: string;
  standard: string;
}

export const vaccineComparison: VaccineComparison[] = [
  {
    aspect: 'Formulation',
    painless: 'Acellular (purified antigens)',
    standard: 'Whole-cell (complete bacteria)'
  },
  {
    aspect: 'Post-vaccine Fever',
    painless: 'Less common (10-15%)',
    standard: 'More common (30-40%)'
  },
  {
    aspect: 'Pain & Swelling',
    painless: 'Minimal discomfort',
    standard: 'Moderate discomfort'
  },
  {
    aspect: 'Immune Response',
    painless: 'Strong & effective',
    standard: 'Strong & effective'
  },
  {
    aspect: 'Safety',
    painless: 'Excellent',
    standard: 'Excellent'
  },
  {
    aspect: 'Cost',
    painless: '₹1500-2500 per dose',
    standard: 'Free at government centers'
  },
  {
    aspect: 'Recommended For',
    painless: 'All children, especially those with previous reactions',
    standard: 'All children'
  }
];

export const missedVaccineGuidance = {
  title: 'What to Do If You Miss a Vaccine',
  content: 'If you miss a scheduled vaccination, don\'t panic. Here\'s what you need to know:',
  guidelines: [
    {
      point: 'DO NOT restart the entire schedule',
      explanation: 'Your child doesn\'t need to start over. The vaccines already given provide lasting immunity.'
    },
    {
      point: 'Continue from where you left off',
      explanation: 'Your doctor will resume the schedule from the missed dose. There\'s no need to repeat previously administered vaccines.'
    },
    {
      point: 'Catch-up vaccination is safe',
      explanation: 'Getting vaccines later than scheduled is safe and recommended. While timely vaccination is ideal, late vaccination is better than no vaccination.'
    },
    {
      point: 'Consult your pediatrician',
      explanation: 'Your doctor will create a catch-up schedule based on your child\'s age and vaccination history.'
    },
    {
      point: 'Minimum interval matters',
      explanation: 'Some vaccines require minimum intervals between doses. Your doctor will ensure proper spacing.'
    }
  ],
  urgentCases: [
    'If multiple vaccines are missed, prioritize high-risk vaccines first',
    'For children traveling to high-risk areas, expedited schedules may be needed',
    'During disease outbreaks, certain vaccines may be prioritized'
  ]
};

export interface VaccinationCenter {
  id: string;
  name: string;
  city: string;
  area: string;
  type: 'painless' | 'standard' | 'both';
  rating: number;
  distance: string;
  address: string;
  phone: string;
  timings: string;
}

export const vaccinationCenters: VaccinationCenter[] = [
  {
    id: '1',
    name: 'CityCare Clinic',
    city: 'Mumbai',
    area: 'Andheri West',
    type: 'both',
    rating: 4.5,
    distance: '2.1 km',
    address: 'Plot 45, Veera Desai Road, Andheri West',
    phone: '+91 22 2674 5678',
    timings: 'Mon-Sat: 9 AM - 6 PM'
  },
  {
    id: '2',
    name: 'HealthFirst Center',
    city: 'Pune',
    area: 'Kothrud',
    type: 'standard',
    rating: 4.2,
    distance: '3.4 km',
    address: 'Survey No. 12, Kothrud Main Road',
    phone: '+91 20 2542 8901',
    timings: 'Mon-Fri: 8 AM - 5 PM'
  },
  {
    id: '3',
    name: 'Rainbow Children\'s Hospital',
    city: 'Bangalore',
    area: 'Marathahalli',
    type: 'both',
    rating: 4.8,
    distance: '1.5 km',
    address: '#123, Outer Ring Road, Marathahalli',
    phone: '+91 80 4112 3456',
    timings: 'Mon-Sun: 8 AM - 8 PM'
  },
  {
    id: '4',
    name: 'Apollo Clinic',
    city: 'Delhi',
    area: 'Rohini',
    type: 'both',
    rating: 4.6,
    distance: '4.2 km',
    address: 'Sector 14, Rohini',
    phone: '+91 11 2734 5678',
    timings: 'Mon-Sat: 9 AM - 7 PM'
  },
  {
    id: '5',
    name: 'Motherhood Hospital',
    city: 'Chennai',
    area: 'Anna Nagar',
    type: 'painless',
    rating: 4.7,
    distance: '2.8 km',
    address: '2nd Avenue, Anna Nagar',
    phone: '+91 44 2345 6789',
    timings: 'Mon-Sun: 7 AM - 9 PM'
  },
  {
    id: '6',
    name: 'Government Primary Health Center',
    city: 'Mumbai',
    area: 'Borivali East',
    type: 'standard',
    rating: 4.0,
    distance: '5.1 km',
    address: 'Near Railway Station, Borivali East',
    phone: '+91 22 2890 1234',
    timings: 'Mon-Fri: 10 AM - 4 PM'
  },
  {
    id: '7',
    name: 'Kidscare Vaccination Center',
    city: 'Pune',
    area: 'Viman Nagar',
    type: 'both',
    rating: 4.4,
    distance: '1.9 km',
    address: 'Phoenix Market City, Viman Nagar',
    phone: '+91 20 6789 0123',
    timings: 'Mon-Sun: 10 AM - 8 PM'
  },
  {
    id: '8',
    name: 'Fortis Hospital',
    city: 'Bangalore',
    area: 'Bannerghatta Road',
    type: 'both',
    rating: 4.9,
    distance: '6.3 km',
    address: '154/9, Bannerghatta Road',
    phone: '+91 80 6621 4444',
    timings: 'Mon-Sun: 24 Hours'
  },
  {
    id: '9',
    name: 'Max Healthcare',
    city: 'Delhi',
    area: 'Saket',
    type: 'painless',
    rating: 4.7,
    distance: '3.7 km',
    address: '1, Press Enclave Road, Saket',
    phone: '+91 11 2651 5050',
    timings: 'Mon-Sat: 8 AM - 8 PM'
  },
  {
    id: '10',
    name: 'Kauvery Hospital',
    city: 'Chennai',
    area: 'Alwarpet',
    type: 'both',
    rating: 4.5,
    distance: '2.3 km',
    address: '81, TTK Road, Alwarpet',
    phone: '+91 44 4000 6000',
    timings: 'Mon-Sun: 24 Hours'
  },
  {
    id: '11',
    name: 'BabyFirst Clinic',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    type: 'both',
    rating: 4.6,
    distance: '2.0 km',
    address: 'Road No. 12, Banjara Hills',
    phone: '+91 40 2345 6789',
    timings: 'Mon-Sat: 9 AM - 6 PM'
  },
  {
    id: '12',
    name: 'Lotus Children Hospital',
    city: 'Kolkata',
    area: 'Salt Lake',
    type: 'both',
    rating: 4.3,
    distance: '4.5 km',
    address: 'Block-EP, Sector V, Salt Lake',
    phone: '+91 33 2357 8901',
    timings: 'Mon-Sun: 8 AM - 8 PM'
  }
];
