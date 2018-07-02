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
}