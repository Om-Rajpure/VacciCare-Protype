/**
 * Comprehensive Vaccine Information Database
 * Data sourced from WHO, CDC, and Indian Ministry of Health & Family Welfare
 * Universal Immunization Programme (UIP) guidelines
 */

export interface VaccineInfo {
  name: string;
  purpose: string;
  commonSymptoms: string[];
  seriousSymptoms: string[];
  precautions: string[];
  whenToConsultDoctor: string[];
}

export const vaccineInfoDatabase: Record<string, VaccineInfo> = {
  'BCG': {
    name: 'BCG (Bacillus Calmette-Guérin)',
    purpose: 'Protects against tuberculosis (TB), particularly severe forms like meningitis TB in children.',
    commonSymptoms: [
      'Mild fever lasting 1-2 days',
      'Swelling or redness at injection site',
      'Small lump (papule) at injection site',
      'Mild irritability in infants'
    ],
    seriousSymptoms: [
      'High fever (above 101°F/38.5°C)',
      'Severe swelling or pus at injection site',
      'Swollen lymph nodes in armpit or neck',
      'Persistent crying or unusual fussiness'
    ],
    precautions: [
      'Keep the injection site clean and dry',
      'Do not apply any creams or ointments',
      'Do not scratch or rub the injection site',
      'Avoid covering with tight bandages',
      'Dress baby in loose, comfortable clothing'
    ],
    whenToConsultDoctor: [
      'Fever persists beyond 48 hours',
      'Large swelling or pus develops at injection site',
      'Lymph nodes become noticeably enlarged',
      'Baby shows signs of severe distress',
      'Any unusual symptoms concern you'
    ]
  },
  'OPV 0': {
    name: 'OPV (Oral Polio Vaccine) - Birth Dose',
    purpose: 'Protects against poliomyelitis (polio), a disabling and life-threatening viral disease.',
    commonSymptoms: [
      'Mild fever',
      'Fussiness or mild irritability',
      'Temporary loss of appetite',
      'Vomiting shortly after vaccination'
    ],
    seriousSymptoms: [
      'High fever (above 102°F)',
      'Severe vomiting or diarrhea',
      'Signs of paralysis',
      'Seizures'
    ],
    precautions: [
      'Breastfeeding can continue normally',
      'Wait 30 minutes before feeding after vaccination',
      'Keep baby warm but not overheated',
      'Monitor for fever',
      'Maintain hygiene when handling baby'
    ],
    whenToConsultDoctor: [
      'High fever or persistent vomiting',
      'Signs of weakness or paralysis',
      'Seizures or convulsions',
      'Baby refuses to feed for extended period'
    ]
  },
  'OPV 1': {
    name: 'OPV (Oral Polio Vaccine) - Dose 1',
    purpose: 'First dose of polio vaccination to build immunity against poliovirus.',
    commonSymptoms: [
      'Mild fever',
      'Fussiness',
      'Temporary decrease in appetite',
      'Mild diarrhea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe diarrhea with dehydration',
      'Signs of polio-like symptoms',
      'Persistent vomiting'
    ],
    precautions: [
      'Continue normal feeding routines',
      'Monitor temperature',
      'Keep hydrated',
      'Wash hands thoroughly after diaper changes'
    ],
    whenToConsultDoctor: [
      'High fever (above 102°F)',
      'Severe or bloody diarrhea',
      'Signs of dehydration',
      'Weakness in limbs'
    ]
  },
  'OPV 2': {
    name: 'OPV (Oral Polio Vaccine) - Dose 2',
    purpose: 'Second dose to strengthen and maintain immunity against poliovirus.',
    commonSymptoms: [
      'Mild fever',
      'Mild irritability',
      'Temporary loss of appetite',
      'Mild diarrhea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe vomiting',
      'Signs of paralysis',
      'Seizures'
    ],
    precautions: [
      'Continue regular feeding',
      'Monitor for fever',
      'Keep baby comfortable',
      'Maintain hygiene'
    ],
    whenToConsultDoctor: [
      'Persistent high fever',
      'Severe vomiting or diarrhea',
      'Signs of muscle weakness',
      'Any concerning symptoms'
    ]
  },
  'OPV 3': {
    name: 'OPV (Oral Polio Vaccine) - Dose 3',
    purpose: 'Third dose to complete primary polio vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Mild fussiness',
      'Temporary decrease in appetite',
      'Mild diarrhea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe gastrointestinal symptoms',
      'Signs of paralysis',
      'Dehydration'
    ],
    precautions: [
      'Maintain normal feeding schedule',
      'Monitor for any symptoms',
      'Keep baby well-hydrated',
      'Regular temperature checks'
    ],
    whenToConsultDoctor: [
      'High fever persists',
      'Severe vomiting or diarrhea',
      'Signs of weakness or paralysis',
      'Dehydration symptoms'
    ]
  },
  'OPV Booster': {
    name: 'OPV Booster',
    purpose: 'Booster dose to maintain immunity against poliovirus through childhood.',
    commonSymptoms: [
      'Mild fever',
      'Mild irritability',
      'Temporary loss of appetite',
      'Mild diarrhea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe vomiting',
      'Signs of polio-like illness',
      'Seizures'
    ],
    precautions: [
      'Continue normal activities',
      'Monitor temperature',
      'Ensure adequate fluid intake',
      'Maintain good hygiene'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe symptoms',
      'Signs of paralysis',
      'Persistent vomiting'
    ]
  },
  'Hepatitis B (Birth dose)': {
    name: 'Hepatitis B Vaccine (Birth Dose)',
    purpose: 'Prevents Hepatitis B virus infection that can cause liver disease, cirrhosis, and cancer.',
    commonSymptoms: [
      'Mild fever',
      'Soreness at injection site',
      'Redness at injection site',
      'Mild irritability'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe swelling at injection site',
      'Persistent crying',
      'Signs of liver problems (jaundice)'
    ],
    precautions: [
      'Keep injection site clean',
      'Monitor for fever',
      'Breastfeeding can continue',
      'Avoid applying anything to injection site'
    ],
    whenToConsultDoctor: [
      'High fever above 101°F',
      'Excessive crying for more than 3 hours',
      'Signs of jaundice (yellow skin/eyes)',
      'Severe swelling or redness'
    ]
  },
  'Hepatitis B 1': {
    name: 'Hepatitis B Vaccine - Dose 1',
    purpose: 'First dose of Hepatitis B vaccination series to prevent liver infection.',
    commonSymptoms: [
      'Mild fever',
      'Soreness at injection site',
      'Redness or swelling',
      'Fatigue or mild fussiness'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe allergic reaction',
      'Persistent vomiting',
      'Jaundice'
    ],
    precautions: [
      'Keep area clean and dry',
      'Monitor temperature',
      'Normal feeding can continue',
      'Avoid massaging injection site'
    ],
    whenToConsultDoctor: [
      'High fever (above 101°F)',
      'Severe redness or swelling',
      'Persistent vomiting',
      'Yellowing of skin or eyes'
    ]
  },
  'Hepatitis B 2': {
    name: 'Hepatitis B Vaccine - Dose 2',
    purpose: 'Second dose to build continued protection against Hepatitis B.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Mild swelling',
      'Temporary fatigue'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe allergic reaction',
      'Persistent irritability',
      'Liver-related symptoms'
    ],
    precautions: [
      'Continue normal routine',
      'Monitor for symptoms',
      'Keep injection site clean',
      'Ensure adequate rest'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Signs of severe reaction',
      'Persistent symptoms',
      'Jaundice symptoms'
    ]
  },
  'Hepatitis B 3': {
    name: 'Hepatitis B Vaccine - Dose 3',
    purpose: 'Final dose to complete primary Hepatitis B vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Injection site pain',
      'Mild swelling or redness',
      'Fatigue'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe allergic reaction',
      'Persistent vomiting',
      'Signs of liver problems'
    ],
    precautions: [
      'Normal activities can continue',
      'Monitor temperature',
      'Keep injection site clean',
      'Watch for any unusual symptoms'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe allergic reaction symptoms',
      'Persistent vomiting',
      'Jaundice or liver symptoms'
    ]
  },
  'Hepatitis A 1': {
    name: 'Hepatitis A Vaccine - Dose 1',
    purpose: 'Prevents Hepatitis A virus infection, a contagious liver disease.',
    commonSymptoms: [
      'Mild fever',
      'Soreness at injection site',
      'Headache',
      'Fatigue',
      'Loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe headache',
      'Persistent vomiting',
      'Signs of liver problems',
      'Severe allergic reaction'
    ],
    precautions: [
      'Rest if feeling fatigued',
      'Monitor temperature',
      'Keep injection site clean',
      'Maintain hydration',
      'Light meals if appetite is low'
    ],
    whenToConsultDoctor: [
      'High fever above 102°F',
      'Severe or persistent vomiting',
      'Yellowing of skin or eyes',
      'Dark urine',
      'Severe abdominal pain'
    ]
  },
  'Hepatitis A 2': {
    name: 'Hepatitis A Vaccine - Dose 2',
    purpose: 'Booster dose to provide long-term protection against Hepatitis A.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Headache',
      'Fatigue',
      'Mild nausea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe allergic reaction',
      'Persistent vomiting',
      'Liver-related symptoms'
    ],
    precautions: [
      'Normal activities can continue',
      'Monitor for symptoms',
      'Keep injection site clean',
      'Stay hydrated'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe symptoms',
      'Signs of liver problems',
      'Persistent vomiting'
    ]
  },
  'DPT 1': {
    name: 'DPT Vaccine - Dose 1',
    purpose: 'Protects against Diphtheria, Pertussis (whooping cough), and Tetanus.',
    commonSymptoms: [
      'Mild fever',
      'Soreness, redness, or swelling at injection site',
      'Fussiness or crying',
      'Loss of appetite',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'High fever (above 105°F/40.5°C)',
      'Severe swelling larger than 3 inches',
      'Persistent crying for more than 3 hours',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Use acetaminophen if prescribed for fever',
      'Apply cold compress to injection site',
      'Keep baby comfortable',
      'Monitor temperature regularly',
      'Dress in loose clothing'
    ],
    whenToConsultDoctor: [
      'Fever above 105°F',
      'Swelling larger than 3 inches at injection site',
      'Crying for more than 3 hours',
      'Seizures',
      'Signs of severe allergic reaction (difficulty breathing, swelling)'
    ]
  },
  'DPT 2': {
    name: 'DPT Vaccine - Dose 2',
    purpose: 'Second dose to strengthen immunity against Diphtheria, Pertussis, and Tetanus.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Swelling or redness',
      'Fussiness',
      'Loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Continue normal feeding',
      'Monitor for fever',
      'Cold compress for swelling',
      'Keep baby comfortable',
      'Watch for unusual symptoms'
    ],
    whenToConsultDoctor: [
      'High fever above 105°F',
      'Severe swelling or redness',
      'Persistent crying episodes',
      'Seizures',
      'Difficulty breathing'
    ]
  },
  'DPT 3': {
    name: 'DPT Vaccine - Dose 3',
    purpose: 'Third dose to complete primary DPT vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Injection site pain',
      'Swelling or redness',
      'Fussiness',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'Very high fever',
      'Large swelling at injection site',
      'Prolonged crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Normal routine can continue',
      'Monitor temperature',
      'Cold compress if needed',
      'Comfort measures for fussiness',
      'Adequate fluid intake'
    ],
    whenToConsultDoctor: [
      'Very high fever',
      'Swelling larger than 3 inches',
      'Crying for more than 3 hours',
      'Seizures',
      'Signs of anaphylaxis'
    ]
  },
  'DPT Booster 1': {
    name: 'DPT Booster - Dose 1 (18 months)',
    purpose: 'First booster to maintain immunity against Diphtheria, Pertussis, and Tetanus.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Mild swelling',
      'Fussiness',
      'Temporary loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Rest recommended',
      'Monitor for symptoms',
      'Cold compress for soreness',
      'Keep comfortable',
      'Stay hydrated'
    ],
    whenToConsultDoctor: [
      'High fever above 105°F',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Difficulty breathing'
    ]
  },
  'DPT Booster 2': {
    name: 'DPT Booster - Dose 2 (5-6 years)',
    purpose: 'Second booster to maintain long-term immunity through school years.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Mild swelling',
      'Fatigue',
      'Mild headache'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Severe headache',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Rest for first 24 hours',
      'Monitor temperature',
      'Cold compress if needed',
      'Light activities only',
      'Stay hydrated'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe swelling at injection site',
      'Severe headache or dizziness',
      'Seizures',
      'Signs of severe reaction'
    ]
  },
  'Hib 1': {
    name: 'Hib Vaccine - Dose 1',
    purpose: 'Protects against Haemophilus influenzae type b, causing serious bacterial infections.',
    commonSymptoms: [
      'Mild fever',
      'Redness or swelling at injection site',
      'Fussiness',
      'Loss of appetite',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Signs of severe infection'
    ],
    precautions: [
      'Normal feeding can continue',
      'Monitor for fever',
      'Cold compress for swelling',
      'Comfort measures for fussiness',
      'Keep injection site clean'
    ],
    whenToConsultDoctor: [
      'High fever above 101°F',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Signs of severe illness'
    ]
  },
  'Hib 2': {
    name: 'Hib Vaccine - Dose 2',
    purpose: 'Second dose to build immunity against Haemophilus influenzae type b.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Mild swelling',
      'Fussiness',
      'Loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Continue normal routine',
      'Monitor temperature',
      'Cold compress if needed',
      'Comfort measures',
      'Watch for symptoms'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Signs of severe reaction'
    ]
  },
  'Hib 3': {
    name: 'Hib Vaccine - Dose 3',
    purpose: 'Third dose to complete primary Hib vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Injection site pain',
      'Mild swelling',
      'Fussiness',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Normal activities can continue',
      'Monitor for symptoms',
      'Cold compress for soreness',
      'Keep comfortable',
      'Adequate fluid intake'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Large swelling',
      'Prolonged crying',
      'Seizures',
      'Anaphylaxis symptoms'
    ]
  },
  'Rotavirus 1': {
    name: 'Rotavirus Vaccine - Dose 1',
    purpose: 'Protects against rotavirus, the leading cause of severe diarrhea in infants and young children.',
    commonSymptoms: [
      'Mild fever',
      'Fussiness',
      'Mild diarrhea',
      'Loss of appetite',
      'Vomiting (less common)'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe vomiting',
      'Severe diarrhea',
      'Signs of dehydration',
      'Bloody stool'
    ],
    precautions: [
      'Continue breastfeeding',
      'Monitor for diarrhea and vomiting',
      'Ensure adequate fluid intake',
      'Watch for dehydration signs',
      'Maintain hygiene'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe or bloody diarrhea',
      'Persistent vomiting',
      'Signs of dehydration (dry mouth, no tears, fewer wet diapers)',
      'Refusing fluids'
    ]
  },
  'Rotavirus 2': {
    name: 'Rotavirus Vaccine - Dose 2',
    purpose: 'Second dose to strengthen protection against rotavirus.',
    commonSymptoms: [
      'Mild fever',
      'Mild fussiness',
      'Mild diarrhea',
      'Loss of appetite',
      'Temporary decrease in feeding'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe diarrhea',
      'Severe vomiting',
      'Dehydration',
      'Intussusception (rare)'
    ],
    precautions: [
      'Normal feeding',
      'Monitor for GI symptoms',
      'Stay hydrated',
      'Watch diaper output',
      'Maintain hand hygiene'
    ],
    whenToConsultDoctor: [
      'Severe diarrhea',
      'Persistent vomiting',
      'Dehydration symptoms',
      'Bloody stool',
      'High fever'
    ]
  },
  'Rotavirus 3': {
    name: 'Rotavirus Vaccine - Dose 3',
    purpose: 'Final dose to complete primary rotavirus vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Mild fussiness',
      'Mild diarrhea',
      'Temporary loss of appetite',
      'Mild vomiting'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe diarrhea',
      'Severe vomiting',
      'Dehydration',
      'Intussusception (rare)'
    ],
    precautions: [
      'Continue normal feeding',
      'Monitor symptoms',
      'Ensure hydration',
      'Watch diaper output',
      'Good hygiene practices'
    ],
    whenToConsultDoctor: [
      'Severe or bloody diarrhea',
      'Persistent vomiting',
      'Dehydration signs',
      'High fever',
      'Severe abdominal pain'
    ]
  },
  'PCV 1': {
    name: 'PCV (Pneumococcal Conjugate Vaccine) - Dose 1',
    purpose: 'Protects against pneumococcal bacteria causing pneumonia, meningitis, and ear infections.',
    commonSymptoms: [
      'Mild fever',
      'Soreness at injection site',
      'Redness or swelling',
      'Fussiness',
      'Loss of appetite',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Normal feeding can continue',
      'Monitor temperature',
      'Cold compress for injection site',
      'Comfort measures for fussiness',
      'Watch for unusual symptoms'
    ],
    whenToConsultDoctor: [
      'High fever above 101°F',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Signs of severe reaction'
    ]
  },
  'PCV 2': {
    name: 'PCV (Pneumococcal Conjugate Vaccine) - Dose 2',
    purpose: 'Second dose to build immunity against pneumococcal disease.',
    commonSymptoms: [
      'Mild fever',
      'Injection site soreness',
      'Mild swelling',
      'Fussiness',
      'Loss of appetite',
      'Drowsiness'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Continue normal routine',
      'Monitor for fever',
      'Cold compress if needed',
      'Comfort baby',
      'Watch for symptoms'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe swelling',
      'Persistent crying',
      'Seizures',
      'Signs of anaphylaxis'
    ]
  },
  'PCV 3': {
    name: 'PCV (Pneumococcal Conjugate Vaccine) - Dose 3',
    purpose: 'Final dose to complete primary pneumococcal vaccination series.',
    commonSymptoms: [
      'Mild fever',
      'Injection site pain',
      'Mild swelling',
      'Fussiness',
      'Fatigue',
      'Loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Persistent crying',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Normal activities can continue',
      'Monitor temperature',
      'Cold compress for soreness',
      'Keep comfortable',
      'Adequate fluid intake'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Large swelling',
      'Prolonged crying',
      'Seizures',
      'Signs of severe reaction'
    ]
  },
  'MMR 1': {
    name: 'MMR Vaccine - Dose 1 (9 months)',
    purpose: 'Protects against Measles, Mumps, and Rubella - highly contagious viral infections.',
    commonSymptoms: [
      'Mild fever (may start 7-12 days after vaccination)',
      'Rash (usually mild)',
      'Swollen glands',
      'Mild cold symptoms',
      'Joint pain (in older children)'
    ],
    seriousSymptoms: [
      'High fever (above 103°F)',
      'Severe rash',
      'Seizures (febile seizures)',
      'Severe ear pain',
      'Signs of encephalitis (rare)'
    ],
    precautions: [
      'Keep child comfortable if fever develops',
      'Use acetaminophen for fever (avoid aspirin)',
      'Keep hydrated',
      'Light clothing if rash appears',
      'Avoid contact with sick individuals'
    ],
    whenToConsultDoctor: [
      'High fever above 103°F',
      'Fever lasting more than 48 hours',
      'Severe rash or swelling',
      'Seizures',
      'Signs of severe illness'
    ]
  },
  'MMR 2': {
    name: 'MMR Vaccine - Dose 2 (18 months)',
    purpose: 'Second dose to ensure complete protection against Measles, Mumps, and Rubella.',
    commonSymptoms: [
      'Mild fever',
      'Rash',
      'Swollen glands',
      'Mild cold symptoms',
      'Joint pain',
      'Temporary arthritis (more common in adults)'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe rash',
      'Seizures',
      'Severe joint pain',
      'Encephalitis (very rare)'
    ],
    precautions: [
      'Normal activities can continue',
      'Acetaminophen for fever if needed',
      'Stay hydrated',
      'Comfort measures for rash',
      'Rest if feeling unwell'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Severe rash',
      'Seizures',
      'Joint swelling severe',
      'Concerning symptoms'
    ]
  },
  'Typhoid Conjugate Vaccine': {
    name: 'Typhoid Conjugate Vaccine (TCV)',
    purpose: 'Protects against Typhoid fever, a serious bacterial infection spread through contaminated food/water.',
    commonSymptoms: [
      'Mild fever',
      'Headache',
      'Abdominal pain',
      'Loss of appetite',
      'Fatigue',
      'Nausea'
    ],
    seriousSymptoms: [
      'High fever',
      'Severe abdominal pain',
      'Persistent vomiting',
      'Signs of internal bleeding (rare)',
      'Severe dehydration'
    ],
    precautions: [
      'Rest recommended',
      'Monitor temperature',
      'Stay hydrated',
      'Light, easily digestible food',
      'Maintain hygiene',
      'Avoid crowded places for few days'
    ],
    whenToConsultDoctor: [
      'High fever persisting',
      'Severe abdominal pain',
      'Persistent vomiting',
      'Signs of dehydration',
      'Blood in stool or vomit'
    ]
  },
  'Varicella 1': {
    name: 'Varicella (Chickenpox) Vaccine - Dose 1',
    purpose: 'Protects against chickenpox, a highly contagious viral infection causing itchy rash and blisters.',
    commonSymptoms: [
      'Mild fever',
      'Mild rash (may appear 1-2 weeks after vaccination)',
      'Fewer blisters than natural infection',
      'Mild fussiness',
      'Loss of appetite'
    ],
    seriousSymptoms: [
      'High fever',
      'Many blisters',
      'Blisters becoming infected',
      'Severe headache',
      'Difficulty walking',
      'Seizures'
    ],
    precautions: [
      'Keep rash clean and dry',
      'Do not scratch blisters',
      'Use calamine lotion for itching',
      'Acetaminophen for fever',
      'Avoid contact with immunocompromised individuals'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Many blisters',
      'Blisters showing infection signs (redness, pus)',
      'Difficulty breathing',
      'Severe headache or confusion',
      'Seizures'
    ]
  },
  'Varicella 2': {
    name: 'Varicella (Chickenpox) Vaccine - Dose 2',
    purpose: 'Second dose to ensure complete and long-lasting protection against chickenpox.',
    commonSymptoms: [
      'Mild fever',
      'Mild rash',
      'Mild fussiness',
      'Loss of appetite',
      'Fatigue'
    ],
    seriousSymptoms: [
      'High fever',
      'Moderate to severe rash',
      'Infected blisters',
      'Seizures',
      'Reye syndrome (if aspirin used)'
    ],
    precautions: [
      'Normal activities can continue',
      'Keep rash clean',
      'Do not scratch',
      'Acetaminophen for fever',
      'Avoid aspirin'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Many blisters',
      'Infected blisters',
      'Seizures',
      'Severe symptoms'
    ]
  },
  'Td': {
    name: 'Td (Tetanus and Diphtheria) Vaccine',
    purpose: 'Booster to maintain protection against Tetanus and Diphtheria in older children and adults.',
    commonSymptoms: [
      'Soreness at injection site',
      'Redness or swelling',
      'Mild fever',
      'Fatigue',
      'Headache'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Severe pain',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Normal activities can continue',
      'Cold compress for soreness',
      'Monitor temperature',
      'Rest if feeling fatigued',
      'Stay hydrated'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Large swelling at injection site',
      'Severe pain',
      'Seizures',
      'Signs of anaphylaxis'
    ]
  },
  'Td Booster': {
    name: 'Td Booster (16 years)',
    purpose: 'Booster dose for adolescents to maintain immunity against Tetanus and Diphtheria.',
    commonSymptoms: [
      'Injection site soreness',
      'Redness and swelling',
      'Mild fever',
      'Fatigue',
      'Headache',
      'Muscle aches'
    ],
    seriousSymptoms: [
      'High fever',
      'Large swelling at injection site',
      'Severe pain or stiffness',
      'Seizures',
      'Severe allergic reaction'
    ],
    precautions: [
      'Rest for first 24 hours',
      'Use ice pack for soreness',
      'Stay hydrated',
      'Light activities only',
      'Acetaminophen for pain/fever'
    ],
    whenToConsultDoctor: [
      'High fever',
      'Swelling larger than 3 inches',
      'Severe pain',
      'Seizures',
      'Anaphylaxis symptoms'
    ]
  }
};

/**
 * Get vaccine information by name
 * Returns undefined if vaccine not found in database
 */
export function getVaccineInfo(vaccineName: string): VaccineInfo | undefined {
  // Try exact match first
  if (vaccineInfoDatabase[vaccineName]) {
    return vaccineInfoDatabase[vaccineName];
  }
  
  // Try case-insensitive match
  const lowerName = vaccineName.toLowerCase();
  for (const key of Object.keys(vaccineInfoDatabase)) {
    if (key.toLowerCase() === lowerName) {
      return vaccineInfoDatabase[key];
    }
  }
  
  // Try partial match
  for (const key of Object.keys(vaccineInfoDatabase)) {
    if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
      return vaccineInfoDatabase[key];
    }
  }
  
  return undefined;
}

/**
 * Get all available vaccine names
 */
export function getAllVaccineNames(): string[] {
  return Object.keys(vaccineInfoDatabase);
}
