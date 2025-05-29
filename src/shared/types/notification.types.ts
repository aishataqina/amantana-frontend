// Tipe data untuk waktu penyiraman
export type WateringTime = {
  hour: number;
  minute: number;
  enabled: boolean;
  id: string;
  sound: boolean; // Opsi untuk suara notifikasi
};

// Default waktu penyiraman
export const DEFAULT_WATERING_TIMES: WateringTime[] = [
  {id: 'morning', hour: 7, minute: 0, enabled: true, sound: true},
  {id: 'evening', hour: 17, minute: 0, enabled: false, sound: true},
];

// Tipe untuk konfigurasi notifikasi
export type NotificationConfig = {
  channelId: string;
  title: string;
  body: string;
}; 