TPP_RELEASE_STORE_FILE=app/keystore/tpp.release.jks
TPP_RELEASE_RELEASE_KEY_ALIAS=key-tpp
TPP_RELEASE_RELEASE_STORE_PASSWORD=tpp123
TPP_RELEASE_RELEASE_KEY_PASSWORD=tpp123

onPress={
() => {
navigation.navigate('MainDrawer', {
screen: 'Dashboard',
});
}
}
