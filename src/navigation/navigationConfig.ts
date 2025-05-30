import {getColors} from '../shared/theme/colors';

export const createNavigationConfig = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);

  const headerStyle = {
    backgroundColor: colors.primary,
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
    },
    headerTitleAlign: 'center' as const,
    headerShadowVisible: false,
  };

  const tabBarStyle = {
    height: 60,
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: colors.card,
  };

  return {
    headerStyle,
    tabBarStyle,
    tabBarConfig: {
      activeTintColor: colors.primaryDark,
      inactiveTintColor: colors.textTertiary,
    },
  };
}; 