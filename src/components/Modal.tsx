import React, { useState } from 'react';
import { X, Save, User, Mail, Phone, Building2, Shield } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg rounded-xl transition-colors"
          >
            <X size={20} className="text-secondary-text" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
}

export function FormField({ label, type = 'text', placeholder, value, onChange, icon, required }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-2">
        {label}
        {required && <span className="text-primary-pink mr-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-bg border border-border rounded-xl py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green/30
                     placeholder:text-secondary-text
                     ${icon ? 'pr-10' : 'pr-4'} pl-4`}
        />
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-2">
        {label}
        {required && <span className="text-primary-pink mr-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-navy
                   focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green/30"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
