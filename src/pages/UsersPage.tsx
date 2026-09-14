import React, { useState } from 'react';
import {
  Users as UsersIcon, Plus, Search, Filter, MoreVertical,
  Mail, Phone, Shield, CheckCircle2, UserCheck, GraduationCap,
  BookOpen, Building2, Edit, Trash2, Eye
} from 'lucide-react';
import { Modal, FormField, SelectField } from '../components/Modal';

const USERS_DATA = [
  { id: '1', name: 'علی محمدی', email: 'ali@example.com', role: 'دانش‌آموز', school: 'دبیرستان شهید بهشتی', status: 'active', joinDate: '۱۴۰۲/۰۷/۱۵' },
  { id: '2', name: 'فاطمه احمدی', email: 'fateme@example.com', role: 'دانش‌آموز', school: 'دبیرستان شهید بهشتی', status: 'active', joinDate: '۱۴۰۲/۰۷/۲۰' },
  { id: '3', name: 'مریم کریمی', email: 'maryam@example.com', role: 'معلم', school: 'دبیرستان شهید بهشتی', status: 'active', joinDate: '۱۴۰۲/۰۶/۱۰' },
  { id: '4', name: 'رضا حسینی', email: 'reza@example.com', role: 'معلم', school: 'دبیرستان امام صادق', status: 'active', joinDate: '۱۴۰۲/۰۶/۱۵' },
  { id: '5', name: 'زهرا رضایی', email: 'zahra@example.com', role: 'دانش‌آموز', school: 'دبیرستان انرژی اتمی', status: 'active', joinDate: '۱۴۰۲/۰۸/۰۵' },
  { id: '6', name: 'محمد صادقی', email: 'mohammad@example.com', role: 'مدیر مدرسه', school: 'دبیرستان علامه حلی', status: 'active', joinDate: '۱۴۰۲/۰۵/۲۰' },
  { id: '7', name: 'سارا عباسی', email: 'sara@example.com', role: 'دانش‌آموز', school: 'دبیرستان فرزانگان', status: 'suspended', joinDate: '۱۴۰۲/۰۹/۱۲' },
  { id: '8', name: 'حسین نوری', email: 'hossein@example.com', role: 'معلم', school: 'دبیرستان تیزهوشان', status: 'active', joinDate: '۱۴۰۲/۰۴/۲۵' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [users, setUsers] = useState(USERS_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'دانش‌آموز',
    school: ''
  });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = users.filter(user => {
    const matchesSearch = user.name.includes(search) || user.email.includes(search);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const students = users.filter(u => u.role === 'دانش‌آموز').length;
  const teachers = users.filter(u => u.role === 'معلم').length;
  const admins = users.filter(u => u.role === 'مدیر مدرسه').length;

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.school) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      school: newUser.school,
      status: 'active' as const,
      joinDate: new Date().toLocaleDateString('fa-IR')
    };

    setUsers([user, ...users]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'دانش‌آموز', school: '' });
    alert('✅ کاربر با موفقیت اضافه شد!');
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.school) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setShowEditModal(false);
    setEditingUser(null);
    alert('✅ کاربر با موفقیت ویرایش شد!');
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      setUsers(users.filter(u => u.id !== id));
      setOpenMenu(null);
      alert('✅ کاربر با موفقیت حذف شد!');
    }
  };

  const handleViewUser = (user: any) => {
    alert(`مشاهده جزئیات: ${user.name}`);
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">کاربران</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت کاربران پلتفرم</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold
                         hover:bg-deep-green transition-colors shadow-lg shadow-primary-green/20
                         flex items-center gap-2">
          <Plus size={18} />
          <span>افزودن کاربر جدید</span>
        </button>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="افزودن کاربر جدید">
        <div className="space-y-4">
          <FormField
            label="نام کامل"
            placeholder="مثلاً: علی محمدی"
            value={newUser.name}
            onChange={(value) => setNewUser({ ...newUser, name: value })}
            required
          />
          <FormField
            label="ایمیل"
            type="email"
            placeholder="example@email.com"
            value={newUser.email}
            onChange={(value) => setNewUser({ ...newUser, email: value })}
            required
          />
          <SelectField
            label="نقش"
            value={newUser.role}
            onChange={(value) => setNewUser({ ...newUser, role: value })}
            options={[
              { value: 'دانش‌آموز', label: 'دانش‌آموز' },
              { value: 'معلم', label: 'معلم' },
              { value: 'مدیر مدرسه', label: 'مدیر مدرسه' }
            ]}
          />
          <FormField
            label="مدرسه"
            placeholder="مثلاً: دبیرستان شهید بهشتی"
            value={newUser.school}
            onChange={(value) => setNewUser({ ...newUser, school: value })}
            required
          />
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddUser}
              className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors"
            >
              افزودن کاربر
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors"
            >
              انصراف
            </button>
          </div>
        </div>
      </Modal>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<UsersIcon size={20} />} label="کل کاربران" value={totalUsers.toString()} bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<GraduationCap size={20} />} label="دانش‌آموزان" value={students.toString()} bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<BookOpen size={20} />} label="معلمان" value={teachers.toString()} bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<Building2 size={20} />} label="مدیران" value={admins.toString()} bgColor="bg-soft-pink" iconColor="text-primary-pink" />
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
              placeholder="جستجو در نام یا ایمیل..."
              className="w-full bg-bg border border-border rounded-xl pr-10 pl-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green/30"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-navy
                       focus:outline-none focus:ring-2 focus:ring-primary-green/20"
          >
            <option value="all">همه نقش‌ها</option>
            <option value="دانش‌آموز">دانش‌آموز</option>
            <option value="معلم">معلم</option>
            <option value="مدیر مدرسه">مدیر مدرسه</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">کاربر</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">ایمیل</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نقش</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مدرسه</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ عضویت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-navy text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-sm text-secondary-text">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      user.role === 'دانش‌آموز' ? 'bg-lavender text-purple' :
                      user.role === 'معلم' ? 'bg-mint text-dark-green' :
                      'bg-soft-yellow text-orange'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-navy">{user.school}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      user.status === 'active'
                        ? 'bg-success-bg text-success-text'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {user.status === 'active' ? 'فعال' : 'معلق'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{user.joinDate}</td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)} className="p-2 hover:bg-bg rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-secondary-text" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleViewUser(user)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2">
                          <Eye size={14} /> مشاهده
                        </button>
                        <button onClick={() => handleEditUser(user)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2">
                          <Edit size={14} /> ویرایش
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 size={14} /> حذف
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <UsersIcon size={48} className="mx-auto text-secondary-text/30 mb-3" />
            <p className="text-secondary-text">کاربری یافت نشد</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <p className="text-sm text-secondary-text">
            نمایش ۱ تا {filtered.length} از {filtered.length} کاربر
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm bg-bg border border-border rounded-lg text-secondary-text hover:bg-hover-green">قبلی</button>
            <button className="px-3 py-1.5 text-sm gradient-button text-white rounded-lg">۱</button>
            <button className="px-3 py-1.5 text-sm bg-bg border border-border rounded-lg text-secondary-text hover:bg-hover-green">بعدی</button>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="ویرایش کاربر">
        {editingUser && (
          <div className="space-y-4">
            <FormField
              label="نام کامل"
              value={editingUser.name}
              onChange={(value) => setEditingUser({ ...editingUser, name: value })}
              required
            />
            <FormField
              label="ایمیل"
              type="email"
              value={editingUser.email}
              onChange={(value) => setEditingUser({ ...editingUser, email: value })}
              required
            />
            <SelectField
              label="نقش"
              value={editingUser.role}
              onChange={(value) => setEditingUser({ ...editingUser, role: value })}
              options={[
                { value: 'دانش‌آموز', label: 'دانش‌آموز' },
                { value: 'معلم', label: 'معلم' },
                { value: 'مدیر مدرسه', label: 'مدیر مدرسه' }
              ]}
            />
            <FormField
              label="مدرسه"
              value={editingUser.school}
              onChange={(value) => setEditingUser({ ...editingUser, school: value })}
              required
            />
            <SelectField
              label="وضعیت"
              value={editingUser.status}
              onChange={(value) => setEditingUser({ ...editingUser, status: value })}
              options={[
                { value: 'active', label: 'فعال' },
                { value: 'suspended', label: 'معلق' }
              ]}
            />
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveEdit}
                className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors"
              >
                ذخیره تغییرات
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        )}
      </Modal>
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
