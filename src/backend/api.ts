/**
 * API Client - Simulates backend API calls
 * This layer can be swapped to real backend without changing UI
 */

import { db, DBUser, DBAssignment, DBClassroom } from './database';

// Initialize database
db.initialize();

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// API Error class
export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// Auth State
let currentUser: DBUser | null = null;
let authToken: string | null = null;

// ============ AUTH API ============

export const authApi = {
  async login(role: 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT'): Promise<{ user: DBUser; token: string }> {
    await delay();
    
    const users = db.getUsers();
    const user = users.find(u => u.role === role);
    
    if (!user) {
      throw new ApiError('USER_NOT_FOUND', 'کاربر یافت نشد', 404);
    }
    
    currentUser = user;
    authToken = `mock-jwt-${user.id}-${Date.now()}`;
    
    return { user, token: authToken };
  },

  async logout(): Promise<void> {
    await delay(100);
    currentUser = null;
    authToken = null;
  },

  async getMe(): Promise<DBUser> {
    await delay(100);
    
    if (!currentUser) {
      throw new ApiError('UNAUTHORIZED', 'احراز هویت نشده', 401);
    }
    
    return currentUser;
  },

  getCurrentUser(): DBUser | null {
    return currentUser;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};

// ============ TENANT API ============

export const tenantApi = {
  async getAll(): Promise<any[]> {
    await delay();
    this.checkAuth();
    this.checkRole(['SUPER_ADMIN']);
    
    return db.getTenants();
  },

  async getById(id: string): Promise<any> {
    await delay();
    this.checkAuth();
    
    const tenant = db.getTenantById(id);
    if (!tenant) {
      throw new ApiError('TENANT_NOT_FOUND', 'مستأجر یافت نشد', 404);
    }
    
    // Tenant isolation check
    if (currentUser!.role !== 'SUPER_ADMIN' && currentUser!.tenantId !== id) {
      throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز', 403);
    }
    
    return tenant;
  },

  checkAuth(): void {
    if (!currentUser) {
      throw new ApiError('UNAUTHORIZED', 'احراز هویت نشده', 401);
    }
  },

  checkRole(allowedRoles: string[]): void {
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
      throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز', 403);
    }
  },
};

// ============ SCHOOL API ============

export const schoolApi = {
  async getAll(): Promise<any[]> {
    await delay();
    tenantApi.checkAuth();
    
    if (currentUser!.role === 'SUPER_ADMIN') {
      return db.getSchools();
    }
    
    return db.getSchoolsByTenant(currentUser!.tenantId!);
  },
};

// ============ CLASSROOM API ============

export const classroomApi = {
  async getAll(): Promise<DBClassroom[]> {
    await delay();
    tenantApi.checkAuth();
    
    if (currentUser!.role === 'SUPER_ADMIN' || currentUser!.role === 'SCHOOL_ADMIN') {
      return db.getClassroomsByTenant(currentUser!.tenantId!);
    }
    
    if (currentUser!.role === 'TEACHER') {
      return db.getClassroomsByTeacher(currentUser!.id);
    }
    
    throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز', 403);
  },

  async getById(id: string): Promise<DBClassroom> {
    await delay();
    tenantApi.checkAuth();
    
    const classroom = db.getClassrooms().find(c => c.id === id);
    if (!classroom) {
      throw new ApiError('CLASSROOM_NOT_FOUND', 'کلاس یافت نشد', 404);
    }
    
    // Tenant isolation
    if (currentUser!.role !== 'SUPER_ADMIN' && classroom.tenantId !== currentUser!.tenantId) {
      throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز به کلاس', 403);
    }
    
    return classroom;
  },
};

// ============ ASSIGNMENT API ============

export const assignmentApi = {
  async getAll(): Promise<DBAssignment[]> {
    await delay();
    tenantApi.checkAuth();
    
    const assignments = db.getAssignmentsByTenant(currentUser!.tenantId!);
    
    // Filter by role
    if (currentUser!.role === 'TEACHER') {
      const classrooms = db.getClassroomsByTeacher(currentUser!.id);
      const classroomIds = classrooms.map(c => c.id);
      return assignments.filter(a => classroomIds.includes(a.classroomId));
    }
    
    return assignments;
  },

  async getById(id: string): Promise<DBAssignment> {
    await delay();
    tenantApi.checkAuth();
    
    const assignment = db.getAssignments().find(a => a.id === id);
    if (!assignment) {
      throw new ApiError('ASSIGNMENT_NOT_FOUND', 'تکلیف یافت نشد', 404);
    }
    
    // Tenant isolation
    if (currentUser!.role !== 'SUPER_ADMIN' && assignment.tenantId !== currentUser!.tenantId) {
      throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز', 403);
    }
    
    return assignment;
  },

  async create(data: Partial<DBAssignment>): Promise<DBAssignment> {
    await delay();
    tenantApi.checkAuth();
    tenantApi.checkRole(['TEACHER', 'SCHOOL_ADMIN']);
    
    const newAssignment: DBAssignment = {
      id: `assign-${Date.now()}`,
      tenantId: currentUser!.tenantId!,
      classroomId: data.classroomId!,
      createdBy: currentUser!.id,
      title: data.title!,
      description: data.description || '',
      status: data.status || 'draft',
      publishAt: data.publishAt || new Date().toISOString(),
      dueAt: data.dueAt!,
      closeAt: data.closeAt!,
    };
    
    db.create('db_assignments', newAssignment);
    return newAssignment;
  },

  async update(id: string, updates: Partial<DBAssignment>): Promise<DBAssignment> {
    await delay();
    tenantApi.checkAuth();
    
    const assignment = await this.getById(id);
    
    // Ownership check
    if (currentUser!.role === 'TEACHER' && assignment.createdBy !== currentUser!.id) {
      throw new ApiError('FORBIDDEN', 'فقط سازنده می‌تواند ویرایش کند', 403);
    }
    
    db.update('db_assignments', id, updates);
    return { ...assignment, ...updates } as DBAssignment;
  },

  async delete(id: string): Promise<void> {
    await delay();
    tenantApi.checkAuth();
    
    const assignment = await this.getById(id);
    
    if (currentUser!.role === 'TEACHER' && assignment.createdBy !== currentUser!.id) {
      throw new ApiError('FORBIDDEN', 'فقط سازنده می‌تواند حذف کند', 403);
    }
    
    db.delete('db_assignments', id);
  },
};

// ============ USER API ============

export const userApi = {
  async getAll(): Promise<DBUser[]> {
    await delay();
    tenantApi.checkAuth();
    tenantApi.checkRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']);
    
    if (currentUser!.role === 'SUPER_ADMIN') {
      return db.getUsers();
    }
    
    return db.getUsersByTenant(currentUser!.tenantId!);
  },

  async getById(id: string): Promise<DBUser> {
    await delay();
    tenantApi.checkAuth();
    
    const user = db.getUserById(id);
    if (!user) {
      throw new ApiError('USER_NOT_FOUND', 'کاربر یافت نشد', 404);
    }
    
    // Tenant isolation
    if (currentUser!.role !== 'SUPER_ADMIN' && user.tenantId !== currentUser!.tenantId) {
      throw new ApiError('FORBIDDEN', 'دسترسی غیرمجاز', 403);
    }
    
    return user;
  },
};

// ============ STATS API ============

export const statsApi = {
  async getPlatformStats(): Promise<any> {
    await delay();
    tenantApi.checkAuth();
    tenantApi.checkRole(['SUPER_ADMIN']);
    
    return {
      totalTenants: db.getTenants().length,
      totalSchools: db.getSchools().length,
      totalTeachers: db.getUserByRole('TEACHER').length,
      totalStudents: db.getUserByRole('STUDENT').length,
      activeSubscriptions: db.getTenants().filter(t => t.status === 'active').length,
      aiCallsToday: 5440,
      systemHealth: 'healthy',
    };
  },

  async getSchoolStats(): Promise<any> {
    await delay();
    tenantApi.checkAuth();
    tenantApi.checkRole(['SCHOOL_ADMIN', 'SUPER_ADMIN']);
    
    const users = db.getUsersByTenant(currentUser!.tenantId!);
    
    return {
      totalTeachers: users.filter(u => u.role === 'TEACHER').length,
      totalStudents: users.filter(u => u.role === 'STUDENT').length,
      totalClasses: db.getClassroomsByTenant(currentUser!.tenantId!).length,
      todayActivity: 1240,
    };
  },

  async getTeacherStats(): Promise<any> {
    await delay();
    tenantApi.checkAuth();
    tenantApi.checkRole(['TEACHER']);
    
    const classrooms = db.getClassroomsByTeacher(currentUser!.id);
    
    return {
      activeClasses: classrooms.length,
      totalStudents: 87, // Mock
      activeAssignments: db.getAssignments().filter(a => 
        classrooms.map(c => c.id).includes(a.classroomId) && a.status === 'published'
      ).length,
      classAverage: 16.8,
    };
  },
};

// ============ AI API (Mock) ============

export const aiApi = {
  async chat(message: string, context: string = 'general'): Promise<string> {
    await delay(1500);
    tenantApi.checkAuth();
    
    // Mock AI responses
    if (context === 'tutor') {
      if (message.includes('مشتق')) {
        return `مشتق یکی از مفاهیم اصلی حساب دیفرانسیل است.\n\n📌 تعریف ساده:\nمشتق یک تابع، نرخ تغییر لحظه‌ای آن تابع را نشان می‌دهد.\n\n🔢 مثال:\nاگر f(x) = x² باشد:\nf'(x) = 2x`;
      }
      return `سؤال خوبی پرسیدی! بذار مرحله به مرحله بررسی کنیم.`;
    }
    
    if (context === 'teacher') {
      return `پیشنهاد من برای تدریس این موضوع:\n\n۱. شروع با مثال‌های ساده\n۲. استفاده از نمودار\n۳. تمرین‌های تدریجی`;
    }
    
    return 'پاسخ AI در اینجا نمایش داده می‌شود.';
  },

  async generateQuestions(topic: string, count: number): Promise<any[]> {
    await delay(2000);
    tenantApi.checkAuth();
    tenantApi.checkRole(['TEACHER']);
    
    return Array.from({ length: count }, (_, i) => ({
      id: `q-${Date.now()}-${i}`,
      type: i % 2 === 0 ? 'چهارگزینه‌ای' : 'تشریحی',
      question: `سؤال ${i + 1} درباره ${topic}`,
      options: i % 2 === 0 ? ['گزینه الف', 'گزینه ب', 'گزینه ج', 'گزینه د'] : undefined,
      answer: `پاسخ سؤال ${i + 1}`,
      difficulty: ['آسان', 'متوسط', 'سخت'][i % 3],
    }));
  },
};
