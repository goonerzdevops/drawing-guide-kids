import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SVG_HEIGHT = SCREEN_WIDTH * 0.7; // rasio 4:3

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pager: {
    flex: 1,
    width: '100%',
    height: SVG_HEIGHT,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00B3FF',
  },
  svg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  finishSvg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    height: 60,
    width: 200,
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});
