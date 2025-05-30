import React from 'react';
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';
import {lightShadow} from '../utils/cardShadow';

export interface BannerProps {
  /** Sumber gambar: require(...), uri object, dll. */
  source: ImageSourcePropType;
  /** Teks caption */
  caption?: string;
  /** Teks durasi (opsional, untuk card style) */
  subcaption?: string;
  /** Tampilkan caption? Default: false */
  showCaption?: boolean;
  /** Style caption: 'overlay' atau 'card'. Default: 'overlay' */
  captionStyle?: 'overlay' | 'card';
  /** Tambahan className untuk wrapper */
  containerClassName?: string;
  /** Tambahan style inline untuk wrapper */
  containerStyle?: object;
  /** Handler ketika banner di klik */
  onPress?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  source,
  caption = '',
  subcaption,
  showCaption = false,
  captionStyle = 'overlay',
  containerClassName = '',
  containerStyle = {},
  onPress,
}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const WrapperComponent = onPress ? TouchableOpacity : View;

  if (captionStyle === 'card') {
    return (
      <WrapperComponent
        onPress={onPress}
        className={`rounded-2xl overflow-hidden ${containerClassName}`}
        style={[
          {
            backgroundColor: colors.card,
          },
          lightShadow,
          containerStyle,
        ]}>
        <Image
          source={source}
          className="w-full h-[160px]"
          resizeMode="cover"
        />
        {showCaption && caption && (
          <View className="p-3">
            <Text
              className="text-base font-medium mb-1"
              style={{color: colors.text}}
              numberOfLines={2}>
              {caption}
            </Text>
            {subcaption && (
              <Text className="text-sm" style={{color: colors.textSecondary}}>
                {subcaption}
              </Text>
            )}
          </View>
        )}
      </WrapperComponent>
    );
  }

  return (
    <WrapperComponent
      onPress={onPress}
      className={`mb-3 px-4 ${containerClassName}`}
      style={containerStyle}>
      <Image
        source={source}
        className="w-full h-[200px] rounded-3xl"
        resizeMode="cover"
        style={lightShadow}
      />
      {showCaption && caption && (
        <View className="absolute bottom-4 left-6 bg-black/50 px-3 py-1 rounded">
          <Text className="text-white text-sm">{caption}</Text>
        </View>
      )}
    </WrapperComponent>
  );
};
