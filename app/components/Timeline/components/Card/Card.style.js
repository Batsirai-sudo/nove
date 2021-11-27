export const _dateStyle = (color, isCard) => ({
  color,
  fontSize: 10,
  marginLeft: 32,
  marginTop: isCard ? 8 : 0,
});

export const _subtitleStyle = (color) => ({
  color,
  fontSize: 12,
  marginTop: 5,
});

export const _titleStyle = (color) => ({
  color,
  fontSize: 14,
});

export const _shadowStyle = (isCard, shadowColor) => {
  return (
    isCard && {
      backgroundColor: 'transparent',
      shadowColor,
      shadowRadius: 7,
      shadowOpacity: 0.09,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    }
  );
};

export const _cardContainer = (isCard, shadowColor, backgroundColor) => {
  return [
    {
      marginTop: -5,
      paddingTop: 12,
      marginLeft: 10,
      borderRadius: 12,
      flexDirection: 'row',
      paddingBottom: isCard ? 12 : 6,
    },
    isCard && {
      shadowColor,
      backgroundColor,
      shadowRadius: 7,
      shadowOpacity: 0.05,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
  ];
};

export default {
  container: {
    width: '87%',
    height: null,
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 3,
    borderRadius: 322,
    alignSelf: 'baseline',
    flexDirection: 'column',
  },
  cardContainerGlue: {
    width: '100%',
    paddingLeft: 16,
  },
  title: {
    flexDirection: 'row',
  },
  subTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingRight: 5,
  },
};
