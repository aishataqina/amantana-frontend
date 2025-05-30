import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';
import {useNotification} from '@/shared/hooks/useNotification';
import {InfoBanner} from '@/shared/components/InfoBanner';
import {Bell} from 'lucide-react-native';

function WateringReminder() {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  // Gunakan custom hook untuk logika notifikasi
  const {
    wateringTimes,
    nextReminder,
    toggleReminderStatus,
    toggleSoundStatus,
    createTestReminder,
    formatTimeLabel,
  } = useNotification();

  return (
    <ScrollView className="flex-1" style={{backgroundColor: colors.background}}>
      <View className="flex-1 py-5">
        {nextReminder && (
          <InfoBanner
            bgColor={isDarkMode ? 'bg-green-900' : 'bg-green-100'}
            iconBgColor={isDarkMode ? 'bg-green-800' : 'bg-green-200'}
            imageSource={require('../../assets/img/banner2.png')}
            title="Sudah siram tanaman hari ini?"
            description="Jangan lupa untuk menyiram tanaman agar tetap segar dan sehat."
            isDark={isDarkMode}
          />
        )}

        <View className="w-full gap-4 mb-8 mt-5 px-4">
          <View
            className="flex-row items-center gap-3 rounded-lg p-4"
            style={{backgroundColor: colors.card}}>
            <View
              className="p-2 rounded-full"
              style={{
                backgroundColor: isDarkMode ? colors.card : colors.borderLight,
              }}>
              <Bell size={20} color={isDarkMode ? colors.primary : '#2D6A4F'} />
            </View>
            <Text
              className="text-lg font-bold mb-2"
              style={{color: colors.text}}>
              Jadwal Penyiraman
            </Text>
          </View>

          {wateringTimes.map(time => (
            <View
              key={time.id}
              className="p-4 rounded-lg"
              style={{backgroundColor: colors.card}}>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-col">
                  <Text
                    className="text-base font-bold"
                    style={{color: colors.text}}>
                    {time.id === 'morning' ? 'Pagi' : 'Sore'}
                  </Text>
                  <Text
                    className="text-sm mt-1"
                    style={{color: colors.textSecondary}}>
                    {formatTimeLabel(time.hour, time.minute)}
                  </Text>
                </View>
                <Switch
                  trackColor={{false: colors.border, true: colors.primary}}
                  thumbColor={colors.background}
                  ios_backgroundColor={colors.border}
                  onValueChange={() => toggleReminderStatus(time.id)}
                  value={time.enabled}
                />
              </View>

              {time.enabled && (
                <View
                  className="flex-row items-center justify-between mt-2 pt-2 border-t"
                  style={{borderTopColor: colors.border}}>
                  <Text
                    className="text-sm"
                    style={{color: colors.textSecondary}}>
                    Suara notifikasi
                  </Text>
                  <Switch
                    trackColor={{false: colors.border, true: colors.primary}}
                    thumbColor={colors.background}
                    ios_backgroundColor={colors.border}
                    onValueChange={() => toggleSoundStatus(time.id)}
                    value={time.sound}
                  />
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            className="p-4 rounded-lg items-center mt-2"
            style={{backgroundColor: colors.primary}}
            onPress={createTestReminder}>
            <Text className="text-white font-bold">
              Test Notifikasi (5 detik)
            </Text>
          </TouchableOpacity>

          <Text
            className="text-sm text-center mt-2"
            style={{color: colors.textTertiary}}>
            Aktifkan pengingat untuk mendapatkan notifikasi penyiraman tanaman
            setiap hari pada waktu yang ditentukan.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default WateringReminder;
