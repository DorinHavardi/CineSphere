import { Dimensions, PixelRatio, Platform } from "react-native";

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const getFontSizeByWindowWidth = (fontSize: number) => {
    const baseWidth = Platform.OS === "ios" ? 380 : 400;
    return PixelRatio.roundToNearestPixel(
        fontSize * (SCREEN_WIDTH / baseWidth)
    );
};
