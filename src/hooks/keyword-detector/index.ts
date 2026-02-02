export type KeywordType = 
  | 'plan' 
  | 'analyze' 
  | 'search' 
  | 'ultrawork' 
  | 'tdd'
  | 'security';

export interface DetectedKeyword {
  type: KeywordType;
  match: string;
}

const KEYWORD_PATTERNS: Record<KeywordType, RegExp> = {
  plan: /\b(plan|planning|breakdown|roadmap|phase|milestone)\b/i,
  analyze: /\b(analyze|analyse|investigate|examine|research|deep.?dive|debug|understand)\b|why\s+is|how\s+does/i,
  search: /\b(search|find|locate|explore|discover|grep|where)\b|where\s+is|show\s+me/i,
  ultrawork: /\b(ultrawork|ulw|parallel|concurrent)\b/i,
  tdd: /\b(tdd|test.?driven|write\s+tests?\s+first)\b/i,
  security: /\b(security|vulnerab|auth|injection|xss|csrf|secret|credential)\b/i,
};

const KEYWORD_PRIORITY: KeywordType[] = [
  'plan', 'ultrawork', 'tdd', 'security', 'analyze', 'search'
];

export function removeCodeBlocks(text: string): string {
  let result = text.replace(/```[\s\S]*?```/g, '');
  result = result.replace(/~~~[\s\S]*?~~~/g, '');
  result = result.replace(/`[^`]+`/g, '');
  return result;
}

export function detectKeywords(text: string): DetectedKeyword[] {
  const cleanText = removeCodeBlocks(text);
  const detected: DetectedKeyword[] = [];
  
  for (const type of KEYWORD_PRIORITY) {
    const pattern = KEYWORD_PATTERNS[type];
    const match = cleanText.match(pattern);
    
    if (match) {
      detected.push({ type, match: match[0] });
    }
  }
  
  return detected;
}

export function getKeywordMessage(keyword: DetectedKeyword): string {
  const messages: Record<KeywordType, string> = {
    plan: '[MODE: PLANNING] Create detailed implementation plan before coding.',
    analyze: '[MODE: ANALYSIS] Deep investigation mode activated.',
    search: '[MODE: SEARCH] Thorough codebase exploration activated.',
    ultrawork: '[MODE: ULTRAWORK] Maximum parallelism enabled.',
    tdd: '[MODE: TDD] Test-driven development enforced.',
    security: '[MODE: SECURITY] Security review checklist activated.',
  };
  
  return messages[keyword.type] || '';
}
