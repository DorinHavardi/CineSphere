import { ReactNode } from "react";
import { ECSTextTypes } from "../enums/ECSTextTypes";
import { StyleProp, TextStyle } from "react-native";

export interface ICSText {
    children: ReactNode;
    type: ECSTextTypes;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    maxLength?: number;
}