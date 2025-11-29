export interface ClientProfile {
  age: string;
  category: string; // Adolescent, Pregnant, Postpartum, Woman with child, General FP
  pregnancyStatus: 'Yes' | 'No' | 'Unknown';
  trimester?: '1st' | '2nd' | '3rd';
  parity?: string;
  medicalHistory: string;
  visitReason: string;
  nutritionalStatus: string;
  language: string;
}

export interface GuidanceResponse {
  clientCategory: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskReasoning: string;
  priorities: string[];
  counsellingScript: string;
  opportunisticMessages: {
    topic: string;
    message: string;
  }[];
  referralAdvice: string;
}

export enum ClientCategory {
  ADOLESCENT = 'Adolescent (10-19 yrs)',
  PREGNANT = 'Pregnant Woman',
  POSTPARTUM = 'Postpartum Mother',
  WOMAN_WITH_CHILD = 'Woman with Child (Under 5)',
  GENERAL_FP = 'General Family Planning Client'
}