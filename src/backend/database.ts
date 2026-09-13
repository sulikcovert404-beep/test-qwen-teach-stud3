/**
 * Local Database - Persistent storage using localStorage
 * Simulates PostgreSQL with tenant isolation
 */

export interface DBUser {
  id: string;
  name: string;
  email?: string;
  role: 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT';
  plan: string;
  tenantId?: string;
  telegramId?: string;
  createdAt: string;
}

export interface DBTenant {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface DBSchool {
  id: string;
  tenantId: string;
  name: string;
  status: 'active' | 'suspended';
}

export interface DBClassroom {
  id: string;
  tenantId: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  status: 'active' | 'archived';
}

export interface DBAssignment {
  id: string;
  tenantId: string;
  classroomId: string;
  createdBy: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  publishAt: string;
  dueAt: string;
  closeAt: string;
}

export interface DBExam {
  id: string;
  tenantId: string;
  creatorId: string;
  title: string;
  questions: any[];
  duration: number;
  status: 'draft' | 'published' | 'archived';
}

const DB_KEYS = {
  USERS: 'db_users',
  TENANTS: 'db_tenants',
  SCHOOLS: 'db_schools',
  CLASSROOMS: 'db_classrooms',
  ASSIGNMENTS: 'db_assignments',
  EXAMS: 'db_exams',
  INITIALIZED: 'db_initialized',
};

class LocalDatabase {
  private get<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private set<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  initialize(): void {
    if (localStorage.getItem(DB_KEYS.INITIALIZED)) return;

    // Seed data
    const tenants: DBTenant[] = [
      { id: 'tenant-001', name: 'دبیرستان شهید بهشتی', plan: 'SCHOOL_FREE', status: 'active', createdAt: new Date().toISOString() },
    ];

    const schools: DBSchool[] = [
      { id: 'school-001', tenantId: 'tenant-001', name: 'دبیرستان شهید بهشتی', status: 'active' },
    ];

    const users: DBUser[] = [
      { id: 'super-001', name: 'مدیر سیستم', role: 'SUPER_ADMIN', plan: 'ENTERPRISE', createdAt: new Date().toISOString() },
      { id: 'adm-001', name: 'رضا کریمی', role: 'SCHOOL_ADMIN', plan: 'SCHOOL_FREE', tenantId: 'tenant-001', createdAt: new Date().toISOString() },
      { id: 'tch-001', name: 'مریم احمدی', role: 'TEACHER', plan: 'TEACHER_FREE', tenantId: 'tenant-001', createdAt: new Date().toISOString() },
      { id: 'stu-001', name: 'علی محمدی', role: 'STUDENT', plan: 'STUDENT_FREE', tenantId: 'tenant-001', createdAt: new Date().toISOString() },
    ];

    const classrooms: DBClassroom[] = [
      { id: 'class-001', tenantId: 'tenant-001', name: 'ریاضی دهم - الف', grade: 'دهم', subject: 'ریاضی', teacherId: 'tch-001', status: 'active' },
      { id: 'class-002', tenantId: 'tenant-001', name: 'ریاضی یازدهم - ب', grade: 'یازدهم', subject: 'ریاضی', teacherId: 'tch-001', status: 'active' },
    ];

    const assignments: DBAssignment[] = [
      {
        id: 'assign-001',
        tenantId: 'tenant-001',
        classroomId: 'class-001',
        createdBy: 'tch-001',
        title: 'تمرین‌های فصل ۳ - تابع و مشتق',
        description: 'حل تمرین‌های ۱ تا ۱۰ صفحه ۷۸',
        status: 'published',
        publishAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        closeAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    this.set(DB_KEYS.TENANTS, tenants);
    this.set(DB_KEYS.SCHOOLS, schools);
    this.set(DB_KEYS.USERS, users);
    this.set(DB_KEYS.CLASSROOMS, classrooms);
    this.set(DB_KEYS.ASSIGNMENTS, assignments);
    localStorage.setItem(DB_KEYS.INITIALIZED, 'true');
  }

  // Users
  getUsers(): DBUser[] { return this.get<DBUser>(DB_KEYS.USERS); }
  getUserById(id: string): DBUser | undefined { return this.getUsers().find(u => u.id === id); }
  getUserByRole(role: string): DBUser[] { return this.getUsers().filter(u => u.role === role); }
  getUsersByTenant(tenantId: string): DBUser[] { return this.getUsers().filter(u => u.tenantId === tenantId); }

  // Tenants
  getTenants(): DBTenant[] { return this.get<DBTenant>(DB_KEYS.TENANTS); }
  getTenantById(id: string): DBTenant | undefined { return this.getTenants().find(t => t.id === id); }

  // Schools
  getSchools(): DBSchool[] { return this.get<DBSchool>(DB_KEYS.SCHOOLS); }
  getSchoolsByTenant(tenantId: string): DBSchool[] { return this.getSchools().filter(s => s.tenantId === tenantId); }

  // Classrooms
  getClassrooms(): DBClassroom[] { return this.get<DBClassroom>(DB_KEYS.CLASSROOMS); }
  getClassroomsByTenant(tenantId: string): DBClassroom[] { return this.getClassrooms().filter(c => c.tenantId === tenantId); }
  getClassroomsByTeacher(teacherId: string): DBClassroom[] { return this.getClassrooms().filter(c => c.teacherId === teacherId); }

  // Assignments
  getAssignments(): DBAssignment[] { return this.get<DBAssignment>(DB_KEYS.ASSIGNMENTS); }
  getAssignmentsByTenant(tenantId: string): DBAssignment[] { return this.getAssignments().filter(a => a.tenantId === tenantId); }
  getAssignmentsByClassroom(classroomId: string): DBAssignment[] { return this.getAssignments().filter(a => a.classroomId === classroomId); }

  // Generic CRUD
  create<T extends { id: string }>(key: string, item: T): void {
    const items = this.get<T>(key);
    items.push(item);
    this.set(key, items);
  }

  update<T extends { id: string }>(key: string, id: string, updates: Partial<T>): void {
    const items = this.get<T>(key);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.set(key, items);
    }
  }

  delete(key: string, id: string): void {
    const items = this.get<any>(key);
    this.set(key, items.filter(i => i.id !== id));
  }
}

export const db = new LocalDatabase();
