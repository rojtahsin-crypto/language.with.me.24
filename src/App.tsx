import { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Globe, Moon, Sun, Loader } from 'lucide-react';

interface User {
  email: string;
  name: string;
  picture?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('lingua-theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!validateEmail(loginForm.email)) newErrors.email = 'Invalid email';
    if (!loginForm.password) newErrors.password = 'Password required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setUser({ email: loginForm.email, name: loginForm.email.split('@')[0] });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!signupForm.name) newErrors.name = 'Name required';
    if (!validateEmail(signupForm.email)) newErrors.email = 'Invalid email';
    if (signupForm.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (signupForm.password !== signupForm.confirm) newErrors.confirm = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setUser({ email: signupForm.email, name: signupForm.name });
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setLoginForm({ email: '', password: '' });
    setSignupForm({ name: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('lingua-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  if (user) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex items-center justify-center p-4 transition-colors`}>
        <button onClick={toggleTheme} className={`fixed top-4 right-4 p-3 rounded-full transition-all z-50 ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} shadow-lg hover:scale-110`}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className={`w-full max-w-md rounded-3xl p-8 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-xl'}`}>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Globe className="text-white" size={32} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome!</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{user.email}</p>
          <p className="text-sm text-gray-500 mb-8">Successfully logged in to LinguaAI</p>
          <button onClick={handleLogout} className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex items-center justify-center p-4 transition-colors`}>
      <button onClick={toggleTheme} className={`fixed top-4 right-4 p-3 rounded-full transition-all z-50 ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} shadow-lg hover:scale-110`}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className={`w-full max-w-md rounded-3xl p-8 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-2xl'} transition-all`}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Globe className="text-white" size={28} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>LinguaAI</h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to continue</p>
        </div>

        <div className={`flex gap-2 mb-6 p-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {(['login', 'signup'] as const).map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setErrors({}); }} className={`flex-1 py-2 px-3 rounded-md font-semibold transition-all text-sm ${activeTab === tab ? 'bg-emerald-500 text-white shadow-md' : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
              {tab === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={16} />
                <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} onFocus={() => setErrors({ ...errors, email: '' })} className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${errors.email ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="you@example.com" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={16} />
                <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} onFocus={() => setErrors({ ...errors, password: '' })} className={`w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all focus:outline-none ${errors.password ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="Your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-70 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
              {isLoading ? <Loader size={18} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Full Name</label>
              <input type="text" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} onFocus={() => setErrors({ ...errors, name: '' })} className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${errors.name ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="Your name" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Email</label>
              <input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} onFocus={() => setErrors({ ...errors, email: '' })} className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${errors.email ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="you@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} onFocus={() => setErrors({ ...errors, password: '' })} className={`w-full px-4 py-3 pr-10 rounded-xl border-2 transition-all focus:outline-none ${errors.password ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="Minimum 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={signupForm.confirm} onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })} onFocus={() => setErrors({ ...errors, confirm: '' })} className={`w-full px-4 py-3 pr-10 rounded-xl border-2 transition-all focus:outline-none ${errors.confirm ? 'border-red-500' : `border-transparent ${isDark ? 'bg-gray-700 text-white focus:border-emerald-500' : 'bg-gray-100 focus:border-emerald-500'}`}`} placeholder="Confirm password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-70 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
              {isLoading ? <Loader size={18} className="animate-spin" /> : 'Create Account'}
            </button>
          </form>
        )}

        <div className="flex items-center gap-3 my-6">
          <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <span className="text-xs font-semibold text-gray-500">OR</span>
          <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        </div>

        <button className={`w-full py-3 px-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-3 ${isDark ? 'border-gray-600 text-gray-300 hover:border-emerald-500' : 'border-gray-300 text-gray-700 hover:border-emerald-500 hover:bg-emerald-50'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default App;