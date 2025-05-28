// src/shared/components/InfoBanner.tsx
import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';

interface InfoBannerProps {
  /** Background wrapper color, misal 'bg-green-50' */
  bgColor: string;
  /** Background untuk container image, misal 'bg-green-100' */
  iconBgColor: string;
  /** Sumber gambar ikon */
  imageSource: any;
  /** Judul banner */
  title: string;
  /** Deskripsi teks banner */
  description: string;
  isDark?: boolean;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({
  bgColor,
  imageSource,
  title,
  description,
  isDark,
}) => {
  const {isDarkMode} = useTheme();
  const dark = isDark !== undefined ? isDark : isDarkMode;
  const colors = getColors(dark);

  return (
    <View className={`mx-4 my-3 rounded-2xl overflow-hidden ${bgColor}`}>
      <View className="flex-row p-4">
        <View>
          <Image
            source={imageSource}
            className="w-20 h-20 rounded-xl"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 ml-3">
          <Text className="font-bold text-base" style={{color: colors.text}}>
            {title}
          </Text>
          <Text className="text-sm mt-1" style={{color: colors.textSecondary}}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};
