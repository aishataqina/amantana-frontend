import React from 'react';
import {View} from 'react-native';
import {Heart, Home, Droplets} from 'lucide-react-native';

interface TabIconProps {
  color: string;
  size: number;
}

export const HomeIcon: React.FC<TabIconProps> = ({color, size}) => {
  return (
    <View>
      <Home size={size} color={color} fill={color} />
    </View>
  );
};

export const FavoritesIcon: React.FC<TabIconProps> = ({color, size}) => {
  return (
    <View>
      <Heart size={size} color={color} fill={color} />
    </View>
  );
};

export const RemindersIcon: React.FC<TabIconProps> = ({color, size}) => {
  return (
    <View>
      <Droplets size={size} color={color} fill={color} />
    </View>
  );
};
