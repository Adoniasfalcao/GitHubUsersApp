import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Repository({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const repository = route.params.item.html_url;

  //Título personalizado e encerramento do loading
  useEffect(() => {
    navigation.setOptions({
      title: route.params.item.owner.login,
    });

    if (repository) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  });

  return (
    <>
      {loading ? (
        <ActivityIndicator color="#7159c1" size={54} style={{marginTop: 400 }} />
      ) : (
        <WebView source={{uri: repository}} style={{flex: 1}} />
      )}
    </>
  );
}
