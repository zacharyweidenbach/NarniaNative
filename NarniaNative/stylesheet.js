import { StyleSheet, Dimensions } from 'react-native';

export const socialFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabViewContainer: {
    flex: 12,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#ff9554',
  },
  label: {
    color: 'black',
    fontWeight: '400',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

/*PROFILE SCREEN*/
export const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f5',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 12,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  },
  emptySpace: {
    flex: 1
  },
  whitebg: {
    backgroundColor: '#fff',
  },
});

export const profileStatsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    flex: 3,
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  statsContainer: {
    flex: 1, 
    flexDirection: 'row',
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const profileMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingTop: 20,
    flex: 12,
  },
  backBtn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  }
});

export const profileGalleryStyles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
});

/*Likes Screen*/
export const likesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f7f5'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  gallery: {
    flex: 12,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  emptySpace: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  },
  noPostsContainer: {
    alignItems: 'center', 
    marginTop: 5
  },
  noPostsText: {
    color: '#888', 
    fontSize: 16
  }
});

export const likesGalleryStyles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
});

export const wardrobeScreen = StyleSheet.create({
  defaults: {
    color: '#ff9554'
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f7f5',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  gallery: {
    flex: 12,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  thumbnail: {
    height: 150,
    width: 150,
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  emptySpace: {
    flex: 1
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    paddingTop: 10
  }
});

export const tagsModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flex: 1, 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  closeBtn: {
    paddingRight: 15,
  },
  gallery: {
    flex: 12,
    backgroundColor: '#f9f7f5'
  },
  tagHeader: {
    color: '#ff9554',
    fontSize: 24,
    fontWeight: 'bold'
  },
  outfitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgOutfitContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  emptySpace: {
    flex: 1,
  },
});

export const searchTagsResults = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  countStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#888'
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
  },
  tagFont: {
    color: '#ff9554', 
    fontSize: 36
  }
});

export const searchTags = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});export const searchTagsResults = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  countStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#888'
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
  },
  tagFont: {
    color: '#ff9554', 
    fontSize: 36
  }
});

export const searchTags = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export const commentsModal = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textInputContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
  },
  commentsContainer: {
    flex: 8,
  },
  buttonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  emptyContainer: {
    alignItems: 'center'
  },
  emptyText: {
    color: '#888'
  }
});