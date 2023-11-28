import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CsText } from '.';
import { ECSTextTypes } from '../enums/ECSTextTypes';
import { Colors } from '../theme/colors';

const Logo = () => {
    const { t } = useTranslation();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <CsText type={ECSTextTypes.Bigger} style={styles.neonText}>{t('title')}</CsText>
            </View>
        </SafeAreaView>
    )
}

export default Logo

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    neonText: {
        width: "100%",
        textAlign: 'center',
        color: Colors.primary1000, // Glowing color
        textShadowColor: Colors.accent1000, // White text color
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, // Blur radius for the glow
    }

})