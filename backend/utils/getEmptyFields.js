const getEmptyFields = (title, load, reps) => {
    let empty = [];

    if(!title) {
        empty.push('title');
    }
    if(!load) {
        empty.push('load');
    }
    if(!reps) {
        empty.push('reps');
    }

    return empty;
};

module.exports = getEmptyFields;

