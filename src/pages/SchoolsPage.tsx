import React, { useState } from 'react';
import { School as SchoolIcon, Plus, Search, Filter, MoreVertical, MapPin, Users, GraduationCap, CheckCircle2 } from 'lucide-react';

const SCHOOLS_DATA = [
  { id: '1', name: 'دبیرستان شهید بهشتی', city: 'تهران', plan: 'مدرسه', teachers: 24, students: 485, status: 'active', joinDate: '۱۴۰۲/۰۶/۱۵' },
  { id: '2', name: 'دبیرستان امام صادق (ع)', city: 'اصفهان', plan: 'مدرسه', teachers: 18, students: 320, status: 'active', joinDate: '۱۴۰۲/۰۷/۲۰' },
  { id: '3', name: 'دبیرستان انرژی اتمی', city: 'یزد', plan: 'سازمانی', teachers: 32, students: 650, status: 'active', joinDate: '۱۴۰۲/۰۵/۱۰' },
  { id: '4', name: 'دبیرستان علامه حلی', city: 'مشهد', plan: 'مدرسه', teachers: 20, students: 410, status: 'active', joinDate: '۱۴۰۲/۰۸/۰۵' },
  { id: '5', name: 'دبیرستان فرزانگان', city: 'شیراز', plan: 'مدرسه', teachers: 22, students: 380, status: 'suspended', joinDate: '۱۴۰۲/۰۹/۱۲' },
  { id: '6', name: 'دبیرستان تیزهوشان', city: 'تبریز', plan: 'سازمانی', teachers: 28, students: 520, status: 'active', joinDate: '۱۴۰۲/۰۴/۲۵' },
  { id: '7', name: 'دبیرستان نمونه دولتی', city: 'کرج', plan: 'مدرسه', teachers: 16, students: 290, status: 'active', joinDate: '۱۴۰۲/۱۰/۰۱' },
  { id: '8', name: 'دبیرستان سلام', city: 'اهواز', plan: 'مدرسه', teachers: 14, students: 245, status: 'active', joinDate: '۱۴۰۲/۱۱/۱۵' },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filtered = SCHOOLS_DATA.filter(school => {
    const matchesSearch = school.name.includes(search) || school.city.includes(search);
    const matchesFilter = filter === 'all' || school.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalSchools = SCHOOLS_DATA.length;
  const activeSchools = SCHOOLS_DATA.filter(s => s.status === 'active').length;
  const totalTeachers = SCHOOLS_DATA.reduce((sum, s) => sum + s.teachers, 0);
  const totalStudents = SCHOOLS_DATA.reduce((sum, s) => sum + s.students, 0);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">مدارس</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت مدارس و مستأجران پلتفرم</p>
        </div>
        <button className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold
                         hover:bg-deep-green transition-colors shadow-lg shadow-primary-green/20
                         flex items-center gap-2">
          <Plus size={18} />
          <span>افزودن مدرسه جدید</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<SchoolIcon size={20} />} label="کل مدارس" value={totalSchools.toString()} bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<CheckCircle2 size={20} />} label="مدارس فعال" value={activeSchools.toString()} bgColor="bg-soft-mint" iconColor="text-dark-green" />
        <StatCard icon={<GraduationCap size={20} />} label="کل معلمان" value={totalTeachers.toLocaleString('fa-IR')} bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Users size={20} />} label="کل دانش‌آموزان" value={totalStudents.toLocaleString('fa-IR')} bgColor="bg-soft-yellow" iconColor="text-orange" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در نام مدرسه یا شهر..."
              className="w-full bg-bg border border-border rounded-xl pr-10 pl-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green/30"
            />
          </div>
          <div className="flex gap-2">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>همه</FilterButton>
            <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>فعال</FilterButton>
            <FilterButton active={filter === 'suspended'} onClick={() => setFilter('suspended')}>معلق</FilterButton>
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نام مدرسه</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">شهر</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">طرح</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">معلمان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">دانش‌آموزان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ عضویت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((school) => (
                <tr key={school.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center">
                        <SchoolIcon size={18} className="text-dark-green" />
                      </div>
                      <span className="font-bold text-navy text-sm">{school.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-sm text-secondary-text">
                      <MapPin size={14} />
                      <span>{school.city}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-xs bg-lavender text-purple px-2.5 py-1 rounded-full font-medium">
                      {school.plan}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{school.teachers}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{school.students.toLocaleString('fa-IR')}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      school.status === 'active'
                        ? 'bg-success-bg text-success-text'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {school.status === 'active' ? 'فعال' : 'معلق'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{school.joinDate}</td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-secondary-text" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <SchoolIcon size={48} className="mx-auto text-secondary-text/30 mb-3" />
            <p className="text-secondary-text">مدرسه‌ای یافت نشد</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <p className="text-sm text-secondary-text">
            نمایش ۱ تا {filtered.length} از {filtered.length} مدرسه
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm bg-bg border border-border rounded-lg text-secondary-text hover:bg-hover-green">قبلی</button>
            <button className="px-3 py-1.5 text-sm gradient-button text-white rounded-lg">۱</button>
            <button className="px-3 py-1.5 text-sm bg-bg border border-border rounded-lg text-secondary-text hover:bg-hover-green">بعدی</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bgColor, iconColor }: {
  icon: React.ReactNode; label: string; value: string; bgColor: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-5 card-shadow">
      <div className={`w-11 h-11 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-navy">{value}</p>
      <p className="text-sm text-secondary-text mt-1">{label}</p>
    </div>
  );
}

function FilterButton({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'gradient-button text-white shadow-sm'
          : 'bg-bg border border-border text-secondary-text hover:bg-hover-green'
      }`}
    >
      {children}
    </button>
  );
}
