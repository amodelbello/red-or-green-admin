const moment = require('moment');

export default {

  formatDate(dateString, format = null) {
    if (format !== null) {
      return moment(dateString).format(format);
    } else {
      const date = new Date(dateString);
      return date.toLocaleString('en-US');
    }
  },

  formatDecimal(value, decimalPlaces = 2) {
    value = value.toFixed(decimalPlaces);
    value = parseFloat(value);

    return value;
  },

  truncateText(text, limit = 20, addEllipsis = true) {
    const length = text.length;
    if (length <= limit) {
      return text;
    }

    let truncatedText = text.substring(0, limit);

    if (addEllipsis) {
      truncatedText += '...';
    }

    return truncatedText;
  },

  findAverageRatingByCategoryName(business, categoryName, decimalPlaces = 2) {
    if (business.ratings === null || business.ratings === undefined || business.ratings.length === 0) {
      return '--';
    }

    const rating = business.ratings.find((rating) => {
      return rating.category.name === categoryName;
    });

    if (rating !== null && rating !== undefined) {
      return this.formatDecimal(rating.averageRating, decimalPlaces) || '--';
    }
  },

  showToast(message = 'Item saved', classes = 'teal') {
    M.toast({
      html: message,
      classes: classes,
    });
  },

  // TODO: This needs to not be static
  getCategoryIdFromName(categoryName) {

    if (typeof categoryName === 'object') {
      if (categoryName.name) {
        categoryName = categoryName.name;
      } else {
        categoryName = categoryName._id;
      }
    }

    categoryName = categoryName.toLowerCase();

    switch (categoryName) {
      case 'red':
      case 'red chile':
      case '5b199079e968472545119302':
        return '5b199079e968472545119302';
      case 'green':
      case 'green chile':
      case '5b19b39552e70a499c889122':
        return '5b19b39552e70a499c889122';
      default:
        return false;
    }
  },
}