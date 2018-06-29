export default {

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US');
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