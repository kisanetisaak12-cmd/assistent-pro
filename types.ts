
import React from 'react';

export enum OptimizationGoal {
  HUMANIZE = 'HUMANIZE',
  GRADE_BOOST = 'GRADE_BOOST',
  PROFESSIONALIZE = 'PROFESSIONALIZE',
  GENERATE = 'GENERATE'
}

export enum GradeLevel {
  E = 'E',
  C = 'C',
  A = 'A'
}

export enum TextType {
  UPPSATS = 'Uppsats',
  DEBATTARTIKEL = 'Debattartikel',
  KRONIKA = 'Krönika',
  ANALYS = 'Analys',
  BERATTELSE = 'Berättelse'
}

export enum HelpLevel {
  FULL = 'Skriv hela texten åt mig',
  EXPAND = 'Bygg ut min idé med mer fakta',
  HUMANIZE_ONLY = 'Gör bara min text mänsklig'
}

export interface OptimizationResult {
  originalText: string;
  optimizedText: string;
  improvements: string[];
  defenseTips: string[];
  estimatedGradeLevel: string;
  humanScore: number; // 0-100%
}
