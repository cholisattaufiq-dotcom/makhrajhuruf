import React from 'react';
import { AlertCircle, BookOpen, CheckCircle, GraduationCap, Sparkles, HelpCircle } from 'lucide-react';

export const ReferenceView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Pedoman & Catatan Penting
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50">
          Referensi & Panduan Belajar
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          Penjelasan akurasi tajwid, perbedaan makhraj khusus, serta tips latihan melatih pengucapan huruf hijaiyah.
        </p>
      </div>

      {/* Critical Notice: Not a Replacement for Talaqqi */}
      <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 shadow-xs flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
          <AlertCircle size={26} />
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-bold text-amber-900 dark:text-amber-100">
            Media Pengenalan & Bukan Pengganti Guru / Talaqqi
          </h2>
          <p className="text-xs sm:text-sm text-amber-900/85 dark:text-amber-200/90 leading-relaxed">
            Aplikasi web ini dirancang sebagai <strong>media visual dan bantuan belajar interaktif untuk pemula</strong>. 
            Mempelajari bacaan Al-Qur'an secara sempurna (Tahsin & Tajwid) <strong>wajib dilakukan melalui metode Talaqqi dan Musyafahah</strong> 
            (berhadapan langsung, mendengarkan, dan disimak oleh ustadz/ustadzah atau guru Al-Qur'an yang berkompeten dan bersanad).
          </p>
        </div>
      </div>

      {/* Perbedaan Krusial: Jauf vs Wawu/Ya Berharakat */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Perbedaan Huruf Mad (Jauf) vs Huruf Berharakat (Bibir & Lidah)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Agar tidak membingungkan pemula, perhatikan perbedaan utama antara huruf mad dan huruf hijaiyah biasa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Huruf Mad (Jauf) */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
                1. Huruf Mad (الجوف)
              </span>
              <span className="font-arabic text-xl font-bold text-emerald-700" lang="ar">ا - و - ي</span>
            </div>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li><strong>Alif (ا):</strong> Selalu sukun dan didahului huruf fathah (misal: قَالَ).</li>
              <li><strong>Wawu Mad (و):</strong> Wawu sukun setelah huruf berharakat dhammah (misal: يَقُولُ).</li>
              <li><strong>Ya Mad (ي):</strong> Ya sukun setelah huruf berharakat kasrah (misal: قِيلَ).</li>
              <li><strong>Makhraj:</strong> Udara mengalir bebas di rongga mulut tanpa terhalang organ fisik.</li>
            </ul>
          </div>

          {/* Huruf Berharakat (Syafatain & Lisan) */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-stone-700 dark:text-stone-300">
                2. Huruf Berharakat / Konsonan
              </span>
              <span className="font-arabic text-xl font-bold text-stone-700 dark:text-stone-300" lang="ar">و - ي</span>
            </div>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li><strong>Wawu Berharakat (و):</strong> Berharakat (wa, wi, wu) atau wawu layyin (setelah fathah seperti: خَوْف). Makhrajnya di <strong>dua bibir (Syafatain)</strong>.</li>
              <li><strong>Ya Berharakat (ي):</strong> Berharakat (ya, yi, yu) atau ya layyin (seperti: بَيْت). Makhrajnya di <strong>tengah lidah (Lisān)</strong>.</li>
              <li><strong>Makhraj:</strong> Memiliki titik artikulasi fisik yang terukur (Muhaqqaq).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips Latihan: Cara Menemukan Titik Makhraj Suatu Huruf */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Teknik Praktis: Menemukan Titik Makhraj dengan Sukun
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Para ulama Tajwid (seperti Imam Ibnul Jazari) memberikan formula sederhana bagi para pemelajar untuk merasakan di mana titik keluarnya suara huruf hijaiyah:
        </p>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 text-xs sm:text-sm space-y-2">
          <div className="font-bold text-stone-800 dark:text-stone-200">
            Langkah-langkah Praktis:
          </div>
          <ol className="list-decimal list-inside space-y-1 text-stone-600 dark:text-stone-300 leading-relaxed">
            <li>Beri huruf hamzah berharakat fathah (أَ) di depan huruf yang ingin diuji.</li>
            <li>Sukunkan (mati-kan) huruf yang ingin dicari makhrajnya.</li>
            <li>Ucapkan dengan tenang dan perhatikan di organ mana suara itu berhenti atau terputus. Titik tersebut adalah makhraj aslinya!</li>
          </ol>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-400" lang="ar">
              أَقْ (Qaf berhenti di pangkal lidah)
            </span>
            <span className="px-3 py-1 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-400" lang="ar">
              أَفْ (Fa berhenti di bibir bawah & gigi atas)
            </span>
            <span className="px-3 py-1 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-400" lang="ar">
              أَعْ (Ain berhenti di tengah tenggorokan)
            </span>
          </div>
        </div>
      </div>

      {/* Ringkasan 5 Makhraj Umum Menurut Imam Ibnul Jazari */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <GraduationCap size={20} className="text-emerald-600 dark:text-emerald-400" />
          Ringkasan 5 Makhraj Umum (Makhārij ‘Āmmah)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400">
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3">Makhraj Umum</th>
                <th className="py-2.5 px-3">Arti / Organ</th>
                <th className="py-2.5 px-3">Jumlah Makhraj Khusus</th>
                <th className="py-2.5 px-3 text-right">Huruf-Hurufnya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              <tr>
                <td className="py-3 px-3 font-bold">1</td>
                <td className="py-3 px-3 font-semibold">Al-Jauf (الجوف)</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">Rongga mulut & tenggorokan</td>
                <td className="py-3 px-3">1 Makhraj</td>
                <td className="py-3 px-3 text-right font-arabic text-base font-bold" lang="ar">ا  و  ي (Mad)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">2</td>
                <td className="py-3 px-3 font-semibold">Al-Halq (الحلق)</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">Tenggorokan (Aqsha, Wasath, Adna)</td>
                <td className="py-3 px-3">3 Makhraj</td>
                <td className="py-3 px-3 text-right font-arabic text-base font-bold" lang="ar">ء ه ع ح غ خ</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">3</td>
                <td className="py-3 px-3 font-semibold">Al-Lisān (اللسان)</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">Lidah & bagian-bagiannya</td>
                <td className="py-3 px-3">10 Makhraj</td>
                <td className="py-3 px-3 text-right font-arabic text-base font-bold" lang="ar">ق ك ج ش ي ض ل ن ر ت ط د س ص ز ظ ذ ث</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">4</td>
                <td className="py-3 px-3 font-semibold">Asy-Syafatain (الشفتان)</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">Dua bibir</td>
                <td className="py-3 px-3">2 Makhraj</td>
                <td className="py-3 px-3 text-right font-arabic text-base font-bold" lang="ar">ف ب م و</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">5</td>
                <td className="py-3 px-3 font-semibold">Al-Khaisyum (الخيشوم)</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">Pangkal rongga hidung</td>
                <td className="py-3 px-3">1 Makhraj</td>
                <td className="py-3 px-3 text-right font-arabic text-base font-bold" lang="ar">نّ  مّ (Ghunnah)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
