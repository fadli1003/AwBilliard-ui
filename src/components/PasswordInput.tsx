// src/components/PasswordInput.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { passwordRules } from '@/utils/password-rules';

export const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Hitung jumlah aturan yang terpenuhi
  const passedRules = passwordRules.filter((rule) => rule.test(password));
  const score = passedRules.length;

  // Konfigurasi warna & label indikator kekuatan
  const getStrengthConfig = () => {
    if (password.length === 0) return { width: '0%', color: 'bg-slate-300', label: '' };
    if (score <= 2) return { width: '33%', color: 'bg-red-500', label: 'Lemah' };
    if (score <= 4) return { width: '66%', color: 'bg-amber-500', label: 'Sedang' };
    return { width: '100%', color: 'bg-emerald-500', label: 'Sangat Kuat' };
  };

  const strength = getStrengthConfig();

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Password
      </label>
      
      {/* Input Field dengan Toggle Eye Icon */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password aman..."
          className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Animated Strength Progress Bar */}
      <div className="mt-3">
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${strength.color}`}
            initial={{ width: '0%' }}
            animate={{ width: strength.width }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        {strength.label && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold text-right mt-1 text-slate-500 dark:text-slate-400"
          >
            Kekuatan: <span className="text-slate-800 dark:text-slate-200">{strength.label}</span>
          </motion.p>
        )}
      </div>

      {/* Live Requirement Checklist */}
      <div className="mt-4 space-y-2">
        {passwordRules.map((rule) => {
          const isPassed = rule.test(password);

          return (
            <motion.div
              key={rule.id}
              initial={false}
              animate={{
                color: isPassed ? '#10b981' : '#94a3b8',
                x: isPassed ? 4 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-xs font-medium"
            >
              <div className="relative flex items-center justify-center w-4 h-4">
                <AnimatePresence mode="wait">
                  {isPassed ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="x"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className={isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}>
                {rule.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};