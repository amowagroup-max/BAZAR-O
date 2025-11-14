// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من صحة البريد
    if (!email.trim()) {
      toast.error('Veuillez entrer votre adresse e-mail.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Adresse e-mail invalide.');
      return;
    }

    setLoading(true);

    try {
      // ✅ هنا ستُدمج لاحقًا مع Odoo API:
      // مثال: await api.post('/auth/reset-password', { email });

      // ⏳ محاكاة إرسال البريد (للاختبار)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ✅ نجاح: إظهار رسالة وتحويل بعد 2 ثانية
      toast.success(
        "✅ Un lien de réinitialisation a été envoyé à votre adresse e-mail.",
        { duration: 5000 }
      );

      // بعد 2.5 ثانية: العودة لصفحة الدخول
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2500);

    } catch (error) {
      console.error('Reset password error:', error);
      toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* رأس الصفحة */}
      <div className="text-center mb-10">
        <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Entrez votre adresse e-mail ci-dessous. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
      </div>

      {/* النموذج */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Adresse e-mail"
            />
          </div>

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
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer le lien
              </>
            )}
          </button>
        </form>

        {/* رابط العودة */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-yellow-600 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </div>

      {/* ملاحظة */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Vous n'avez pas reçu d'e-mail ? Vérifiez votre dossier « Spam ».
        </p>
      </div>
    </div>
  );
}