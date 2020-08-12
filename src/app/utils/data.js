const {
  differenceInMonths, differenceInYears, addYears, addMonths,
} = require('date-fns');

module.exports = {
  formatIdade(date) {
    const result = [];
    const now = new Date();
    let age = date;

    const years = differenceInYears(now, age);
    if (years > 0 && years > 1) {
      result.push(`${years} anos`);
      age = addYears(age, years);
    }

    if (years === 1) {
      result.push(`${years} ano`);
      age = addYears(age, years);
    }

    const months = differenceInMonths(now, age);
    if (months > 0 && months > 1) {
      result.push(`${months} e meses`);
      age = addMonths(age, months);
    }

    if (months === 1) {
      result.push(`${months} e mês`);
      age = addMonths(age, months);
    }

    return result.join(' ');
  },
};
