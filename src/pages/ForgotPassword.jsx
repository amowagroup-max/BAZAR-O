// src/pages/ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, Send } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // منع الترجمة التلقائية
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Veuillez entrer votre adresse e-mail.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    // هنا سيتم ربط API لاحقًا (لإرسال رابط إعادة تعيين كلمة المرور)
    console.log('Demande de réinitialisation envoyée à:', email);

    // محاكاة النجاح
    setSuccess(true);
    // يمكنك توجيه المستخدم بعد 3 ثوانٍ مثلاً
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h1>
        <p className="text-gray-600 mt-2">
          Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">E-mail envoyé !</h3>
            <p className="text-sm text-gray-600 mt-2">
              Veuillez consulter votre boîte de réception.  
              Redirection vers la page de connexion...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="exemple@domaine.com"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Envoyer le lien
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}