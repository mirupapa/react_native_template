import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'

const BannerAd = () => {
  const bannerError = () => {
    console.log('Ad Fail error')
  }
  const styles = StyleSheet.create({
    container: {
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID={
          __DEV__
            ? 'ca-app-pub-3940256099942544/6300978111' // テスト広告
            : Platform.select({
                ios: '', // iOS
                android: '', // android
              })
        }
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  )
}

export default BannerAd
