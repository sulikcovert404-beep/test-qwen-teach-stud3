import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import NewDashboardLayout from './components/NewDashboardLayout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlatformDashboard from './pages/PlatformDashboard';
import NewDashboardHome from './pages/NewDashboardHome';
import AITutor from './pages/AITutor';
import AssignmentsPage from './pages/AssignmentsPage';
import ExamsPage from './pages/ExamsPage';
import ProgressPage from './pages/ProgressPage';
import ExamBuilder from './pages/ExamBuilder';
import FlashcardsPage from './pages/FlashcardsPage';
import StudyPlanPage from './pages/StudyPlanPage';
import ProjectStatusPage from './pages/ProjectStatusPage';
import DeployGuidePage from './pages/DeployGuidePage';
import TeacherAnalytics from './pages/TeacherAnalytics';
import TeacherAssistant from './pages/TeacherAssistant';
import SettingsPage from './pages/SettingsPage';
import MiniAppPage from './pages/MiniAppPage';
import PaywallPage from './pages/PaywallPage';
import NotificationsPage from './pages/NotificationsPage';
import TelegramIntegrationGuide from './pages/TelegramIntegrationGuide';
import GeminiSetupPage from './pages/GeminiSetupPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, dashboardPath } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={dashboardPath || '/'} replace /> : <LoginPage />}
      />

      {/* Student Routes */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="ai-tutor" element={<AITutor />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="study-plan" element={<StudyPlanPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher-dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="classes" element={<PlaceholderPage title="کلاس‌ها" />} />
        <Route path="students" element={<PlaceholderPage title="دانش‌آموزان" />} />
        <Route path="assignments" element={<PlaceholderPage title="تکالیف" />} />
        <Route path="exam-builder" element={<ExamBuilder />} />
        <Route path="results" element={<PlaceholderPage title="نتایج" />} />
        <Route path="analytics" element={<TeacherAnalytics />} />
        <Route path="assistant" element={<TeacherAssistant />} />
      </Route>

      {/* School Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="teachers" element={<PlaceholderPage title="معلمان" />} />
        <Route path="students" element={<PlaceholderPage title="دانش‌آموزان" />} />
        <Route path="classes" element={<PlaceholderPage title="کلاس‌ها" />} />
        <Route path="subscription" element={<PlaceholderPage title="اشتراک" />} />
        <Route path="usage" element={<PlaceholderPage title="مصرف" />} />
        <Route path="performance" element={<PlaceholderPage title="عملکرد" />} />
        <Route path="settings" element={<PlaceholderPage title="تنظیمات" />} />
      </Route>

      {/* Platform (Super Admin) Routes — New Design */}
      <Route
        path="/platform"
        element={
          <ProtectedRoute>
            <NewDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<NewDashboardHome />} />
        <Route path="subscribers" element={<PlaceholderPage title="مشترکان" />} />
        <Route path="schools" element={<PlaceholderPage title="مدارس" />} />
        <Route path="users" element={<PlaceholderPage title="کاربران" />} />
        <Route path="plans" element={<PlaceholderPage title="طرح‌ها" />} />
        <Route path="content" element={<PlaceholderPage title="محتوا و درس‌ها" />} />
        <Route path="exams" element={<PlaceholderPage title="آزمون‌ها" />} />
        <Route path="assignments" element={<PlaceholderPage title="تکالیف" />} />
        <Route path="ai" element={<PlaceholderPage title="کمک آموزشی AI" />} />
        <Route path="reports" element={<PlaceholderPage title="گزارش‌ها" />} />
        <Route path="settings" element={<PlaceholderPage title="تنظیمات" />} />
        <Route path="support" element={<PlaceholderPage title="پشتیبانی" />} />
        <Route path="tenants" element={<PlaceholderPage title="مستأجران" />} />
        <Route path="ai-usage" element={<PlaceholderPage title="مصرف AI" />} />
        <Route path="feature-flags" element={<PlaceholderPage title="پرچم ویژگی" />} />
        <Route path="audit" element={<PlaceholderPage title="ممیزی" />} />
        <Route path="health" element={<PlaceholderPage title="سلامت سیستم" />} />
        <Route path="preview" element={<PlaceholderPage title="پیش‌نمایش نقش" />} />
      </Route>

      {/* Mini App (Telegram Gateway) */}
      <Route path="/mini-app" element={<MiniAppPage />} />

      {/* Shared Pages (accessible from any role) */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SettingsPage />} />
      </Route>

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<NotificationsPage />} />
      </Route>

      <Route
        path="/upgrade"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PaywallPage />} />
      </Route>

      <Route
        path="/project-status"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProjectStatusPage />} />
      </Route>

      <Route
        path="/deploy-guide"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DeployGuidePage />} />
      </Route>

      <Route
        path="/telegram-guide"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TelegramIntegrationGuide />} />
      </Route>

      <Route
        path="/gemini-setup"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<GeminiSetupPage />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 bg-mint rounded-3xl flex items-center justify-center mb-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-dark-green">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-navy mb-2">{title}</h2>
      <p className="text-secondary-text text-center max-w-md">
        این بخش در حال توسعه است. در نسخه نهایی، تمام قابلیت‌های مدیریتی و عملیاتی در اینجا در دسترس خواهد بود.
      </p>
      <div className="mt-6 bg-soft-yellow border border-border rounded-2xl px-4 py-3">
        <p className="text-sm text-orange">
          🔧 فاز توسعه: اتصال به API و پیاده‌سازی کامل در مراحل بعدی
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
