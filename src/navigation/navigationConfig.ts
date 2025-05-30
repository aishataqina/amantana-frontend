import {getColors} from '../shared/theme/colors';

export const createNavigationConfig = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);

  const headerStyle = {
    backgroundColor: colors.card,
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
      fontSize: 24,
    },
    headerTitleAlign: 'left' as const,
    headerShadowVisible: false,
  };

  const tabBarStyle = {
    height: 64,
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
