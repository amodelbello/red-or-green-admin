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

  findAverageRatingByCategoryName(business, categoryName) {
    if (business.ratings === null || business.ratings === undefined) {
      return null;
    }

    const rating = business.ratings.find((rating) => {
      return rating.category.name === categoryName;
    });

    if (rating !== null && rating !== undefined) {
      return rating.averageRating || 0;
    }
  },
}