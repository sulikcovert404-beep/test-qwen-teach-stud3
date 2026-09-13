export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT';

export type SubscriptionPlan = 
  | 'STUDENT_FREE' 
  | 'STUDENT_PRO' 
  | 'TEACHER_FREE' 
  | 'SCHOOL_FREE'
  | 'ENTERPRISE';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  avatar?: string;
  plan: SubscriptionPlan;
  tenantId?: string;
  tenantName?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  publishAt: string;
  dueAt: string;
  closeAt: string;
  classroomId: string;
  classroomName: string;
  createdBy: string;
  createdByName: string;
}

export interface Exam {
  id: string;
  title: string;
  totalQuestions: number;
  duration: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ADAPTIVE';
  status: 'draft' | 'published' | 'archived';
  subject: string;
  grade: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  attemptNo: number;
  score?: number;
  maxScore: number;
  state: 'in_progress' | 'submitted' | 'graded';
  startedAt: string;
  submittedAt?: string;
}

export interface Classroom {
  id: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  status: 'active' | 'archived';
}

export interface School {
  id: string;
  name: string;
  tenantId: string;
  plan: SubscriptionPlan;
  teacherCount: number;
  studentCount: number;
  classCount: number;
  status: 'active' | 'suspended';
}

export interface AIFeature {
  name: string;
  code: string;
  description: string;
  icon: string;
  available: boolean;
  usageRemaining?: number;
  usageLimit?: number;
}

export interface ProgressData {
  totalAssignments: number;
  completedAssignments: number;
  totalExams: number;
  completedExams: number;
  averageScore: number;
  weeklyStudyHours: number;
  streak: number;
}

export interface PlatformStats {
  totalTenants: number;
  totalSchools: number;
  totalTeachers: number;
  totalStudents: number;
  activeSubscriptions: number;
  aiCallsToday: number;
  systemHealth: 'healthy' | 'degraded' | 'down';
}

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  STUDENT: '/student-dashboard',
  TEACHER: '/teacher-dashboard',
  SCHOOL_ADMIN: '/admin-dashboard',
  SUPER_ADMIN: '/platform',
};

export const PLAN_MARKETING_NAMES: Record<SubscriptionPlan, string> = {
  STUDENT_FREE: 'رایگان',
  STUDENT_PRO: 'دانش‌آموز پلاس',
  TEACHER_FREE: 'معلم رایگان',
  SCHOOL_FREE: 'مدرسه',
  ENTERPRISE: 'سازمانی',
};
