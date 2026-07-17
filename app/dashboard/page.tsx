'use client';

import { useState } from 'react';
import { ArrowLeft, Users, CheckCircle, XCircle, Search, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 

interface GuestRSVP {
  id?: number;
  name: string;
  attendance: 'yes' | 'no';
  pax: number;
  wishes?: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvps, setRsvps] = useState<GuestRSVP[]>([]);

  // 🔐 Secret password
  const SECRET_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === SECRET_ADMIN_PASSWORD) {
      setLoginError(false);
      setIsLoading(true);

      // 📊 Fetch fresh data straight from the live database cloud!
      try {
        const { data, error } = await supabase
          .from('wedding_rsvps')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setRsvps(data || []);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error reading RSVPs from database:", err);
        alert("Failed to load live registry database. Please verify your connection.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginError(true);
    }
  };

  // Calculations
  const attendingList = isAuthenticated ? rsvps.filter(r => r.attendance === 'yes') : [];
  const totalAttendingPax = isAuthenticated ? attendingList.reduce((sum, current) => sum + (Number(current.pax) || 0), 0) : 0;
  const totalNotAttending = isAuthenticated ? rsvps.filter(r => r.attendance === 'no').length : 0;

  const filteredRsvps = isAuthenticated 
    ? rsvps.filter(rsvp => rsvp.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // 1. Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 border border-stone-200 text-center space-y-6">
          <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-serif text-stone-800 font-bold">RSVP Dashboard</h1>
            <p className="text-stone-500 text-xs font-sans">Please input your password to see RSVP list.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              disabled={isLoading}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2.5 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm bg-stone-50 text-stone-800 text-center"
            />
            {loginError && <p className="text-red-600 text-xs font-medium">Invalid password. Please try again.</p>}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-700 text-white font-medium text-sm rounded-md transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Fetching Live Data...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 pt-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to e-card
          </Link>
        </div>
      </div>
    );
  }

  // 2. Main Authenticated Dashboard Screen
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-800">Guests List</h1>
            <p className="text-xs text-stone-500">Mashitah & Faruq Wedding RSVP Registry</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 shadow-sm transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> See wedding e-card
          </Link>
        </div>

        {/* Analytics Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-400 font-medium block uppercase tracking-wider">Total Attending Pax</span>
              <span className="text-2xl font-bold text-emerald-800 font-mono">{totalAttendingPax} <span className="text-sm font-sans font-normal text-stone-400">pax</span></span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-400 font-medium block uppercase tracking-wider">Attending Groups</span>
              <span className="text-2xl font-bold text-stone-800 font-mono">{attendingList.length} <span className="text-sm font-sans font-normal text-stone-400">groups</span></span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 text-red-700 rounded-lg flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-400 font-medium block uppercase tracking-wider">Not Attending</span>
              <span className="text-2xl font-bold text-stone-700 font-mono">{totalNotAttending} <span className="text-sm font-sans font-normal text-stone-400">pax</span></span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Find a guest's name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
          />
        </div>

        {/* Main Data Table */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-xs font-semibold text-stone-500 border-b border-stone-200 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Guest Name</th>
                  <th className="px-6 py-3.5">Attendance Status</th>
                  <th className="px-6 py-3.5 text-center">Total Pax</th>
                  <th className="px-6 py-3.5">Wishes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-stone-400 italic">
                      No RSVP data found.
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((rsvp, idx) => (
                    <tr key={rsvp.id || idx} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-stone-800 whitespace-nowrap">{rsvp.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          rsvp.attendance === 'yes' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {rsvp.attendance === 'yes' ? 'Attend' : 'Not Attend'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono font-semibold text-stone-800">{rsvp.attendance === 'yes' ? rsvp.pax : '-'}</td>
                      <td className="px-6 py-4 text-xs text-stone-500 max-w-xs truncate" title={rsvp.wishes}>
                        {rsvp.wishes || <span className="text-stone-300 italic">No wishes.</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}