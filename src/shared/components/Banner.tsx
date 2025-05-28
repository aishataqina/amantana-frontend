import React from 'react';
import {View, Image, Text, ImageSourcePropType} from 'react-native';
import {lightShadow} from '../utils/cardShadow';

export interface BannerProps {
  /** Sumber gambar: require(...), uri object, dll. */
  source: ImageSourcePropType;
  /** Opsi teks keterangan di atas banner */
  caption?: string;
  /** Tampilkan keterangan? Default: false */
  showCaption?: boolean;
  /** Tambahan className untuk wrapper */
  containerClassName?: string;
  /** Tambahan style inline untuk wrapper */
  containerStyle?: object;
}

export const Banner: React.FC<BannerProps> = ({
  source,
  caption = '',
  showCaption = false,
  containerClassName = '',
  containerStyle = {},
}) => (
  <View className={`mb-3 px-3 ${containerClassName}`} style={containerStyle}>
    <Image
      source={source}
      className="w-full h-[200px] rounded-3xl"
      resizeMode="cover"
      style={lightShadow}
    />
    {showCaption && caption.length > 0 && (
      <View className="absolute bottom-4 left-6 bg-black/50 px-3 py-1 rounded">
        <Text className="text-white text-sm">{caption}</Text>
      </View>
    )}
  </View>
);
