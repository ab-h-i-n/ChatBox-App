import 'react-native';
import { ImageSourcePropType } from 'react-native';

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

  declare module '*.png' {
    const value: ImageSourcePropType;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: ImageSourcePropType;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: ImageSourcePropType;
    export default value;
  }

  // Add any other components you want to extend here
}
