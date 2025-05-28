// src/shared/components/InfoBanner.tsx
import React from 'react';
import {View, Text, Image, ImageSourcePropType} from 'react-native';

export interface InfoBannerProps {
  /** Background wrapper color, misal 'bg-green-50' */
  bgColor?: string;
  /** Background untuk container image, misal 'bg-green-100' */
  iconBgColor?: string;
  /** Sumber gambar ikon */
  imageSource: ImageSourcePropType;
  /** Judul banner */
  title: string;
  /** Deskripsi teks banner */
  description: string;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({
  bgColor = 'bg-green-700',
  imageSource,
  title,
  description,
}) => (
  <View
    className={`${bgColor} rounded-xl p-4 flex-row gap-4 mx-4 items-center`}>
    {/* Image container */}
    {/* <View className={`${iconBgColor} rounded-lg p-3 mr-4`} style={cardShadow}> */}
    <Image
      source={imageSource}
      className="w-20 h-20 rounded-xl"
      resizeMode="contain"
    />
    {/* </View> */}

    {/* Text content */}
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800 mb-1">
        {title}
      </Text>
      <Text className="text-sm text-gray-600">{description}</Text>
    </View>
  </View>
);
