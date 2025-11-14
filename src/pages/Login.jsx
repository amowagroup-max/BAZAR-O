// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.email) {
      toast.error('Veuillez entrer votre adresse e-mail.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Adresse e-mail invalide.');
      return false;
    }
    if (!formData.password) {
      toast.error('Veuillez entrer votre mot de passe.');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // ✅ هنا ستربط لاحقًا مع Odoo API
      // مثال: const res = await api.post('/auth/login', formData);
      
      // ⏳ محاكاة تسجيل دخول ناجح
      await new Promise(resolve => setTimeout(resolve, 1200));

      toast.success('✅ Connexion réussie !', {
        icon: '👋',
      });

      // بعد النجاح: توجيه إلى الصفحة المطلوبة (مثل /account أو /)
      navigate('/account', { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      toast.error("❌ Adresse e-mail ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="mx-auto bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Bonjour 👋</h1>
        <p className="text-gray-600 mt-2">
          Connectez-vous à votre compte BAZARO
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* حقل البريد الإلكتروني */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-10 top-3 text-gray-500 pointer-events-none transition-all duration-200 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-yellow-600"
            >
              Adresse e-mail
            </label>
          </div>

          {/* حقل كلمة المرور */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-10 top-3 text-gray-500 pointer-events-none transition-all duration-200 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-yellow-600"
            >
              Mot de passe
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* رابط نسيت كلمة المرور */}
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500" />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <Link
              to="/reset-password"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* رابط التسجيل */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="font-medium text-yellow-600 hover:text-yellow-700"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

      {/* تسجيل دخول تجريبي (للاختبار السريع) */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setFormData({
              email: 'client@bazaro.dz',
              password: '123456',
            });
            toast('✅ Identifiants de test remplis.', { icon: '🧪' });
          }}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Remplir avec des identifiants de test
        </button>
      </div>
    </div>
  );
}