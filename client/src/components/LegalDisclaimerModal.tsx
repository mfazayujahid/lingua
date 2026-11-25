import React from 'react';
import { X, ShieldAlert, BookOpen, ExternalLink, Scale, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="disclaimer-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-washi-200 dark:border-sumi-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="disclaimer-title" className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {language === 'id' ? 'Penafian Hukum & Hak Cipta Merek' : 'Legal Disclaimer & Trademark Notice'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'id' ? 'Prinsip Nominative Fair Use & Atribusi Lisensi' : 'Nominative Fair Use & License Attribution'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-washi-200 dark:hover:bg-sumi-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {/* Section 1: Independent Platform */}
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{language === 'id' ? 'Pernyataan Independen (Non-Afiliasi)' : 'Independent Platform Notice'}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              {language === 'id'
                ? 'LinguaMastery adalah platform pembelajaran dan simulasi persiapan mandiri independen. LinguaMastery sama sekali TIDAK berafiliasi, disponsori, disetujui, atau didukung secara resmi oleh Japan Educational Exchanges and Services (JEES), The Japan Foundation, Cambridge Assessment English, British Council, maupun IDP Education Pty Ltd.'
                : 'LinguaMastery is an independent test preparation and educational practice platform. LinguaMastery is NOT affiliated with, sponsored by, approved by, or endorsed by Japan Educational Exchanges and Services (JEES), The Japan Foundation, Cambridge Assessment English, the British Council, or IDP Education Pty Ltd.'}
            </p>
          </div>

          {/* Section 2: Trademark Nominative Fair Use */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-vermilion-500" />
              <span>{language === 'id' ? 'Merek Dagang Terdaftar' : 'Registered Trademarks'}</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
              <li>
                <strong className="text-stone-700 dark:text-stone-200">JLPT / 日本語能力試験®:</strong>{' '}
                {language === 'id'
                  ? 'Merupakan merek dagang terdaftar milik The Japan Foundation dan Japan Educational Exchanges and Services (JEES). Penggunaan istilah "JLPT" di aplikasi ini murni untuk tujuan identifikasi format latihan (Nominative Fair Use).'
                  : 'Is a registered trademark of The Japan Foundation and Japan Educational Exchanges and Services (JEES). The use of "JLPT" on this website is strictly for curriculum identification and test-format study guidance (Nominative Fair Use).'}
              </li>
              <li>
                <strong className="text-stone-700 dark:text-stone-200">IELTS®:</strong>{' '}
                {language === 'id'
                  ? 'Merupakan merek dagang terdaftar milik University of Cambridge ESOL Examinations, British Council, dan IDP Education Australia. Penggunaan nama IELTS semata-mata mengacu pada format latihan soal.'
                  : 'Is a registered trademark jointly owned by University of Cambridge ESOL Examinations, British Council, and IDP Education Australia. Reference to IELTS is solely for practice exam categorization.'}
              </li>
            </ul>
          </div>

          {/* Section 3: Original Practice Materials */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{language === 'id' ? 'Orisinalitas Materi Simulasi' : 'Original Practice Materials'}</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {language === 'id'
                ? 'Seluruh butir soal, wacana membaca, naskah dialog menyimak, dan penjelasan tata bahasa yang disajikan di LinguaMastery adalah materi orisinal yang disusun dan dikalibrasi secara mandiri untuk tujuan pedagogis. Kami tidak mempublikasikan atau mendistribusikan salinan naskah ujian resmi rahasia manapun.'
                : 'All practice questions, reading passages, listening scripts, and grammatical explanations in LinguaMastery are original educational materials developed and calibrated independently for self-study purposes. No confidential or official test papers are reproduced or distributed.'}
            </p>
          </div>

          {/* Section 4: Open Source & Third Party Attributions */}
          <div className="space-y-2 pt-2 border-t border-washi-200 dark:border-sumi-800">
            <h3 className="font-bold text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider">
              {language === 'id' ? 'Atribusi Lisensi Pihak Ketiga' : 'Third-Party License Attributions'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Kanji stroke order vector diagrams are derived from{' '}
              <a 
                href="https://kanjivg.tagaini.net/" 
                target="_blank" 
                rel="noreferrer"
                className="text-vermilion-500 hover:underline inline-flex items-center gap-0.5"
              >
                KanjiVG <ExternalLink className="w-3 h-3" />
              </a>, copyright © 2009-2023 Ulrich Apel, licensed under Creative Commons Attribution-Share Alike 3.0 (CC BY-SA 3.0). Japanese typography is rendered using Noto Serif JP and Noto Sans JP (SIL Open Font License).
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-3 border-t border-washi-200 dark:border-sumi-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            {language === 'id' ? 'Saya Mengerti' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
