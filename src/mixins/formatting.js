export default {

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US');
  },

}