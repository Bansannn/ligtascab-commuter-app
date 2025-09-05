import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (violation: string, comment: string) => void;
}

const violationOptions = [
  { id: 'rude_driver', label: 'Rude Driver' },
  { id: 'overcharging', label: 'Overcharging' },
  { id: 'reckless_driving', label: 'Reckless Driving' },
  { id: 'unsafe_vehicle', label: 'Unsafe Vehicle Condition' },
  { id: 'route_deviation', label: 'Route Deviation' },
  { id: 'poor_hygiene', label: 'Poor Vehicle Hygiene' },
  { id: 'discrimination', label: 'Discrimination' },
  { id: 'smoking', label: 'Smoking in Vehicle' },
  { id: 'other', label: 'Other' },
];

export default function ReportModal({ visible, onClose, onSubmit }: ReportModalProps) {
  const [selectedViolation, setSelectedViolation] = useState('');
  const [comment, setComment] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSubmit = () => {
    if (selectedViolation && comment.trim()) {
      onSubmit(selectedViolation, comment);
      setSelectedViolation('');
      setComment('');
      setShowDropdown(false);
    }
  };

  const handleViolationSelect = (violationId: string) => {
    setSelectedViolation(violationId);
    setShowDropdown(false);
  };

  const getSelectedViolationLabel = () => {
    const violation = violationOptions.find((v) => v.id === selectedViolation);
    return violation ? violation.label : 'Select a violation';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Report Issue</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color={theme.colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Help us improve the service by reporting any issues with your ride.{' '}
          </Text>{' '}
          <View style={styles.content}>
            <View style={styles.dropdownSection}>
              <Text style={styles.sectionLabel}>Type of Violation *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  {
                    borderColor: selectedViolation
                      ? theme.colors.primary[600]
                      : theme.colors.gray[300],
                  },
                ]}
                onPress={() => setShowDropdown(!showDropdown)}>
                <Text
                  style={[
                    styles.dropdownButtonText,
                    { color: selectedViolation ? theme.colors.gray[900] : theme.colors.gray[500] },
                  ]}>
                  {getSelectedViolationLabel()}
                </Text>
                <Feather
                  name={showDropdown ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.colors.gray[600]}
                />
              </TouchableOpacity>

              {showDropdown && (
                <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                  {violationOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.dropdownItem,
                        selectedViolation === option.id && styles.dropdownItemSelected,
                      ]}
                      onPress={() => handleViolationSelect(option.id)}>
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedViolation === option.id && styles.dropdownItemTextSelected,
                        ]}>
                        {option.label}
                      </Text>
                      {selectedViolation === option.id && (
                        <Feather name="check" size={16} color={theme.colors.primary[600]} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <ScrollView
              style={[styles.scrollableContent, { maxHeight: showDropdown ? 200 : 400 }]}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={styles.commentSection}>
                <Text style={styles.sectionLabel}>Describe the issue in detail *</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Please provide specific details about what happened during your ride..."
                  placeholderTextColor={theme.colors.gray[400]}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={6}
                  maxLength={1000}
                  textAlignVertical="top"
                />
                <Text style={styles.characterCount}>{comment.length}/1000</Text>
              </View>{' '}
              <View style={styles.infoBox}>
                <Feather name="info" size={16} color={theme.colors.primary[600]} />{' '}
                <Text style={styles.infoText}>
                  Your report will be reviewed within 24-48 hours. You&apos;ll receive a ticket
                  number for tracking.
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { opacity: selectedViolation && comment.trim() ? 1 : 0.5 },
              ]}
              onPress={handleSubmit}
              disabled={!selectedViolation || !comment.trim()}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    height: '90%',
    maxHeight: 600,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[900],
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
    marginBottom: 24,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
  },
  dropdownSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
    marginBottom: 8,
  },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  dropdownButtonText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
  },
  dropdownList: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 12,
    maxHeight: 160,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  dropdownItemSelected: {
    backgroundColor: theme.colors.primary[50],
  },
  dropdownItemText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
  },
  dropdownItemTextSelected: {
    color: theme.colors.primary[600],
  },
  commentSection: {
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 12,
    padding: 12,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
    minHeight: 120,
  },
  characterCount: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
    textAlign: 'right',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.primary[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[700],
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 32,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});
