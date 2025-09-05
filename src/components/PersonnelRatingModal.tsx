import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface Comment {
  id: string;
  text: string;
  author: string;
}

export interface Personnel {
  name: string;
  role: 'Driver' | 'Operator';
  rating: number;
  comments: Comment[];
}

interface PersonnelRatingModalProps {
  visible: boolean;
  onClose: () => void;
  personnel: Personnel | null;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.starContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <AntDesign key={`full_${i}`} name="star" size={24} color="#f59e0b" />
      ))}
      {halfStar && <AntDesign name="star" size={24} color="#f59e0b" />}
      {[...Array(emptyStars)].map((_, i) => (
        <AntDesign key={`empty_${i}`} name="staro" size={24} color="#f59e0b" />
      ))}
    </View>
  );
};

export default function PersonnelRatingModal({
  visible,
  onClose,
  personnel,
}: PersonnelRatingModalProps) {
  if (!personnel) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color={theme.colors.gray[500]} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.avatar}>
              <AntDesign name="user" size={32} color={theme.colors.gray[800]} />
            </View>
            <Text style={styles.name}>{personnel.name}</Text>
            <Text style={styles.role}>{personnel.role}</Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingValue}>{personnel.rating.toFixed(1)}</Text>
            <StarRating rating={personnel.rating} />
            <Text style={styles.ratingCount}>Based on recent reviews</Text>
          </View>

          <View style={styles.separator} />

          <Text style={styles.commentsTitle}>Comments</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {personnel.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentText}>"{comment.text}"</Text>
                <Text style={styles.commentAuthor}>- {comment.author}</Text>
              </View>
            ))}
            {personnel.comments.length === 0 && (
              <Text style={styles.commentText}>No comments yet.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    height: 80,
    width: 80,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 25,
    color: theme.colors.gray[900],
  },
  role: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
  },
  ratingSection: {
    alignItems: 'center',
    gap: 8,
  },
  ratingValue: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 40,
    color: theme.colors.gray[800],
  },
  starContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingCount: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[500],
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
  },
  commentsTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[800],
  },
  commentItem: {
    backgroundColor: theme.colors.gray[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[700],
    fontStyle: 'italic',
  },
  commentAuthor: {
    fontFamily: theme.typography.fontFamily.secondary.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[600],
    textAlign: 'right',
    marginTop: 4,
  },
});
