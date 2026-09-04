export type MakhrajCategoryId = 'jauf' | 'halqi' | 'lisan' | 'syafatain' | 'khaisyum';

export type MakhrajZoneId =
  | 'jauf-cavity'
  | 'halqi-bottom'  // Pangkal tenggorokan (Aqsha)
  | 'halqi-middle'  // Tengah tenggorokan (Wasath)
  | 'halqi-top'     // Ujung tenggorokan (Adna)
  | 'lisan-root'    // Pangkal lidah (Aqsha)
  | 'lisan-middle'  // Tengah lidah (Wasath)
  | 'lisan-side'    // Sisi lidah (Haffah)
  | 'lisan-tip'     // Ujung lidah (Tharaf)
  | 'lisan-teeth'   // Ujung lidah dengan gusi/gigi
  | 'syafatain-lip-tooth' // Bibir bawah dengan gigi seri atas
  | 'syafatain-both'      // Kedua bibir
  | 'khaisyum-nasal';     // Rongga hidung

export interface HurufItem {
  id: string;
  huruf: string;
  nama: string;
  namaArab: string;
  kategori: string;
  kategoriId: MakhrajCategoryId;
  subkategori: string;
  subkategoriArab: string;
  makhrajZoneId: MakhrajZoneId;
  audio: string;
  penjelasan: string;
  caraPengucapan: string;
  catatanPenting?: string;
  contoh: {
    harakat: string;
    bacaan: string;
    ayat?: string;
    arti?: string;
  };
}

export interface CategoryInfo {
  id: MakhrajCategoryId;
  nama: string;
  namaArab: string;
  arti: string;
  deskripsi: string;
  hurufRingkas: string[];
  catatanKhusus?: string;
  zonaAnatomi: MakhrajZoneId[];
  subkategoriList: {
    nama: string;
    namaArab: string;
    huruf: string[];
    deskripsi: string;
    zonaId: MakhrajZoneId;
  }[];
}

export interface QuizQuestion {
  id: number;
  huruf: string;
  namaHuruf: string;
  pertanyaan: string;
  pilihan: string[];
  jawabanBenar: number; // index 0-based
  keteranganBenar: string;
  keteranganSalah: string;
  kategoriId: MakhrajCategoryId;
  subkategori: string;
}

export type ActiveTab = 'home' | 'map' | 'lessons' | 'quiz' | 'reference';
