import 'react-native';

// Extend props for all relevant React Native components
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  
  interface TextProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  // Add any other components you want to extend here
}
