export type UserRole = 'lecturer' | 'dean' | 'research_dept' | 'rector' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export type ProductStatus = 'draft' | 'pending_dean' | 'pending_research' | 'approved' | 'rejected';

export type ProductType = 
  | 'Q1' 
  | 'Q2' 
  | 'Q3' 
  | 'Q4' 
  | 'Scopus' 
  | 'nature_science'
  | 'project_international'
  | 'project_national'
  | 'project_ministry'
  | 'project_provincial'
  | 'project_university';

export interface ResearchProduct {
  id: string;
  title: string;
  type: ProductType;
  authors: Author[];
  submittedBy: string;
  submittedDate: string;
  status: ProductStatus;
  hours: number;
  evidence?: string[];
  reviewComments?: ReviewComment[];
  department: string;
}

export interface Author {
  name: string;
  percentage: number;
  isCorresponding?: boolean;
}

export interface ReviewComment {
  reviewer: string;
  role: string;
  comment: string;
  date: string;
  action: 'approved' | 'rejected' | 'needs_revision';
}

export interface ProductCategory {
  type: ProductType;
  name: string;
  hours: number;
  description?: string;
}

export interface RegistrationPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  academicYear: string;
  status: 'upcoming' | 'active' | 'closed';
}

export interface Statistics {
  totalProducts: number;
  totalHours: number;
  byType: Record<ProductType, number>;
  byDepartment: Record<string, number>;
  byStatus: Record<ProductStatus, number>;
}
