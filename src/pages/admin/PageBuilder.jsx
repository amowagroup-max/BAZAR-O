// src/pages/admin/PageBuilder.jsx
import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

export default function PageBuilder() {
  const editorRef = useRef(null);

  useEffect(() => {
    // تأكد من تدمير المحرر القديم قبل إنشاء جديد
    if (window.editor) {
      window.editor.destroy();
    }

    // تهيئة GrapesJS
    const editor = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      fromElement: false,
      storageManager: false,
      noticeOnUnload: false,

      // 🌐 دعم اللغة العربية والاتجاه RTL
      i18n: {
        locale: 'ar',
        messages: {
          ar: {
            'Blocks': 'العناصر',
            'Style Manager': 'إدارة الأنماط',
            'Layers': 'الطبقات',
            'Pages': 'الصفحات',
            'Text': 'نص',
            'Image': 'صورة',
            'Button': 'زر',
            'Section': 'قسم',
            'Save': 'حفظ',
            'Undo': 'تراجع',
            'Redo': 'إعادة',
          },
        },
      },

      // ⬅️ تفعيل الوضع RTL (الأهم!)
      stylePrefix: 'gjs-',
      config: {
        direction: 'rtl',
      },

      // 🧱 العناصر الجاهزة (Blocks)
      blocks: [
        {
          id: 'text',
          label: '🔤 نص',
          content: `<div style="padding: 10px; font-size: 18px; font-family: 'Tajawal', sans-serif; color: #333;">مرحبًا بكم في BAZARO</div>`,
        },
        {
          id: 'image',
          label: '🖼️ صورة',
          content: `<img src="https://placehold.co/600x400/FFD700/000000?text=BAZARO" alt="شعار" style="width: 100%; height: auto; border-radius: 8px;" />`,
        },
        {
          id: 'button',
          label: '🔘 زر',
          content: `<a href="#" style="display: inline-block; padding: 12px 24px; background-color: #FFD700; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: 'Tajawal', sans-serif;">تسوق الآن</a>`,
        },
        {
          id: 'section',
          label: '🧱 قسم',
          content: `<section style="padding: 40px; background: #f8f9fa; text-align: right;"><h2 style="font-size: 28px; margin-bottom: 20px; font-family: 'Tajawal', sans-serif;">عنوان القسم</h2><p style="font-size: 16px; line-height: 1.6; font-family: 'Tajawal', sans-serif;">هذا نص تجريبي لقسم جديد في صفحة BAZARO.</p></section>`,
        },
      ],

      // 🎨 المكونات المُفعّلة
      plugins: ['grapesjs-blocks-basic'],
    });

    // 🔁 تطبيق الاتجاه RTL بعد التهيئة
    editor.set('config', { ...editor.getConfig(), direction: 'rtl' });
    editor.refresh();

    // 🌐 تحميل الخط العربي
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // حفظ المحرر عالميًا لتجنب التكرار
    window.editor = editor;

    return () => {
      if (window.editor) {
        window.editor.destroy();
        window.editor = null;
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <header className="bg-white shadow p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-gray-800">BAZARO — محرر الصفحات</h1>
        <button
          onClick={() => {
            const html = window.editor.getHtml();
            const css = window.editor.getCss();
            alert('تم التصدير! افحص Console لمحتوى HTML/CSS');
            console.log('HTML:', html);
            console.log('CSS:', css);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-1"
        >
          📤 تصدير الصفحة
        </button>
      </header>

      <div ref={editorRef} className="h-[calc(100vh-72px)]" />
    </div>
  );
}