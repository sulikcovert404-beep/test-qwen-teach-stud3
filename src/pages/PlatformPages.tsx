import React, { useState } from 'react';
import {
  CreditCard, Check, Star, Zap, Crown, Building2, Users,
  Sparkles, Plus, Search, MoreVertical, TrendingUp,
  Calendar, FileText, MessageSquare, BarChart3, Settings as SettingsIcon,
  HelpCircle, Mail, Phone, Send, Bot, Lightbulb, BookOpen,
  ClipboardList, Award, Target, Brain, Shield, Edit, Trash2, Download,
  Save, X, Eye
} from 'lucide-react';
import { Modal, FormField, SelectField } from '../components/Modal';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// ============ PLANS PAGE ============
export function PlansPage() {
  const [plans, setPlans] = useState([
    { id: '1', name: 'رایگان', code: 'FREE', price: '۰', users: 1245, schools: 0, color: 'bg-gray-100', textColor: 'text-gray-700' },
    { id: '2', name: 'دانش‌آموز پلاس', code: 'STUDENT_PRO', price: '۴۹,۰۰۰', users: 856, schools: 0, color: 'bg-mint', textColor: 'text-dark-green' },
    { id: '3', name: 'معلم حرفه‌ای', code: 'TEACHER_PRO', price: '۹۹,۰۰۰', users: 124, schools: 0, color: 'bg-lavender', textColor: 'text-purple' },
    { id: '4', name: 'مدرسه', code: 'SCHOOL', price: '۴۹۰,۰۰۰', users: 0, schools: 28, color: 'bg-soft-yellow', textColor: 'text-orange' },
    { id: '5', name: 'سازمانی', code: 'ENTERPRISE', price: 'تماس بگیرید', users: 0, schools: 4, color: 'bg-soft-pink', textColor: 'text-primary-pink' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({ name: '', price: '' });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleAddPlan = () => {
    if (!newPlan.name || !newPlan.price) {
      alert('لطفاً نام و قیمت طرح را وارد کنید');
      return;
    }
    const plan = {
      id: Date.now().toString(),
      name: newPlan.name,
      code: newPlan.name.toUpperCase().replace(/\s/g, '_'),
      price: newPlan.price,
      users: 0,
      schools: 0,
      color: 'bg-mint',
      textColor: 'text-dark-green'
    };
    setPlans([...plans, plan]);
    setShowAddModal(false);
    setNewPlan({ name: '', price: '' });
    alert('✅ طرح با موفقیت ایجاد شد!');
  };

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan);
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    if (!editingPlan.name || !editingPlan.price) {
      alert('لطفاً تمام فیلدها را پر کنید');
      return;
    }
    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    setShowEditModal(false);
    setEditingPlan(null);
    alert('✅ طرح با موفقیت ویرایش شد!');
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('آیا از حذف این طرح مطمئن هستید؟')) {
      setPlans(plans.filter(p => p.id !== id));
      setOpenMenu(null);
      alert('✅ طرح با موفقیت حذف شد!');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">طرح‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت طرح‌های اشتراک پلتفرم</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
          <Plus size={18} /><span>ایجاد طرح جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-3xl p-6 card-shadow hover:card-shadow-hover transition-all relative">
            <button
              onClick={() => setOpenMenu(openMenu === plan.id ? null : plan.id)}
              className="absolute top-4 left-4 p-2 hover:bg-bg rounded-lg transition-colors"
            >
              <MoreVertical size={16} className="text-secondary-text" />
            </button>
            {openMenu === plan.id && (
              <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                <button onClick={() => handleEditPlan(plan)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2">
                  <Edit size={14} /> ویرایش
                </button>
                <button onClick={() => handleDeletePlan(plan.id)} className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Trash2 size={14} /> حذف
                </button>
              </div>
            )}
            <div className={`w-12 h-12 ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
              {plan.code === 'FREE' ? <Zap size={22} className={plan.textColor} /> :
               plan.code === 'ENTERPRISE' ? <Crown size={22} className={plan.textColor} /> :
               <Star size={22} className={plan.textColor} />}
            </div>
            <h3 className="text-lg font-bold text-navy mb-1">{plan.name}</h3>
            <p className="text-2xl font-extrabold text-dark-green mb-4">{plan.price} <span className="text-sm text-secondary-text font-normal">تومان / ماه</span></p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-text">کاربران فعال</span>
                <span className="font-bold text-navy">{plan.users.toLocaleString('fa-IR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-text">مدارس فعال</span>
                <span className="font-bold text-navy">{plan.schools.toLocaleString('fa-IR')}</span>
              </div>
            </div>
            <button onClick={() => handleEditPlan(plan)} className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-navy hover:bg-bg transition-colors">
              ویرایش طرح
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ایجاد طرح جدید">
        <div className="space-y-4">
          <FormField label="نام طرح" placeholder="مثلاً: طرح ویژه" value={newPlan.name} onChange={(value) => setNewPlan({ ...newPlan, name: value })} required />
          <FormField label="قیمت (تومان / ماه)" placeholder="مثلاً: ۹۹,۰۰۰" value={newPlan.price} onChange={(value) => setNewPlan({ ...newPlan, price: value })} required />
          <div className="flex gap-3 pt-4">
            <button onClick={handleAddPlan} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ایجاد طرح</button>
            <button onClick={() => setShowAddModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="ویرایش طرح">
        {editingPlan && (
          <div className="space-y-4">
            <FormField label="نام طرح" value={editingPlan.name} onChange={(value) => setEditingPlan({ ...editingPlan, name: value })} required />
            <FormField label="قیمت (تومان / ماه)" value={editingPlan.price} onChange={(value) => setEditingPlan({ ...editingPlan, price: value })} required />
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveEdit} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ذخیره تغییرات</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ============ CONTENT PAGE ============
export function ContentPage() {
  const [contents, setContents] = useState([
    { id: '1', title: 'ریاضی پایه دهم - فصل ۳', subject: 'ریاضی', grade: 'دهم', type: 'درس', author: 'مریم احمدی', status: 'published', date: '۱۴۰۲/۰۹/۱۵' },
    { id: '2', title: 'فیزیک - حرکت‌شناسی', subject: 'فیزیک', grade: 'یازدهم', type: 'درس', author: 'رضا حسینی', status: 'published', date: '۱۴۰۲/۰۹/۱۰' },
    { id: '3', title: 'شیمی آلی - مقدماتی', subject: 'شیمی', grade: 'دوازدهم', type: 'جزوه', author: 'زهرا رضایی', status: 'draft', date: '۱۴۰۲/۰۹/۰۵' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [newContent, setNewContent] = useState({ title: '', subject: '', grade: '', type: 'درس', author: '' });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newContent.title || !newContent.subject || !newContent.author) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }
    const content = { id: Date.now().toString(), ...newContent, status: 'draft', date: new Date().toLocaleDateString('fa-IR') };
    setContents([content, ...contents]);
    setShowAddModal(false);
    setNewContent({ title: '', subject: '', grade: '', type: 'درس', author: '' });
    alert('✅ محتوا با موفقیت ایجاد شد!');
  };

  const handleEdit = (item: any) => {
    setEditingContent(item);
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    setContents(contents.map(c => c.id === editingContent.id ? editingContent : c));
    setShowEditModal(false);
    alert('✅ محتوا با موفقیت ویرایش شد!');
  };

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این محتوا مطمئن هستید؟')) {
      setContents(contents.filter(c => c.id !== id));
      setOpenMenu(null);
      alert('✅ محتوا با موفقیت حذف شد!');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">محتوا و درس‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت محتوای آموزشی پلتفرم</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
          <Plus size={18} /><span>ایجاد محتوای جدید</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">پایه</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نوع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نویسنده</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contents.map((item) => (
                <tr key={item.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{item.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{item.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.grade}</td>
                  <td className="py-4 px-5"><span className="text-xs bg-mint text-dark-green px-2.5 py-1 rounded-full font-medium">{item.type}</span></td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.author}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.status === 'published' ? 'bg-success-bg text-success-text' : 'bg-soft-yellow text-orange'}`}>
                      {item.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)} className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                    {openMenu === item.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleEdit(item)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Edit size={14} /> ویرایش</button>
                        <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> حذف</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ایجاد محتوای جدید">
        <div className="space-y-4">
          <FormField label="عنوان" value={newContent.title} onChange={(value) => setNewContent({ ...newContent, title: value })} required />
          <FormField label="درس" value={newContent.subject} onChange={(value) => setNewContent({ ...newContent, subject: value })} required />
          <FormField label="پایه تحصیلی" value={newContent.grade} onChange={(value) => setNewContent({ ...newContent, grade: value })} />
          <SelectField label="نوع" value={newContent.type} onChange={(value) => setNewContent({ ...newContent, type: value })} options={[{ value: 'درس', label: 'درس' }, { value: 'جزوه', label: 'جزوه' }, { value: 'ویدئو', label: 'ویدئو' }]} />
          <FormField label="نویسنده" value={newContent.author} onChange={(value) => setNewContent({ ...newContent, author: value })} required />
          <div className="flex gap-3 pt-4">
            <button onClick={handleAdd} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ایجاد محتوا</button>
            <button onClick={() => setShowAddModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="ویرایش محتوا">
        {editingContent && (
          <div className="space-y-4">
            <FormField label="عنوان" value={editingContent.title} onChange={(value) => setEditingContent({ ...editingContent, title: value })} required />
            <FormField label="درس" value={editingContent.subject} onChange={(value) => setEditingContent({ ...editingContent, subject: value })} required />
            <FormField label="پایه تحصیلی" value={editingContent.grade} onChange={(value) => setEditingContent({ ...editingContent, grade: value })} />
            <SelectField label="نوع" value={editingContent.type} onChange={(value) => setEditingContent({ ...editingContent, type: value })} options={[{ value: 'درس', label: 'درس' }, { value: 'جزوه', label: 'جزوه' }, { value: 'ویدئو', label: 'ویدئو' }]} />
            <FormField label="نویسنده" value={editingContent.author} onChange={(value) => setEditingContent({ ...editingContent, author: value })} required />
            <SelectField label="وضعیت" value={editingContent.status} onChange={(value) => setEditingContent({ ...editingContent, status: value })} options={[{ value: 'draft', label: 'پیش‌نویس' }, { value: 'published', label: 'منتشر شده' }]} />
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveEdit} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ذخیره تغییرات</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ============ EXAMS PAGE ============
export function ExamsPage() {
  const [exams, setExams] = useState([
    { id: '1', title: 'آزمون میان‌ترم ریاضی دهم', subject: 'ریاضی', grade: 'دهم', questions: 20, duration: 60, participants: 125, avgScore: 16.8, status: 'completed' },
    { id: '2', title: 'آزمون فصل ۲ فیزیک', subject: 'فیزیک', grade: 'یازدهم', questions: 15, duration: 45, participants: 98, avgScore: 15.2, status: 'completed' },
    { id: '3', title: 'کوییز شیمی - پیوندها', subject: 'شیمی', grade: 'دوازدهم', questions: 10, duration: 20, participants: 85, avgScore: 17.5, status: 'active' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  const [newExam, setNewExam] = useState({ title: '', subject: '', grade: '', questions: '', duration: '' });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newExam.title || !newExam.subject) {
      alert('لطفاً عنوان و درس آزمون را وارد کنید');
      return;
    }
    const exam = { id: Date.now().toString(), title: newExam.title, subject: newExam.subject, grade: newExam.grade, questions: parseInt(newExam.questions) || 0, duration: parseInt(newExam.duration) || 0, participants: 0, avgScore: 0, status: 'scheduled' };
    setExams([exam, ...exams]);
    setShowAddModal(false);
    setNewExam({ title: '', subject: '', grade: '', questions: '', duration: '' });
    alert('✅ آزمون با موفقیت ایجاد شد!');
  };

  const handleEdit = (item: any) => {
    setEditingExam(item);
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    setExams(exams.map(e => e.id === editingExam.id ? editingExam : e));
    setShowEditModal(false);
    alert('✅ آزمون با موفقیت ویرایش شد!');
  };

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این آزمون مطمئن هستید؟')) {
      setExams(exams.filter(e => e.id !== id));
      setOpenMenu(null);
      alert('✅ آزمون با موفقیت حذف شد!');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">آزمون‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت آزمون‌های پلتفرم</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
          <Plus size={18} /><span>ایجاد آزمون جدید</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان آزمون</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">سؤالات</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مدت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">شرکت‌کنندگان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">میانگین</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{exam.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{exam.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{exam.questions}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{exam.duration} دقیقه</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{exam.participants.toLocaleString('fa-IR')}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{exam.avgScore > 0 ? exam.avgScore : '—'}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${exam.status === 'completed' ? 'bg-success-bg text-success-text' : exam.status === 'active' ? 'bg-mint text-dark-green' : 'bg-soft-yellow text-orange'}`}>
                      {exam.status === 'completed' ? 'تکمیل شده' : exam.status === 'active' ? 'فعال' : 'زمان‌بندی شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === exam.id ? null : exam.id)} className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                    {openMenu === exam.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleEdit(exam)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Edit size={14} /> ویرایش</button>
                        <button onClick={() => handleDelete(exam.id)} className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> حذف</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ایجاد آزمون جدید">
        <div className="space-y-4">
          <FormField label="عنوان آزمون" value={newExam.title} onChange={(value) => setNewExam({ ...newExam, title: value })} required />
          <FormField label="درس" value={newExam.subject} onChange={(value) => setNewExam({ ...newExam, subject: value })} required />
          <FormField label="پایه تحصیلی" value={newExam.grade} onChange={(value) => setNewExam({ ...newExam, grade: value })} />
          <FormField label="تعداد سؤالات" type="number" value={newExam.questions} onChange={(value) => setNewExam({ ...newExam, questions: value })} />
          <FormField label="مدت آزمون (دقیقه)" type="number" value={newExam.duration} onChange={(value) => setNewExam({ ...newExam, duration: value })} />
          <div className="flex gap-3 pt-4">
            <button onClick={handleAdd} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ایجاد آزمون</button>
            <button onClick={() => setShowAddModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="ویرایش آزمون">
        {editingExam && (
          <div className="space-y-4">
            <FormField label="عنوان آزمون" value={editingExam.title} onChange={(value) => setEditingExam({ ...editingExam, title: value })} required />
            <FormField label="درس" value={editingExam.subject} onChange={(value) => setEditingExam({ ...editingExam, subject: value })} required />
            <FormField label="پایه تحصیلی" value={editingExam.grade} onChange={(value) => setEditingExam({ ...editingExam, grade: value })} />
            <FormField label="تعداد سؤالات" type="number" value={editingExam.questions.toString()} onChange={(value) => setEditingExam({ ...editingExam, questions: parseInt(value) || 0 })} />
            <FormField label="مدت آزمون (دقیقه)" type="number" value={editingExam.duration.toString()} onChange={(value) => setEditingExam({ ...editingExam, duration: parseInt(value) || 0 })} />
            <SelectField label="وضعیت" value={editingExam.status} onChange={(value) => setEditingExam({ ...editingExam, status: value })} options={[{ value: 'scheduled', label: 'زمان‌بندی شده' }, { value: 'active', label: 'فعال' }, { value: 'completed', label: 'تکمیل شده' }]} />
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveEdit} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ذخیره تغییرات</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ============ ASSIGNMENTS PAGE ============
export function AssignmentsPage() {
  const [assignments, setAssignments] = useState([
    { id: '1', title: 'تمرین‌های فصل ۳ ریاضی', subject: 'ریاضی', class: 'دهم الف', teacher: 'مریم احمدی', dueDate: '۱۴ بهمن', submissions: 28, total: 32, status: 'active' },
    { id: '2', title: 'گزارش آزمایش حرکت', subject: 'فیزیک', class: 'یازدهم ب', teacher: 'رضا حسینی', dueDate: '۱۶ بهمن', submissions: 15, total: 28, status: 'active' },
    { id: '3', title: 'تحلیل شعر حافظ', subject: 'ادبیات', class: 'دهم الف', teacher: 'سارا عباسی', dueDate: '۱۰ بهمن', submissions: 32, total: 32, status: 'closed' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [newAssignment, setNewAssignment] = useState({ title: '', subject: '', class: '', teacher: '', dueDate: '', total: '' });
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.class) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }
    const assignment = { id: Date.now().toString(), title: newAssignment.title, subject: newAssignment.subject, class: newAssignment.class, teacher: newAssignment.teacher, dueDate: newAssignment.dueDate, submissions: 0, total: parseInt(newAssignment.total) || 0, status: 'active' };
    setAssignments([assignment, ...assignments]);
    setShowAddModal(false);
    setNewAssignment({ title: '', subject: '', class: '', teacher: '', dueDate: '', total: '' });
    alert('✅ تکلیف با موفقیت ایجاد شد!');
  };

  const handleEdit = (item: any) => {
    setEditingAssignment(item);
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = () => {
    setAssignments(assignments.map(a => a.id === editingAssignment.id ? editingAssignment : a));
    setShowEditModal(false);
    alert('✅ تکلیف با موفقیت ویرایش شد!');
  };

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این تکلیف مطمئن هستید؟')) {
      setAssignments(assignments.filter(a => a.id !== id));
      setOpenMenu(null);
      alert('✅ تکلیف با موفقیت حذف شد!');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">تکالیف</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت تکالیف دانش‌آموزان</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
          <Plus size={18} /><span>ایجاد تکلیف جدید</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان تکلیف</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">کلاس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">معلم</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مهلت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">ارسال شده</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assignments.map((item) => (
                <tr key={item.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{item.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{item.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.class}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.teacher}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.dueDate}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                        <div className="h-full gradient-button rounded-full" style={{ width: `${(item.submissions / item.total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-secondary-text">{item.submissions}/{item.total}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.status === 'active' ? 'bg-mint text-dark-green' : item.status === 'closed' ? 'bg-soft-yellow text-orange' : 'bg-success-bg text-success-text'}`}>
                      {item.status === 'active' ? 'فعال' : item.status === 'closed' ? 'بسته شده' : 'نمره داده شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)} className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                    {openMenu === item.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleEdit(item)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Edit size={14} /> ویرایش</button>
                        <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> حذف</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ایجاد تکلیف جدید">
        <div className="space-y-4">
          <FormField label="عنوان تکلیف" value={newAssignment.title} onChange={(value) => setNewAssignment({ ...newAssignment, title: value })} required />
          <FormField label="درس" value={newAssignment.subject} onChange={(value) => setNewAssignment({ ...newAssignment, subject: value })} required />
          <FormField label="کلاس" value={newAssignment.class} onChange={(value) => setNewAssignment({ ...newAssignment, class: value })} required />
          <FormField label="معلم" value={newAssignment.teacher} onChange={(value) => setNewAssignment({ ...newAssignment, teacher: value })} />
          <FormField label="مهلت ارسال" value={newAssignment.dueDate} onChange={(value) => setNewAssignment({ ...newAssignment, dueDate: value })} />
          <FormField label="تعداد دانش‌آموزان" type="number" value={newAssignment.total} onChange={(value) => setNewAssignment({ ...newAssignment, total: value })} />
          <div className="flex gap-3 pt-4">
            <button onClick={handleAdd} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ایجاد تکلیف</button>
            <button onClick={() => setShowAddModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="ویرایش تکلیف">
        {editingAssignment && (
          <div className="space-y-4">
            <FormField label="عنوان تکلیف" value={editingAssignment.title} onChange={(value) => setEditingAssignment({ ...editingAssignment, title: value })} required />
            <FormField label="درس" value={editingAssignment.subject} onChange={(value) => setEditingAssignment({ ...editingAssignment, subject: value })} required />
            <FormField label="کلاس" value={editingAssignment.class} onChange={(value) => setEditingAssignment({ ...editingAssignment, class: value })} required />
            <FormField label="معلم" value={editingAssignment.teacher} onChange={(value) => setEditingAssignment({ ...editingAssignment, teacher: value })} />
            <FormField label="مهلت ارسال" value={editingAssignment.dueDate} onChange={(value) => setEditingAssignment({ ...editingAssignment, dueDate: value })} />
            <SelectField label="وضعیت" value={editingAssignment.status} onChange={(value) => setEditingAssignment({ ...editingAssignment, status: value })} options={[{ value: 'active', label: 'فعال' }, { value: 'closed', label: 'بسته شده' }, { value: 'graded', label: 'نمره داده شده' }]} />
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveEdit} className="flex-1 gradient-button text-white py-2.5 rounded-xl text-sm font-bold hover:bg-deep-green transition-colors">ذخیره تغییرات</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 bg-bg border border-border text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-hover-green transition-colors">انصراف</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ============ REPORTS PAGE ============
export function ReportsPage() {
  const monthlyData = [
    { month: 'فروردین', revenue: 45, users: 420 },
    { month: 'اردیبهشت', revenue: 62, users: 580 },
    { month: 'خرداد', revenue: 78, users: 720 },
    { month: 'تیر', revenue: 71, users: 650 },
    { month: 'مرداد', revenue: 85, users: 780 },
    { month: 'شهریور', revenue: 98, users: 920 },
    { month: 'مهر', revenue: 125, users: 1245 },
  ];

  const pieData = [
    { name: 'دانش‌آموزان', value: 65, color: '#10B981' },
    { name: 'معلمان', value: 20, color: '#7253E8' },
    { name: 'مدیران', value: 10, color: '#F58634' },
    { name: 'سایر', value: 5, color: '#FF2E75' },
  ];

  const handleExport = (type: string) => {
    alert(`✅ گزارش ${type} با موفقیت دانلود شد!`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">گزارش‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">آمار و گزارش‌های تحلیلی پلتفرم</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('PDF')} className="bg-white border border-border text-navy px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-bg transition-colors">
            <Download size={16} /><span>خروجی PDF</span>
          </button>
          <button onClick={() => handleExport('Excel')} className="gradient-button text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
            <Download size={16} /><span>خروجی Excel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={20} />} label="رشد ماهانه" value="+۲۸٪" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Users size={20} />} label="کاربران جدید" value="۳۲۵" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<CreditCard size={20} />} label="درآمد ماه" value="۱۲۵M" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Building2 size={20} />} label="مدارس جدید" value="۴" bgColor="bg-soft-yellow" iconColor="text-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-navy mb-4">درآمد ماهانه (میلیون تومان)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF4" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E8EEF4', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-navy mb-4">توزیع کاربران</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-secondary-text">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS PAGE ============
export function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: 'آموزش هوشمند',
    language: 'فارسی',
    timezone: 'Asia/Tehran',
    currency: 'تومان (IRR)',
    emailNotification: true,
    smsNotification: false,
    telegramNotification: true,
    systemNotification: true,
    twoFactorAuth: true,
    autoLock: true,
    activityLog: true,
    ipRestriction: false,
  });

  const handleSave = () => {
    alert('✅ تنظیمات با موفقیت ذخیره شد!');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">تنظیمات</h1>
          <p className="text-sm text-secondary-text mt-1">تنظیمات عمومی پلتفرم</p>
        </div>
        <button onClick={handleSave} className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-deep-green transition-colors">
          <Save size={18} /><span>ذخیره تنظیمات</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center">
              <SettingsIcon size={18} className="text-dark-green" />
            </div>
            <h3 className="text-lg font-bold text-navy">تنظیمات عمومی</h3>
          </div>
          <div className="space-y-4">
            <FormField label="نام پلتفرم" value={settings.platformName} onChange={(value) => setSettings({ ...settings, platformName: value })} />
            <FormField label="زبان پیش‌فرض" value={settings.language} onChange={(value) => setSettings({ ...settings, language: value })} />
            <FormField label="منطقه زمانی" value={settings.timezone} onChange={(value) => setSettings({ ...settings, timezone: value })} />
            <FormField label="واحد پول" value={settings.currency} onChange={(value) => setSettings({ ...settings, currency: value })} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center">
              <MessageSquare size={18} className="text-purple" />
            </div>
            <h3 className="text-lg font-bold text-navy">اعلان‌ها</h3>
          </div>
          <div className="space-y-3">
            <ToggleSetting label="اعلان ایمیل" value={settings.emailNotification} onChange={(value) => setSettings({ ...settings, emailNotification: value })} />
            <ToggleSetting label="اعلان پیامک" value={settings.smsNotification} onChange={(value) => setSettings({ ...settings, smsNotification: value })} />
            <ToggleSetting label="اعلان تلگرام" value={settings.telegramNotification} onChange={(value) => setSettings({ ...settings, telegramNotification: value })} />
            <ToggleSetting label="اعلان‌های سیستمی" value={settings.systemNotification} onChange={(value) => setSettings({ ...settings, systemNotification: value })} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-soft-yellow rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-orange" />
            </div>
            <h3 className="text-lg font-bold text-navy">امنیت</h3>
          </div>
          <div className="space-y-3">
            <ToggleSetting label="احراز هویت دو مرحله‌ای" value={settings.twoFactorAuth} onChange={(value) => setSettings({ ...settings, twoFactorAuth: value })} />
            <ToggleSetting label="قفل خودکار پس از ۱۵ دقیقه" value={settings.autoLock} onChange={(value) => setSettings({ ...settings, autoLock: value })} />
            <ToggleSetting label="ثبت فعالیت کاربران" value={settings.activityLog} onChange={(value) => setSettings({ ...settings, activityLog: value })} />
            <ToggleSetting label="محدودیت IP" value={settings.ipRestriction} onChange={(value) => setSettings({ ...settings, ipRestriction: value })} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SUBSCRIBERS PAGE ============
export function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([
    { id: '1', name: 'دبیرستان شهید بهشتی', plan: 'مدرسه', startDate: '۱۴۰۲/۰۶/۱۵', endDate: '۱۴۰۳/۰۶/۱۵', amount: '۵,۸۸۰,۰۰۰', status: 'active' },
    { id: '2', name: 'دبیرستان امام صادق', plan: 'مدرسه', startDate: '۱۴۰۲/۰۷/۲۰', endDate: '۱۴۰۳/۰۷/۲۰', amount: '۵,۸۸۰,۰۰۰', status: 'active' },
    { id: '3', name: 'دبیرستان انرژی اتمی', plan: 'سازمانی', startDate: '۱۴۰۲/۰۵/۱۰', endDate: '۱۴۰۳/۰۵/۱۰', amount: 'تماس', status: 'active' },
  ]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleView = (sub: any) => {
    alert(`مشاهده جزئیات: ${sub.name}`);
    setOpenMenu(null);
  };

  const handleEdit = (sub: any) => {
    alert(`ویرایش: ${sub.name}`);
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">مشترکان</h1>
        <p className="text-sm text-secondary-text mt-1">مدیریت اشتراک‌های فعال پلتفرم</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<CreditCard size={20} />} label="مشترکان فعال" value="۳۸" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<TrendingUp size={20} />} label="رشد ماهانه" value="+۱۵٪" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Award size={20} />} label="درآمد ماه" value="۱۲۵M" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Calendar size={20} />} label="در حال انقضا" value="۵" bgColor="bg-soft-yellow" iconColor="text-orange" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نام</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">طرح</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ شروع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ انقضا</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مبلغ</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{sub.name}</td>
                  <td className="py-4 px-5"><span className="text-xs bg-lavender text-purple px-2.5 py-1 rounded-full font-medium">{sub.plan}</span></td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{sub.startDate}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{sub.endDate}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{sub.amount} تومان</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sub.status === 'active' ? 'bg-success-bg text-success-text' : 'bg-soft-yellow text-orange'}`}>
                      {sub.status === 'active' ? 'فعال' : 'در حال انقضا'}
                    </span>
                  </td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === sub.id ? null : sub.id)} className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                    {openMenu === sub.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleView(sub)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Eye size={14} /> مشاهده</button>
                        <button onClick={() => handleEdit(sub)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Edit size={14} /> ویرایش</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ SUPPORT PAGE ============
export function SupportPage() {
  const [tickets, setTickets] = useState([
    { id: '1', subject: 'مشکل در ورود به سیستم', user: 'فاطمه احمدی', priority: 'high', status: 'open', date: '۲ ساعت پیش' },
    { id: '2', subject: 'سؤال درباره طرح مدرسه', user: 'محمد رضایی', priority: 'medium', status: 'in-progress', date: '۵ ساعت پیش' },
    { id: '3', subject: 'درخواست افزایش محدودیت AI', user: 'مریم کریمی', priority: 'low', status: 'open', date: '۱ روز پیش' },
  ]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleReply = (ticket: any) => {
    alert(`پاسخ به تیکت: ${ticket.subject}`);
    setOpenMenu(null);
  };

  const handleClose = (id: string) => {
    if (confirm('آیا از بستن این تیکت مطمئن هستید؟')) {
      setTickets(tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t));
      setOpenMenu(null);
      alert('✅ تیکت با موفقیت بسته شد!');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">پشتیبانی</h1>
        <p className="text-sm text-secondary-text mt-1">مدیریت تیکت‌ها و درخواست‌های پشتیبانی</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<MessageSquare size={20} />} label="تیکت‌های باز" value="۱۲" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<HelpCircle size={20} />} label="در حال بررسی" value="۸" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Check size={20} />} label="حل شده" value="۱۴۵" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Calendar size={20} />} label="میانگین پاسخ" value="۲ ساعت" bgColor="bg-mint" iconColor="text-dark-green" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">موضوع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">کاربر</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">اولویت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">زمان</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{ticket.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{ticket.user}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ticket.priority === 'high' ? 'bg-red-50 text-red-600' : ticket.priority === 'medium' ? 'bg-soft-yellow text-orange' : 'bg-bg text-secondary-text'}`}>
                      {ticket.priority === 'high' ? 'بالا' : ticket.priority === 'medium' ? 'متوسط' : 'پایین'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ticket.status === 'open' ? 'bg-mint text-dark-green' : ticket.status === 'in-progress' ? 'bg-lavender text-purple' : 'bg-success-bg text-success-text'}`}>
                      {ticket.status === 'open' ? 'باز' : ticket.status === 'in-progress' ? 'در حال بررسی' : 'بسته شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{ticket.date}</td>
                  <td className="py-4 px-5 relative">
                    <button onClick={() => setOpenMenu(openMenu === ticket.id ? null : ticket.id)} className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                    {openMenu === ticket.id && (
                      <div className="absolute top-12 left-4 bg-white rounded-xl shadow-lg border border-border py-2 z-10 min-w-[150px]">
                        <button onClick={() => handleReply(ticket)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Send size={14} /> پاسخ</button>
                        <button onClick={() => handleClose(ticket.id)} className="w-full px-4 py-2 text-right text-sm text-navy hover:bg-bg flex items-center gap-2"><Check size={14} /> بستن تیکت</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ AI HELP PAGE ============
export function AIHelpPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">کمک آموزشی AI</h1>
        <p className="text-sm text-secondary-text mt-1">ابزارهای هوش مصنوعی برای آموزش بهتر</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Brain size={20} />} label="مصرف AI امروز" value="۳۴۲" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<Sparkles size={20} />} label="محدودیت روزانه" value="۵۰۰" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<TrendingUp size={20} />} label="مصرف این ماه" value="۸,۵۴۰" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<CreditCard size={20} />} label="هزینه AI" value="$۲.۰۱" bgColor="bg-soft-pink" iconColor="text-primary-pink" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AIFeatureCard icon={<Brain size={24} />} title="دستیار هوشمند" description="پاسخ به سؤالات آموزشی دانش‌آموزان" usage="۲,۴۵۰ فراخوانی" color="bg-mint" iconColor="text-dark-green" />
        <AIFeatureCard icon={<Sparkles size={24} />} title="تولید سؤال" description="ساخت خودکار سؤالات آزمون" usage="۸۹۰ فراخوانی" color="bg-lavender" iconColor="text-purple" />
        <AIFeatureCard icon={<BookOpen size={24} />} title="خلاصه‌ساز" description="خلاصه‌سازی متون درسی" usage="۱,۲۰۰ فراخوانی" color="bg-soft-yellow" iconColor="text-orange" />
        <AIFeatureCard icon={<FileText size={24} />} title="دستیار معلم" description="کمک در طراحی درس و محتوا" usage="۳۴۰ فراخوانی" color="bg-soft-pink" iconColor="text-primary-pink" />
        <AIFeatureCard icon={<ClipboardList size={24} />} title="ساخت فلش‌کارت" description="تولید خودکار فلش‌کارت" usage="۵۶۰ فراخوانی" color="bg-light-blue" iconColor="text-blue-600" />
        <AIFeatureCard icon={<Lightbulb size={24} />} title="یادگیری تطبیقی" description="پیشنهاد محتوای شخصی‌سازی شده" usage="۲۱۰ فراخوانی" color="bg-peach" iconColor="text-orange" />
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============
function StatCard({ icon, label, value, bgColor, iconColor }: {
  icon: React.ReactNode; label: string; value: string; bgColor: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-5 card-shadow">
      <div className={`w-11 h-11 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-3`}>{icon}</div>
      <p className="text-2xl font-extrabold text-navy">{value}</p>
      <p className="text-sm text-secondary-text mt-1">{label}</p>
    </div>
  );
}

function ToggleSetting({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-navy">{label}</span>
      <button onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full relative transition-colors ${value ? 'gradient-button' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'right-1' : 'right-6'}`} />
      </button>
    </div>
  );
}

function AIFeatureCard({ icon, title, description, usage, color, iconColor }: {
  icon: React.ReactNode; title: string; description: string; usage: string; color: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow hover:card-shadow-hover transition-all">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center ${iconColor} mb-4`}>{icon}</div>
      <h3 className="text-lg font-bold text-navy mb-1">{title}</h3>
      <p className="text-sm text-secondary-text mb-3">{description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-secondary-text">مصرف</span>
        <span className="text-sm font-bold text-dark-green">{usage}</span>
      </div>
    </div>
  );
}
