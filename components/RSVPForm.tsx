'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // 👈 Imported your Supabase config client

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    pax: '1',
    dietary: '', // Kept in state variables to avoid breaks, but not sent to clean table
    wishes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 📊 Fire real guest record rows straight to the database!
      const { error } = await supabase
        .from('wedding_rsvps')
        .insert([
          {
            name: formData.name,
            attendance: formData.attendance,
            // If they choose 'no', force the pax count number back down to 0 automatically
            pax: formData.attendance === 'yes' ? Number(formData.pax) : 0,
            wishes: formData.wishes || null
          }
        ]);

      if (error) throw error;

      // Everything looks good! Advance transition screens
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP into Supabase:", err);
      alert("Something went wrong saving your RSVP. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 pb-24 flex flex-col items-center">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 sm:p-8 overflow-hidden relative">
        
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#2d4a43] to-amber-600" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* --- FORM STATE --- */
            <motion.form 
              key="rsvp-form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl text-stone-800 tracking-wide">RSVP Attendance</h2>
                <p className="text-stone-400 text-xs mt-1">Kindly reply by 30th September 2026</p>
              </div>

              {/* Input: Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Muhammad"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a43] bg-stone-50/50 transition-all disabled:opacity-50"
                />
              </div>

              {/* Input: Attendance Status */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Will you be attending?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                    className={`py-2.5 rounded-lg font-sans text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                      formData.attendance === 'yes'
                        ? 'bg-[#2d4a43] border-[#2d4a43] text-white shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    I am coming ✓
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setFormData({ ...formData, attendance: 'no' })}
                    className={`py-2.5 rounded-lg font-sans text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                      formData.attendance === 'no'
                        ? 'bg-red-900 border-red-900 text-white shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Regretfully, no ✗
                  </button>
                </div>
              </div>

              {/* Inputs Conditional on Attending */}
              {formData.attendance === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  {/* Input: Number of Guests */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Number of Pax
                    </label>
                    <select
                      value={formData.pax}
                      disabled={isSubmitting}
                      onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a43] bg-stone-50/50"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                    </select>
                  </div>

                </motion.div>
              )}

              {/* Input: Well Wishes Box */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Well Wishes & Blessings
                </label>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  placeholder="Leave a lovely message for the bride and groom..."
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a43] bg-stone-50/50 text-stone-700 resize-none"
                />
              </div>

              {/* Submit Button Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white font-sans text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit RSVP
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            /* --- SUCCESS CONFIRMATION STATE --- */
            <motion.div
              key="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800">Thank You!</h3>
              <p className="text-stone-500 text-sm mt-2 max-w-xs mx-auto">
                Your RSVP response has been successfully saved. We appreciate your blessings!
              </p>

              {formData.wishes.trim() !== '' && (
                <div className="mt-6 p-4 bg-stone-50 border border-stone-100 rounded-xl max-w-xs w-full text-left italic relative">
                  <p className="text-stone-600 text-xs font-serif">&quot;{formData.wishes}&quot;</p>
                  <p className="text-right text-[10px] font-sans font-semibold text-stone-400 mt-2 not-italic">
                    — {formData.name}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}