import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WateringTime, DEFAULT_WATERING_TIMES} from '../types/notification.types';
import * as NotificationService from '../services/notification.service';

/**
 * Custom hook untuk mengelola notifikasi penyiraman tanaman
 */
export const useNotification = () => {
  // State untuk waktu penyiraman
  const [wateringTimes, setWateringTimes] = useState<WateringTime[]>(
    DEFAULT_WATERING_TIMES,
  );
   // State untuk pengingat berikutnya
  const [nextReminder, setNextReminder] = useState<Date | null>(null);

  // Muat pengaturan pengingat dari storage
  const loadWateringTimes = async () => {
    try {
      const savedTimes = await AsyncStorage.getItem('wateringTimes');
      if (savedTimes) {
        setWateringTimes(JSON.parse(savedTimes));
      }
    } catch (error) {
      console.error('Error loading watering times:', error);
    }
  };

  // Simpan pengaturan pengingat ke storage
  const saveWateringTimes = async (times: WateringTime[]) => {
    try {
      await AsyncStorage.setItem('wateringTimes', JSON.stringify(times));
    } catch (error) {
      console.error('Error saving watering times:', error);
    }
  };

  // Jadwalkan semua notifikasi yang aktif
  const scheduleAllReminders = useCallback(async () => {
    // Batalkan semua notifikasi yang ada terlebih dahulu
    await NotificationService.cancelAllNotifications();

    let earliestDate: Date | null = null;

    // Jadwalkan semua pengingat yang diaktifkan
    for (const time of wateringTimes) {
      if (time.enabled) {
        const scheduledDate = await NotificationService.scheduleWateringNotification(
          time,
          (date) => {
            // Perbarui nextReminder jika ini adalah pengingat berikutnya yang akan datang
            if (!earliestDate || date < earliestDate) {
              earliestDate = date;
            }
          }
        );

        if (scheduledDate && (!earliestDate || scheduledDate < earliestDate)) {
          earliestDate = scheduledDate;
        }
      }
    }

    // Update state pengingat berikutnya
    setNextReminder(earliestDate);
  }, [wateringTimes]);

  // Toggle status pengingat (aktif/nonaktif)
  const toggleReminderStatus = (id: string) => {
    const updatedTimes = wateringTimes.map(time =>
      time.id === id ? {...time, enabled: !time.enabled} : time,
    );
    setWateringTimes(updatedTimes);
    saveWateringTimes(updatedTimes);
  };

  // Toggle status suara pada pengingat (aktif/nonaktif)
  const toggleSoundStatus = (id: string) => {
    const updatedTimes = wateringTimes.map(time =>
      time.id === id ? {...time, sound: !time.sound} : time,
    );
    setWateringTimes(updatedTimes);
    saveWateringTimes(updatedTimes);
  };

  // Buat notifikasi test
  const createTestReminder = async () => {
    await NotificationService.createTestNotification(5);
  };

  // Format waktu untuk tampilan
  const formatTimeLabel = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  };

  // Setup notifikasi saat komponen dimuat
  useEffect(() => {
    NotificationService.createNotificationChannel();
    loadWateringTimes();

    // Listen for foreground notifications
    const unsubscribe = NotificationService.setupNotificationListeners();

    return () => {
      unsubscribe();
    };
  }, []);

  // Jadwalkan ulang notifikasi saat wateringTimes berubah
  useEffect(() => {
    scheduleAllReminders();
  }, [wateringTimes, scheduleAllReminders]);

  // Return state dan fungsi yang diperlukan oleh komponen
  return {
    wateringTimes,
    nextReminder,
    toggleReminderStatus,
    toggleSoundStatus,
    createTestReminder,
    formatTimeLabel,
  };
};
