import React, { useState } from 'react';
import { View, Image, Modal, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Soru görselini küçük olarak gösterir; dokunulduğunda tam ekran
 * büyütülmüş modal içinde açar.
 */
export default function ImageViewerModal({ source }) {
  const [visible, setVisible] = useState(false);
  const { colors, radius, spacing } = useAppTheme();

  if (!source) return null;

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={[styles.thumbnailWrapper, { borderRadius: radius.md, marginBottom: spacing.md }]}
      >
        <Image source={source} style={styles.thumbnail} resizeMode="cover" />
        <View style={[styles.zoomBadge, { backgroundColor: 'rgba(0,0,0,0.55)' }]}>
          <Ionicons name="expand-outline" size={16} color="#FFFFFF" />
        </View>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBackground}>
          <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
          <Image source={source} style={styles.fullImage} resizeMode="contain" />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  thumbnailWrapper: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  zoomBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    padding: 6,
    borderRadius: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
});
