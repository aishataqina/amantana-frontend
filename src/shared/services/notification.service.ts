import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
  AndroidVisibility,
  AndroidStyle,
  AndroidCategory,
} from '@notifee/react-native';
import {Platform} from 'react-native';
import {WateringTime} from '../types/notification.types';

/**
 * Membuat channel notifikasi (khusus Android)
 */
export async function createNotificationChannel() {
  // Channel khusus untuk Android
  if (Platform.OS === 'android') {
    // Hapus channel lama jika ada untuk memastikan pengaturan baru diterapkan
    await notifee.deleteChannel('watering-reminders');

    // Buat channel baru dengan suara default
    await notifee.createChannel({
      id: 'watering-reminders',
      name: 'Pengingat Penyiraman',
      description: 'Notifikasi untuk mengingatkan penyiraman tanaman',
      // Gunakan prioritas tertinggi untuk memastikan suara diputar
      importance: AndroidImportance.HIGH,
      // Aktifkan suara default
      sound: 'default',
      // Aktifkan getaran
      vibration: true,
      // Tampilkan di layar kunci
      visibility: AndroidVisibility.PUBLIC,
      // Pastikan notifikasi dapat membuat suara
      lights: true,
    });

    console.log('Channel notifikasi dibuat dengan suara default');
  }
}

/**
 * Batalkan semua notifikasi yang ada
 */
export async function cancelAllNotifications() {
  await notifee.cancelAllNotifications();
}

/**
 * Batalkan notifikasi dengan ID tertentu
 */
export async function cancelNotification(id: string) {
  await notifee.cancelNotification(id);
}

/**
 * Jadwalkan notifikasi penyiraman berdasarkan waktu yang diberikan
 */
export async function scheduleWateringNotification(
  wateringTime: WateringTime,
  onScheduled?: (date: Date) => void,
) {
  if (!wateringTime.enabled) return null;

  // Buat tanggal untuk jadwal notifikasi
  const scheduledDate = new Date();
  scheduledDate.setHours(wateringTime.hour);
  scheduledDate.setMinutes(wateringTime.minute);
  scheduledDate.setSeconds(0);
  scheduledDate.setMilliseconds(0);

  // Jika waktu sudah berlalu hari ini, jadwalkan untuk besok
  if (scheduledDate.getTime() <= Date.now()) {
    scheduledDate.setDate(scheduledDate.getDate() + 1);
  }

  // Buat trigger berbasis waktu
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: scheduledDate.getTime(),
    // Catatan: Notifee tidak mendukung repeatFrequency daily,
    // Jadi kita perlu menjadwalkan ulang setiap kali notifikasi dijalankan
  };

  // Buat notifikasi terjadwal - konfigurasi per platform
  if (Platform.OS === 'android') {
    await notifee.createTriggerNotification(
      {
        id: `watering-${wateringTime.id}`,
        title: 'Waktunya Menyiram Tanaman! 💦',
        body: 'Tanaman Anda membutuhkan air untuk tetap sehat dan tumbuh dengan baik. Luangkan waktu sejenak untuk memberikan perawatan yang mereka butuhkan.',
        android: {
          channelId: 'watering-reminders',
          // Jangan atur sound disini, gunakan pengaturan channel
          pressAction: {
            id: 'default',
          },
          style: {
            type: AndroidStyle.BIGTEXT,
            text: 'Tanaman Anda membutuhkan air untuk tetap sehat dan tumbuh dengan baik. Luangkan waktu sejenak untuk memberikan perawatan yang mereka butuhkan.',
          },
          category: AndroidCategory.REMINDER,
          importance: AndroidImportance.HIGH,
        },
      },
      trigger,
    );
  } else {
    // iOS notification
    await notifee.createTriggerNotification(
      {
        id: `watering-${wateringTime.id}`,
        title: 'Waktunya Menyiram Tanaman! 💦',
        body: 'Tanaman Anda membutuhkan air untuk tetap sehat dan tumbuh dengan baik.',
        ios: {
          // Untuk iOS gunakan sound: undefined jika tidak ingin suara
          sound: wateringTime.sound ? 'default' : undefined,
          critical: wateringTime.sound,
          interruptionLevel: 'timeSensitive',
          categoryId: 'reminder',
        },
      },
      trigger,
    );
  }

  console.log(
    `Pengingat penyiraman ${wateringTime.id} dijadwalkan untuk:`,
    scheduledDate.toLocaleString(),
    `dengan suara: ${wateringTime.sound ? 'aktif' : 'nonaktif'}`,
  );

  // Panggil callback jika ada
  if (onScheduled) {
    onScheduled(scheduledDate);
  }

  return scheduledDate;
}

/**
 * Buat notifikasi test yang akan muncul dalam beberapa detik
 */
export async function createTestNotification(delaySeconds: number = 5) {
  // Batalkan test notification sebelumnya jika ada
  await notifee.cancelNotification('test-notification');

  // Jadwalkan notifikasi x detik dari sekarang
  const testDate = new Date(Date.now() + delaySeconds * 1000);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: testDate.getTime(),
  };

  // Test notifikasi dengan pendekatan per platform
  if (Platform.OS === 'android') {
    await notifee.createTriggerNotification(
      {
        id: 'test-notification',
        title: 'Test Pengingat Penyiraman',
        body: 'Ini adalah notifikasi test untuk pengingat penyiraman tanaman.',
        android: {
          channelId: 'watering-reminders',
          // Suara dikonfigurasi di channel
        },
      },
      trigger,
    );
  } else {
    // iOS notification
    await notifee.createTriggerNotification(
      {
        id: 'test-notification',
        title: 'Siram Dulu, Baru Santai 😄',
        body: 'Tanamanmu nunggu guyuran kasih sayang 💦🌸',
        ios: {
          sound: 'default',
          critical: true,
          interruptionLevel: 'timeSensitive',
        },
      },
      trigger,
    );
  }

  console.log('Notifikasi test dijadwalkan untuk:', testDate.toLocaleString());
}

/**
 * Setup listener untuk notifikasi foreground
 */
export function setupNotificationListeners(callback?: (type: any, detail: any) => void) {
  const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
    console.log('Foreground event:', type, detail);
    if (callback) {
      callback(type, detail);
    }
  });

  return unsubscribe;
}

/**
 * Meminta izin notifikasi dari pengguna
 */
export async function requestNotificationPermission() {
  try {
    const settings = await notifee.requestPermission();
    
    if (settings.authorizationStatus) {
      console.log('Izin notifikasi diberikan');
      return true;
    } else {
      console.log('Izin notifikasi ditolak');
      return false;
    }
  } catch (error) {
    console.error('Error saat meminta izin notifikasi:', error);
    return false;
  }
}

/**
 * Setup awal notifikasi
 */
export async function initializeNotifications() {
  try {
    // Minta izin notifikasi
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('Tidak dapat menginisialisasi notifikasi: izin ditolak');
      return false;
    }

    // Buat channel notifikasi
    await createNotificationChannel();
    
    console.log('Notifikasi berhasil diinisialisasi');
    return true;
  } catch (error) {
    console.error('Error saat inisialisasi notifikasi:', error);
    return false;
  }
}
