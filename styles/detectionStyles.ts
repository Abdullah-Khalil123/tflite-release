import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  sentenceContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    marginBottom: 10,
  },
  speakButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 8,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sentenceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  speakingIndicator: {
    color: '#4CD964',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  statusContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC40',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 2,
  },
  savedGesturesContainer: {
    position: 'absolute',
    top: 130,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
  },
  savedGesturesHeader: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savedGesturesScroll: {
    maxHeight: 60,
  },
  savedGesturesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  gestureBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginVertical: 6,
  },
  gestureBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noGesturesText: {
    color: '#ccc',
    fontStyle: 'italic',
  },
  gestureControlsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  backspaceButton: {
    backgroundColor: '#FF851B',
    paddingVertical: 4,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  clearButton: {
    backgroundColor: '#FF4136',
    paddingVertical: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    flex: 1,
  },
  controlPanel: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detectionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detectionDisplay: {
    marginTop: 16,
    width: '100%',
    height: 60,
    alignItems: 'center',
  },
  detectionLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  detectionBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 4,
  },
  detectionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noDetectionText: {
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
  progressContainer: {
    width: '90%',
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 8,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF4136',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorDetail: {
    color: 'white',
    textAlign: 'center',
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccessText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#0074D9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default styles;
