import { articles, sideEffectGuidance, vaccineComparison, missedVaccineGuidance, vaccinationCenters } from '../../data/educationData';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Comprehensive vaccine information database
const vaccineInfoDatabase: Record<string, { name: string; description: string; schedule: string; sideEffects: string; precautions: string; }> = {
  'bcg': {
    name: 'BCG (Bacillus Calmette-Guérin)',
    description: 'The BCG vaccine protects against tuberculosis (TB), particularly severe forms like TB meningitis.',
    schedule: 'Given at birth (0 days). Single dose.',
    sideEffects: 'Usually mild - a small bump at injection site that heals in weeks, possible mild fever. Scar formation is normal.',
    precautions: 'Not given if baby weighs less than 2kg or has immune system problems. Inform doctor about family TB history.'
  },
  'opv': {
    name: 'OPV (Oral Polio Vaccine)',
    description: 'OPV protects against poliomyelitis (polio), a crippling disease. Given orally - easy and needle-free.',
    schedule: 'OPV 0 at birth, OPV 1 at 6 weeks, OPV 2 at 10 weeks, OPV 3 at 14 weeks, OPV Booster at 18 months.',
    sideEffects: 'Very rare - may cause mild fever or diarrhea for 1-2 days.',
    precautions: 'Give on empty stomach. Avoid feeding for 30 minutes after. Not for children with immune disorders.'
  },
  'dpt': {
    name: 'DPT (Diphtheria, Pertussis, Tetanus)',
    description: 'Combination vaccine protecting against three serious diseases: Diphtheria, Pertussis (whooping cough), and Tetanus (lockjaw).',
    schedule: 'DPT 1 at 6 weeks, DPT 2 at 10 weeks, DPT 3 at 14 weeks, DPT Booster 1 at 18 months, DPT Booster 2 at 5 years.',
    sideEffects: 'Common: mild fever, redness/swelling at site, fussiness. Rare: high fever above 104F, seizure.',
    precautions: 'Inform doctor if child had severe reaction to previous DPT dose. Paracetamol can help with fever.'
  },
  'hepatitis-b': {
    name: 'Hepatitis B',
    description: 'Protects against Hepatitis B virus that causes liver infection, cirrhosis, and liver cancer.',
    schedule: 'Hepatitis B (birth dose) within 24 hours of birth, Hepatitis B 1 at 6 weeks, Hepatitis B 2 at 10 weeks, Hepatitis B 3 at 14 weeks.',
    sideEffects: 'Mild: soreness at site, mild fever. Very rare: severe allergic reaction.',
    precautions: 'Can be given with other vaccines. Important for babies whose mother is Hepatitis B positive.'
  },
  'hib': {
    name: 'Hib (Haemophilus influenzae type b)',
    description: 'Protects against Haemophilus influenzae type b bacteria causing serious illnesses like meningitis, pneumonia, and blood infections.',
    schedule: 'Hib 1 at 6 weeks, Hib 2 at 10 weeks, Hib 3 at 14 weeks, Hib Booster at 18 months.',
    sideEffects: 'Mild fever, redness at injection site. Rare: severe allergic reaction.',
    precautions: 'Important for children under 5 years. Can be given with other vaccines.'
  },
  'rotavirus': {
    name: 'Rotavirus',
    description: 'Protects against rotavirus - the leading cause of severe diarrhea in infants and young children worldwide.',
    schedule: 'Rotavirus 1 at 6 weeks, Rotavirus 2 at 10 weeks, Rotavirus 3 at 14 weeks.',
    sideEffects: 'Mild diarrhea or fever, irritability. Very rare: intussusception (bowel blockage).',
    precautions: 'First dose should be given before 15 weeks. Last dose by 8 months. Oral vaccine, not injected.'
  },
  'pcv': {
    name: 'PCV (Pneumococcal Conjugate Vaccine)',
    description: 'Protects against pneumococcal bacteria causing pneumonia, meningitis, ear infections, and blood infections.',
    schedule: 'PCV 1 at 6 weeks, PCV 2 at 10 weeks, PCV 3 at 14 weeks, PCV Booster at 18 months.',
    sideEffects: 'Mild fever, drowsiness, redness at site. Rare: high fever, seizure.',
    precautions: 'Important for children in daycare. Can be given with other vaccines.'
  },
  'mmr': {
    name: 'MMR (Measles, Mumps, Rubella)',
    description: 'Combined vaccine protecting against three viral diseases: Measles, Mumps, and Rubella (German measles).',
    schedule: 'MMR 1 at 9 months, MMR 2 at 18 months. Some schedules include at 15 months.',
    sideEffects: 'Mild fever, rash, swollen glands 7-12 days later. Rare: temporary joint pain, low platelet count.',
    precautions: 'Not given during pregnancy. Wait 1 month after any live vaccine. Inform about egg allergy.'
  },
  'varicella': {
    name: 'Varicella (Chickenpox)',
    description: 'Protects against chickenpox - a highly contagious viral infection causing itchy rash, blisters, and fever.',
    schedule: 'Varicella 1 at 18 months, Varicella 2 at 5 years.',
    sideEffects: 'Mild rash (few spots), fever. Rare: severe rash, pneumonia.',
    precautions: 'Not for pregnant women. Inform about immune disorders. Can cause mild shingles later.'
  },
  'hepatitis-a': {
    name: 'Hepatitis A',
    description: 'Protects against Hepatitis A virus causing liver infection. Spread through contaminated food/water.',
    schedule: 'Hepatitis A 1 at 12 months, Hepatitis A 2 at 18 months (6 months after first dose).',
    sideEffects: 'Mild fever, soreness at site, loss of appetite. Rare: severe liver problems.',
    precautions: 'Inactivated (dead) vaccine - safe for immunocompromised. Good hygiene still important.'
  },
  'typhoid': {
    name: 'Typhoid Conjugate Vaccine',
    description: 'Protects against Salmonella Typhi bacteria causing typhoid fever - serious illness with high fever, stomach pain.',
    schedule: 'Single dose at 9 months (or 2 years depending on region). Booster every 2 years for high-risk areas.',
    sideEffects: 'Mild fever, headache, abdominal pain. Rare: severe reaction.',
    precautions: 'Important for children in endemic areas. Not 100% effective - food/water safety still matters.'
  },
  'td': {
    name: 'Td (Tetanus, Diphtheria)',
    description: 'Booster vaccine for tetanus and diphtheria protection for older children and adults.',
    schedule: 'Td at 10 years, Td Booster at 16 years, then every 10 years throughout life.',
    sideEffects: 'Sore arm, mild fever. Rare: severe allergic reaction.',
    precautions: 'Important for pregnant women (safe). Keep tetanus boosters up to date throughout life.'
  },
  'influenza': {
    name: 'Influenza (Flu Vaccine)',
    description: 'Protects against seasonal flu viruses. Recommended annually for everyone above 6 months.',
    schedule: 'Annual vaccination. Children under 9 getting first time need 2 doses 1 month apart.',
    sideEffects: 'Mild fever, soreness at site, muscle aches. Rare: severe allergic reaction.',
    precautions: 'Egg-allergic people can now receive flu vaccine. Important for asthmatic children.'
  },
  'covid': {
    name: 'COVID-19 Vaccine',
    description: 'Protects against SARS-CoV-2 virus causing COVID-19. Various vaccines available for different age groups.',
    schedule: 'Varies by age and vaccine type. Consult latest national guidelines.',
    sideEffects: 'Fatigue, headache, sore arm, mild fever. Rare: myocarditis in young males.',
    precautions: 'Inform about previous COVID infection. Wait 3 months after infection. Consult for specific conditions.'
  }
};

// Comprehensive symptom database
const symptomDatabase: Record<string, { symptom: string; description: string; care: string; whenToSeekHelp: string; }> = {
  'fever': {
    symptom: 'Fever',
    description: 'Temperature above 100.4F (38C). Common after vaccinations as immune system responds.',
    care: 'Give paracetamol as prescribed. Keep child in light clothing. Ensure adequate fluids. Sponge with lukewarm water. Monitor temperature every 4 hours. Keep room comfortable.',
    whenToSeekHelp: 'Fever above 102F (39C). Lasts more than 48 hours. Accompanied by severe crying. Signs of dehydration. Child seems very lethargic.'
  },
  'pain': {
    symptom: 'Pain/Soreness at Injection Site',
    description: 'Localized pain, tenderness, or swelling where the vaccine was given.',
    care: 'Apply cold compress for 10-15 minutes. Keep arm/leg moving gently. Paracetamol for discomfort. Avoid massaging the area. Loose clothing helps.',
    whenToSeekHelp: 'Severe pain not relieved by medication. Swelling increases after 48 hours. Signs of infection. Child refuses to move limb.'
  },
  'swelling': {
    symptom: 'Swelling/Redness',
    description: 'Local reaction at injection site - common and usually indicates immune response.',
    care: 'Cold compress 3-4 times daily. Pat dry, do not rub. Keep area clean. Benadryl (if doctor approves). Monitor for changes.',
    whenToSeekHelp: 'Swelling larger than 3 inches. Redness spreads beyond 2 inches. Shows signs of infection. Does not improve after 3 days.'
  },
  'irritability': {
    symptom: 'Irritability/Fussiness',
    description: 'Increased crying, fussiness, or general discomfort - normal immune response.',
    care: 'Extra cuddles and comfort. Maintain normal feeding schedule. Quiet, calm environment. Distract with toys. Soft music helps.',
    whenToSeekHelp: 'Inconsolable for more than 3 hours. Unusual high-pitched crying. Accompanied by fever. Lasts beyond 72 hours.'
  },
  'drowsiness': {
    symptom: 'Drowsiness/Fatigue',
    description: 'Baby seems sleepier than usual - body working on building immunity.',
    care: 'Let baby sleep naturally. Wake for feeds if needed. Keep environment calm. Normal sleep patterns return in 24-48 hours.',
    whenToSeekHelp: 'Difficult to wake. Very limp/lethargic. Not feeding well. Lasts more than 24 hours.'
  },
  'rash': {
    symptom: 'Rash',
    description: 'Skin rash that may appear days after vaccination. Usually mild and self-limiting.',
    care: 'Calamine lotion for itching. Keep nails short to prevent scratching. Loose cotton clothing. Avoid tight/dense fabrics. Monitor for changes.',
    whenToSeekHelp: 'Rash spreading rapidly. Breathing difficulties. Swelling of face/throat. Blisters or fluid-filled spots. Accompanied by fever.'
  },
  'vomiting': {
    symptom: 'Vomiting',
    description: 'Forceful expulsion of stomach contents. Less common but can occur after vaccines.',
    care: 'Small, frequent feeds. Oral rehydration solutions. Keep upright after feeding. Monitor for dehydration.',
    whenToSeekHelp: 'Repeated vomiting. Signs of dehydration. Blood in vomit. Unable to keep fluids down. Accompanied by high fever.'
  },
  'diarrhea': {
    symptom: 'Diarrhea',
    description: 'Loose/watery stools, especially common after rotavirus vaccine.',
    care: 'Continue breastfeeding/formula. ORS solution for hydration. Light, easy foods. Keep bottom clean and dry. Monitor frequency.',
    whenToSeekHelp: 'Blood in stool. Signs of dehydration. More than 10 watery stools. Lasts more than 3 days. Accompanied by high fever.'
  }
};

// Healthcare precautions database
const precautionDatabase: Record<string, { title: string; content: string; }> = {
  'before-vaccination': {
    title: 'Before Vaccination',
    content: '1. Ensure child is healthy - no high fever (over 101F). 2. Inform doctor about allergies. 3. Bring vaccination card. 4. Dress in comfortable, loose clothes. 5. Keep child hydrated. 6. Bring favorite toy for comfort. 7. Know child weight. 8. List any medications being given.'
  },
  'after-vaccination': {
    title: 'After Vaccination Care',
    content: '1. Wait 15-30 minutes at clinic for observation. 2. Continue breastfeeding. 3. Give prescribed paracetamol for fever. 4. Apply cold compress for swelling. 5. Keep injection site dry for 24 hours. 6. Monitor for unusual symptoms. 7. Keep vaccination record updated. 8. Rest is important.'
  },
  'breastfeeding': {
    title: 'Breastfeeding and Vaccination',
    content: 'Continue breastfeeding before and after. Can nurse during/after injection. Provides comfort and pain relief. Transfers antibodies (minor). No need to express or pump. Mothers diet does not affect vaccine. Stay hydrated yourself.'
  },
  'bathing': {
    title: 'Bathing After Vaccination',
    content: 'Can give bath after 24 hours. Use lukewarm (not hot) water. Gently pat dry injection site. Avoid scrubbing the area. No hot water on swollen area. Do not use soap directly on site. If fever, sponge with lukewarm water.'
  },
  'exercise': {
    title: 'Activity After Vaccination',
    content: 'Light activity is fine. Gentle movement helps with soreness. Normal play after 24 hours. Rest is important first day. Avoid strenuous exercise 24-48 hours. Do not let child overexert. Watch for limping (leg vaccines).'
  },
  'medications': {
    title: 'Medications After Vaccination',
    content: 'Paracetamol for fever/pain (as prescribed). Ibuprofen after 6 months (doctor approved). Do not give aspirin to children. Continue regular medications. Inform about all current medicines. No new supplements without doctor. Topical creams for site (doctor recommended).'
  },
  'travel': {
    title: 'Travel and Vaccination',
    content: 'Complete vaccines 2-4 weeks before travel. Some vaccines need time to work. Check destination vaccine requirements. Carry vaccination certificate. Consider travel vaccines separately. Consult doctor 6-8 weeks before. Some vaccines can be given together.'
  },
  'allergy': {
    title: 'Allergy Concerns',
    content: 'Inform doctor about: Egg allergy (most vaccines safe now). Previous vaccine reactions. Latex allergy. Gelatin allergy. Any known drug allergies. Family history of reactions. Most allergic children can be vaccinated safely with proper precautions.'
  }
};

interface ResponsePattern {
  keywords: string[];
  response: string | (() => string);
}

// Default responses
const defaultResponses: ResponsePattern[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening'],
    response: "Hello! I am your VacciCare health assistant. I can help you with: Vaccine information and schedules. Side effects and home care. Finding vaccination centers. Catch-up vaccination. Painless vs standard vaccines. General health questions. What would you like to know?"
  },
  {
    keywords: ['help', 'what can you do', 'capabilities', 'assist', 'support'],
    response: "I am here to help with vaccination and health questions. I can tell you about: Individual vaccines (BCG, DPT, MMR, etc.). Side effects and how to manage them. Vaccination schedules. Healthcare precautions. Finding nearby centers. What to do if you miss a vaccine. Just ask me anything!"
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'thank you'],
    response: "You are welcome! Is there anything else about vaccinations or child health I would be happy to help with?"
  },
  {
    keywords: ['bye', 'goodbye', 'exit', 'see you', 'talk later'],
    response: "Goodbye! Take care and stay healthy! Remember to keep your vaccinations up to date. Feel free to come back anytime!"
  },
  {
    keywords: ['ok', 'okay', 'sure', 'yes', 'yeah'],
    response: "Great! Let me know if you have more questions about vaccinations or child health."
  },
  {
    keywords: ['who are you', 'what are you', 'your name'],
    response: "I am the VacciCare Assistant, designed to help you with: Vaccination information. Health symptom guidance. Scheduling questions. Healthcare resources. I am here to make vaccination easy to understand!"
  }
];

// Enhanced vaccine responses
const vaccineResponses: ResponsePattern[] = [
  {
    keywords: ['vaccine', 'vaccination', 'immunization', 'dose', 'jab', 'shot'],
    response: "Vaccines are essential for protecting against serious diseases. Here is an overview: At birth: BCG, OPV, Hepatitis B. 6 weeks: DPT, OPV, Rotavirus, PCV, Hib. 10 weeks: DPT 2, OPV 2. 14 weeks: DPT 3, OPV 3. 9 months: MMR, Typhoid. 18 months: DPT Booster, MMR 2. Would you like specific information about any vaccine?"
  },
  {
    keywords: ['schedule', 'timing', 'when to vaccinate', 'due date', 'calendar'],
    response: "Standard Vaccination Schedule: AT BIRTH: BCG (Tuberculosis), OPV 0 (Polio), Hepatitis B (Birth dose). 6 WEEKS: DPT 1, OPV 1, Hepatitis B 1, Hib 1, Rotavirus 1, PCV 1. 10 WEEKS: DPT 2, OPV 2, Hep B 2, Hib 2, Rotavirus 2, PCV 2. 14 WEEKS: DPT 3, OPV 3, Hep B 3, Hib 3, Rotavirus 3, PCV 3. 9 MONTHS: MMR 1, Typhoid. 18 MONTHS: DPT Booster 1, OPV Booster, MMR 2, Varicella 1, Hep A 1. 5 YEARS: DPT Booster 2, Varicella 2. 10 YEARS: Td. Would you like details about a specific vaccine?"
  },
  {
    keywords: ['missed', 'missed vaccine', 'delay', 'delayed', 'late', 'skip', 'forgot', 'catch up'],
    response: "What to Do If You Miss a Vaccine: DO NOT PANIC - vaccines can be caught up. Your child does not need to restart the schedule. Continue from where you left off. Catch-up vaccination is safe. Guidelines: Do not restart - previous doses count. Doctor will create catch-up schedule. Some vaccines need minimum intervals. Late vaccination is better than no vaccination. For urgent cases: Prioritize high-risk vaccines first. Expedited schedules for travel. Consult pediatrician immediately."
  },
  {
    keywords: ['painless', 'pain-free', 'acellular', 'comfort', 'no pain'],
    response: (() => {
      let r = "Painless vs Standard Vaccines: ";
      vaccineComparison.forEach(c => {
        r += c.aspect + ": " + c.painless + " (Painless) vs " + c.standard + " (Standard). ";
      });
      r += "Cost: Free at government centers, Rs 1500-2500 per dose (private)";
      return r;
    })()
  },
  {
    keywords: ['cost', 'price', 'fee', 'free', 'expensive', 'charge'],
    response: "Vaccine Costs: GOVERNMENT CENTERS (Free): All standard vaccines - BCG, OPV, DPT, Hepatitis B, MMR, Typhoid - Free for all. PRIVATE CLINICS: Painless DPT: Rs 1500-2500/dose. Combination vaccines: Rs 2000-4000. Additional vaccines: Varies. Tips: Government vaccines are equally effective. Insurance may cover some vaccines. Compare prices at different clinics."
  },
  {
    keywords: ['bcg', 'tb', 'tuberculosis'],
    response: (() => {
      const info = vaccineInfoDatabase['bcg'];
      return "BCG Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['dpt', 'diphtheria', 'pertussis', 'tetanus', 'whooping cough', 'lockjaw'],
    response: (() => {
      const info = vaccineInfoDatabase['dpt'];
      return "DPT Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['polio', 'opv', 'ipv'],
    response: (() => {
      const info = vaccineInfoDatabase['opv'];
      return "Polio Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['hepatitis b', 'hep b'],
    response: (() => {
      const info = vaccineInfoDatabase['hepatitis-b'];
      return "Hepatitis B: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['mmr', 'measles', 'mumps', 'rubella', 'german measles'],
    response: (() => {
      const info = vaccineInfoDatabase['mmr'];
      return "MMR Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['rotavirus', 'diarrhea'],
    response: (() => {
      const info = vaccineInfoDatabase['rotavirus'];
      return "Rotavirus Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['pneumonia', 'pcv', 'pneumococcal'],
    response: (() => {
      const info = vaccineInfoDatabase['pcv'];
      return "PCV Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['chickenpox', 'varicella'],
    response: (() => {
      const info = vaccineInfoDatabase['varicella'];
      return "Varicella Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['flu', 'influenza'],
    response: (() => {
      const info = vaccineInfoDatabase['influenza'];
      return "Flu Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['covid', 'coronavirus', 'covishield', 'covaxin'],
    response: (() => {
      const info = vaccineInfoDatabase['covid'];
      return "COVID-19 Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['typhoid'],
    response: (() => {
      const info = vaccineInfoDatabase['typhoid'];
      return "Typhoid Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  },
  {
    keywords: ['hepatitis a', 'hep a'],
    response: (() => {
      const info = vaccineInfoDatabase['hepatitis-a'];
      return "Hepatitis A Vaccine: " + info.name + ". Description: " + info.description + ". Schedule: " + info.schedule + ". Side Effects: " + info.sideEffects + ". Precautions: " + info.precautions;
    })()
  }
];

// Enhanced side effect responses
const sideEffectResponses: ResponsePattern[] = [
  {
    keywords: ['side effect', 'side effects', 'reaction', 'adverse', 'after vaccine'],
    response: "Common Vaccine Side Effects: Most side effects are mild and temporary: 1. Fever (Common). 2. Soreness at injection site. 3. Swelling/Redness. 4. Irritability/Fussiness. 5. Drowsiness. 6. Loss of appetite. Would you like specific guidance for any symptom?"
  },
  {
    keywords: ['fever', 'temperature', 'high temperature', 'hot'],
    response: (() => {
      const info = symptomDatabase['fever'];
      return "Fever: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['swelling', 'redness', 'injection site', 'bump', 'lump'],
    response: (() => {
      const info = symptomDatabase['swelling'];
      return "Swelling/Redness: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['pain', 'soreness', 'tender', 'hurt'],
    response: (() => {
      const info = symptomDatabase['pain'];
      return "Pain: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['irritability', 'fussy', 'crying', 'unsettled', 'fussiness'],
    response: (() => {
      const info = symptomDatabase['irritability'];
      return "Irritability: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['drowsy', 'sleepy', 'tired', 'lethargy', 'fatigue'],
    response: (() => {
      const info = symptomDatabase['drowsiness'];
      return "Drowsiness: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['rash', 'skin', 'spots', 'hives'],
    response: (() => {
      const info = symptomDatabase['rash'];
      return "Rash: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['vomit', 'vomiting', 'throw up'],
    response: (() => {
      const info = symptomDatabase['vomiting'];
      return "Vomiting: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['diarrhea', 'loose stool', 'watery stool'],
    response: (() => {
      const info = symptomDatabase['diarrhea'];
      return "Diarrhea: " + info.description + " Home Care: " + info.care + " Seek Help If: " + info.whenToSeekHelp;
    })()
  },
  {
    keywords: ['allergy', 'allergic', 'anaphylaxis', 'severe reaction', 'emergency'],
    response: "Severe Allergic Reactions (Anaphylaxis): VERY RARE but important to know. Signs (usually within minutes): Difficulty breathing. Swelling of face/throat. Rapid heartbeat. Dizziness/fainting. Severe rash/hives. What to Do: Seek immediate medical help. Call emergency services. If you have epinephrine, use it. Keep child lying down with legs elevated. Note: Severe reactions are extremely rare. Medical staff observe children for 15-30 minutes after vaccination precisely for this reason."
  },
  {
    keywords: ['paracetamol', 'calpol', 'acetaminophen', 'dolo', 'fever medicine'],
    response: "Using Paracetamol After Vaccination: YES, it is safe and recommended for: Fever above 100.4F. Irritability/discomfort. Pain at injection site. Dosage: Weight-based (usually 10-15mg/kg). Can give every 4-6 hours. Max 4 doses in 24 hours. IMPORTANT: Always follow doctor prescription. Do not exceed recommended dose. For infants, use drops/syrup. Can give before vaccination (per doctor). Do NOT give aspirin to children."
  }
];

// Healthcare precautions responses
const healthcareResponses: ResponsePattern[] = [
  {
    keywords: ['precaution', 'precautions', 'before vaccination', 'preparing', 'preparation'],
    response: (() => {
      const info = precautionDatabase['before-vaccination'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['after vaccination', 'post vaccination', 'after shot', 'post vaccine care'],
    response: (() => {
      const info = precautionDatabase['after-vaccination'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['breastfeeding', 'nursing', 'breast milk', 'feed'],
    response: (() => {
      const info = precautionDatabase['breastfeeding'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['bath', 'shower', 'wash', 'clean'],
    response: (() => {
      const info = precautionDatabase['bathing'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['exercise', 'play', 'activity', 'run', 'walk'],
    response: (() => {
      const info = precautionDatabase['exercise'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['medicine', 'medication', 'drug', 'tablet', 'syrup'],
    response: (() => {
      const info = precautionDatabase['medications'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['doctor', 'pediatrician', 'consult', 'specialist', 'clinic visit'],
    response: "Consulting Your Doctor: You should consult your pediatrician for: Specific vaccine recommendations. Managing side effects. Catch-up schedules. Any health concerns. Allergies/conditions. Travel vaccinations. Booster shots. Tips: Keep vaccination card ready. List all questions before visit. Note any unusual symptoms. Ask about next appointment. Would you like help finding vaccination centers?"
  },
  {
    keywords: ['center', 'clinic', 'hospital', 'nearby', 'location', 'where to get', 'find'],
    response: "Vaccination Centers: " + vaccinationCenters.slice(0, 5).map(c =>
      c.name + " - " + c.area + ", " + c.city + ". Rating: " + c.rating + ". Phone: " + c.phone + ". Timings: " + c.timings
    ).join(". ") + ". You can search online for more centers near you or check with your local government health center."
  },
  {
    keywords: ['travel', 'trip', 'abroad', 'overseas', 'flight'],
    response: (() => {
      const info = precautionDatabase['travel'];
      return info.title + ": " + info.content;
    })()
  },
  {
    keywords: ['allergy', 'allergic', 'sensitive'],
    response: (() => {
      const info = precautionDatabase['allergy'];
      return info.title + ": " + info.content;
    })()
  }
];

// Function to get response based on user input
export function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Combine all response patterns
  const allPatterns: ResponsePattern[] = [
    ...defaultResponses,
    ...vaccineResponses,
    ...sideEffectResponses,
    ...healthcareResponses
  ];

  // Find matching pattern
  for (const pattern of allPatterns) {
    for (const keyword of pattern.keywords) {
      if (message.includes(keyword)) {
        // Handle dynamic responses
        if (typeof pattern.response === 'function') {
          return pattern.response();
        }
        return pattern.response;
      }
    }
  }

  // Default fallback response with helpful suggestions
  return "I am here to help with vaccination and health questions. You can ask me about: Vaccines - Individual vaccines (BCG, DPT, MMR, etc.), Vaccination schedules, Missed vaccines and catch-up. Side Effects - Fever management, Pain and swelling, Rash, diarrhea, vomiting. Healthcare - Pre/post vaccination care, Finding vaccination centers, Breastfeeding and bathing. What would you like to know?";
}

export const welcomeMessage: Message = {
  id: 'welcome',
  text: "Hello! I am your VacciCare Assistant. I can help you with: Vaccines and Schedules. Side Effects and Care. Healthcare Precautions. Finding Centers. How can I help you today?",
  sender: 'bot',
  timestamp: new Date()
};
