import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../hooks/useApi';
import { statsApi, tenantApi } from '../backend/api';
import {
  Building2, School, Users, CreditCard, Zap, Flag,
  Shield, Server, Eye, Activity, CheckCircle2,
  AlertTriangle, XCircle, TrendingUp, Database,
  Globe, Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlatformDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch stats from API
  const { data: stats, loading: loadingStats } = useApi(
    () => statsApi.getPlatformStats(),
    [user?.id]
  );

  const { data: tenants, loading: loadingTenants } = useApi(
    () => tenantApi.getAll(),
    [user?.id]
  );

  if (!user) return null;

  const safeStats = stats || {
    totalTenants: 0,
    totalSchools: 0,
    totalTeachers: 0,
    totalStudents: 0,
    activeSubscriptions: 0,
    aiCallsToday: 0,
    systemHealth: 'healthy',
  };

  const safeTenants = tenants || [];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-l from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">پلتفرم آموزش هوشمند</h1>
            <p className="text-rose-100">مدیریت کل سیستم — مستأجران، مدارس، کاربران و زیرساخت</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm">سیستم فعال</span>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Building2 size={20} />} label="مستأجران" value={loadingStats ? '...' : safeStats.totalTenants.toString()} color="bg-rose-50 text-rose-600" />
        <StatCard icon={<School size={20} />} label="مدارس" value={loadingStats ? '...' : safeStats.totalSchools.toString()} color="bg-blue-50 text-blue-600" />
        <StatCard icon={<Users size={20} />} label="کاربران" value={loadingStats ? '...' : (safeStats.totalTeachers + safeStats.totalStudents).toLocaleString('fa-IR')} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={<CreditCard size={20} />} label="اشتراک فعال" value={loadingStats ? '...' : safeStats.activeSubscriptions.toString()} color="bg-amber-50 text-amber-600" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <QuickAction icon={<Building2 size={20} />} label="مستأجران" onClick={() => navigate('/platform/tenants')} />
        <QuickAction icon={<School size={20} />} label="مدارس" onClick={() => navigate('/platform/schools')} />
        <QuickAction icon={<Users size={20} />} label="کاربران" onClick={() => navigate('/platform/users')} />
        <QuickAction icon={<CreditCard size={20} />} label="طرح‌ها" onClick={() => navigate('/platform/plans')} />
        <QuickAction icon={<Eye size={20} />} label="پیش‌نمایش" onClick={() => navigate('/platform/preview')} />
      </div>

      {/* System Health & AI Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Server size={20} className="text-rose-500" />
            سلامت سیستم
          </h2>
          <div className="space-y-3">
            <HealthRow name="API Server" status="healthy" latency="۲۳ms" />
            <HealthRow name="PostgreSQL" status="healthy" latency="۸ms" />
            <HealthRow name="Redis" status="healthy" latency="۲ms" />
            <HealthRow name="AI Gateway" status="healthy" latency="۱.۲s" />
            <HealthRow name="Queue Worker" status="healthy" latency="—" />
            <HealthRow name="Vector Store" status="healthy" latency="۱۵ms" />
          </div>
        </div>

        {/* AI Usage */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            مصرف AI امروز
          </h2>
          <div className="space-y-4">
            <UsageRow label="Student Tutor" calls={2450} cost="۰.۸۵$" />
            <UsageRow label="Question Generator" calls={890} cost="۰.۴۲$" />
            <UsageRow label="Summarizer" calls={1200} cost="۰.۳۸$" />
            <UsageRow label="Teacher Assistant" calls={340} cost="۰.۲۱$" />
            <UsageRow label="Flashcard Maker" calls={560} cost="۰.۱۵$" />
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm font-medium">
                <span>مجموع</span>
                <span>۵,۴۴۰ فراخوانی — ۲.۰۱$</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tenants */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-purple-500" />
          مستأجران
        </h2>
        
        {loadingTenants ? (
          <div className="text-center py-8 text-gray-400">در حال بارگذاری...</div>
        ) : safeTenants.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Building2 size={48} className="mx-auto mb-2 opacity-30" />
            <p>هنوز مستأجری ثبت نشده است.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="text-right py-3 px-2 font-medium">نام</th>
                  <th className="text-right py-3 px-2 font-medium">طرح</th>
                  <th className="text-right py-3 px-2 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-2 font-medium">تاریخ ایجاد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {safeTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 font-medium text-gray-900">{tenant.name}</td>
                    <td className="py-3 px-2 text-gray-600">{tenant.plan}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        tenant.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tenant.status === 'active' ? 'فعال' : 'معلق'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {new Date(tenant.createdAt).toLocaleDateString('fa-IR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Feature Flags */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Flag size={20} className="text-blue-500" />
          پرچم‌های ویژگی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <FlagItem name="Podcast Generator" enabled={true} />
          <FlagItem name="PDF Creator" enabled={true} />
          <FlagItem name="Adaptive Learning" enabled={false} />
          <FlagItem name="Source Guardian v2" enabled={true} />
          <FlagItem name="Bale Channel" enabled={false} />
          <FlagItem name="Parent Module" enabled={false} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: {
  icon: React.ReactNode; label: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200
                 hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      <div className="text-rose-500">{icon}</div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

function HealthRow({ name, status, latency }: { name: string; status: string; latency: string }) {
  const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    healthy: { icon: <CheckCircle2 size={14} />, color: 'text-emerald-500' },
    degraded: { icon: <AlertTriangle size={14} />, color: 'text-amber-500' },
    down: { icon: <XCircle size={14} />, color: 'text-red-500' },
  };
  const config = statusConfig[status] || statusConfig.healthy;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className={config.color}>{config.icon}</span>
        <span className="text-sm text-gray-700">{name}</span>
      </div>
      <span className="text-xs text-gray-400 font-mono">{latency}</span>
    </div>
  );
}

function UsageRow({ label, calls, cost }: { label: string; calls: number; cost: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{calls.toLocaleString('fa-IR')} فراخوانی</span>
        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{cost}</span>
      </div>
    </div>
  );
}

function FlagItem({ name, enabled }: { name: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
      <span className="text-sm text-gray-700">{name}</span>
      <div className={`w-8 h-5 rounded-full relative transition-colors ${enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
          enabled ? 'right-0.5' : 'right-3.5'
        }`} />
      </div>
    </div>
  );
}
